export const updatePricingsByDiscountCoupon = (order) => {

  order.final_price = order.final_price || 0;

  let discount = 0;

  if (order.discount_coupon) {
    switch (order.discount_coupon.type) {
      case 'fixed':
        discount = order.discount_coupon.value;
        break;
      case 'percent':
        discount = Math.ceil(order.calculated_price * (order.discount_coupon.value / 100));
        break;
      default:
        break;
    }
  }
  order.coupon_discount = discount;
  return order;
};
