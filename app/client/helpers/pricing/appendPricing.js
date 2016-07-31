import {updatePricingsByCategory} from './updatePricingsByCategory';
import {updatePricingsByBandWidth} from './updatePricingsByBandWidth';
import {updatePricingsByDestination} from './updatePricingsByDestination';
import {updateBundleForOrder} from './updateBundleForOrder';
import {updatePricingsByDiscountCoupon} from './updatePricingsByDiscountCoupon';
import {SettingsStore} from './../../stores/SettingsStore';

const _calculatePrice = (entity) => {
  let price = 0;
  Object.keys(entity.pricings).forEach((key) => {
    let pricing = entity.pricings[key];
    switch (pricing.operator) {
      case '*':
        price *= pricing.operand;
        break;
      case '+':
        price += pricing.operand;
        break;
      default:
        break;
    }
  });
  return Object.assign({}, entity, {price: Math.ceil(price)});
};


export const appendPricing = (order) => {

  let settings = SettingsStore.getSettings();
  let pricing_rules = settings.pricings;

  // copy order object to mutate any way needed to count pricing.
  let _order = Object.assign({}, order);

  // the is for preview in customiser
  _order.pricings = [];
  _order = updatePricingsByCategory(_order, _order.shipping, pricing_rules);
  _order = updatePricingsByBandWidth(_order);
  _order = updatePricingsByDestination(_order, _order.destination);
  _order = _calculatePrice(_order);

  _order.cart = _order.cart || {};
  let cart = _order.cart;
  _order.total_order_price = 0;
  _order.total_quantity = 0;
  // we now calcualte the price for each individual item
  Object.keys(cart).forEach((key) => {
    let item = cart[key];
    item.pricings = [];
    item = updatePricingsByCategory(item, _order.shipping, pricing_rules);
    item = updatePricingsByBandWidth(item);
    item = updatePricingsByDestination(item, _order.destination);
    item = _calculatePrice(item);
    cart[key] = item;
    _order.total_order_price += cart[key].price;
    _order.total_quantity += cart[key].quantity;
  });
  _order.total_order_price = Math.ceil(_order.total_order_price);

  // now we calculate the bundle discount
  _order.bundle_price = 0;
  _order = updateBundleForOrder(_order);
  let bundles = _order.bundles;
  Object.keys(bundles).forEach((key) => {
    let bundle = bundles[key];
    bundle.pricings = [];
    bundle = updatePricingsByCategory(bundle, _order.shipping, pricing_rules);
    bundle = updatePricingsByBandWidth(bundle);
    bundle = updatePricingsByDestination(bundle, _order.destination);
    bundle = _calculatePrice(bundle);
    bundles[key] = bundle;
    _order.bundle_price += bundle.price + bundle.extra_cost;
  });
  _order.bundles = bundles;
  _order.bundle_price = Math.ceil(_order.bundle_price);
  _order.bundle_discount = _order.total_order_price - _order.bundle_price;

  _order.calculated_price = _order.total_order_price - _order.bundle_discount;
  _order.final_price = _order.calculated_price;

  _order = updatePricingsByDiscountCoupon(_order);
  _order.final_price -= _order.coupon_discount;

  return _order;
};
