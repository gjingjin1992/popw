import {Hydra} from '../helpers/Hydra.js';
import {OrderStore} from '../stores/OrderStore.js';
import {SettingsStore} from '../stores/SettingsStore.js';
import {UserStore} from '../stores/UserStore.js';
import {SmoothScroll} from '../helpers/SmoothScroll.js';
import GetDeliveryDate from './../helpers/GetDeliveryDate';
var ga = require('react-ga');


export const OrderActions = {

  ChangeQuantity: (new_value) => {
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orderRef = Hydra.child('carts/' + user.uid);
      orderRef.update({
        quantity: new_value
      });
      ga.event({category: 'Customizer', action: 'Update Quantity', value: 1});
    }
  },
  CheckoutClicked: () => {
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {

      let orderRef = Hydra.child('carts/' + user.uid);
      orderRef.update({
        checkout_attempted: true
      });

      let checkouts = Hydra.child('checkouts');
      let delivery_date = GetDeliveryDate({days: parseInt(order.shipping, 10)});
      let order_to_checkout = Object.assign({}, order, {at: Date.now()});
      order_to_checkout.items = order_to_checkout.cart;
      order_to_checkout.category = order_to_checkout.shipping;
      order_to_checkout.total = order_to_checkout.total_order_price;
      order_to_checkout.guarantee_delivery_date = delivery_date;

      delete order_to_checkout.cart;
      delete order_to_checkout.shipping;
      delete order_to_checkout.total_order_price;

      console.log('order_to_checkout', order_to_checkout);
      checkouts.child(user.uid).set(order_to_checkout);
      ga.event({category: 'Shopping', action: 'Checkout', value: 1});
    }

  },
  Reset: () => {
    let settings = SettingsStore.getSettings();
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orderRef = Hydra.child('carts/' + user.uid);
      orderRef.update(settings.default_selections);
      ga.event({category: 'Customizer', action: 'Reset', value: 1});
    }
  },
  ChangeWidth: (new_value) => {
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orderRef = Hydra.child('carts/' + user.uid);
      orderRef.update({
        band_width: new_value
      });
      ga.event({category: 'Customizer', action: 'Update Width', value: 1});
    }
  },
  ChangeSize: (new_value) => {
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orderRef = Hydra.child('carts/' + user.uid);
      orderRef.update({
        band_size: new_value
      });
      ga.event({category: 'Customizer', action: 'Update Size', value: 1});
    }
  },
  ChangeTextsOutside: (new_value) => {
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orderRef = Hydra.child('carts/' + user.uid);
      orderRef.update({
        texts_outside: new_value
      });
      ga.event({category: 'Customizer', action: 'Text mode changed', value: 1});
    }
  },
  ChangeTextInsideOnOff: (on_off) => {
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orderRef = Hydra.child('carts/' + user.uid);
      orderRef.update({
        text_inside_on_off: on_off
      });
      ga.event({category: 'Customizer', action: 'Text inside on/off', value: 1});
    }
  },
  ChangeColour: (new_value) => {
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orderRef = Hydra.child('carts/' + user.uid);
      orderRef.update({
        colours: new_value
      });
      ga.event({category: 'Customizer', action: 'Update Colour', value: 1});
    }
  },
  ChangeType: (new_value) => {
    let settings = SettingsStore.getSettings();
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orderRef = Hydra.child('carts/' + user.uid);

      let update = {
        type: new_value
      };
      if (new_value === 'solid') {
        update.colours = settings.default_settings.by_type.solid.colours;
      } else if (new_value === 'segments') {
        update.colours = settings.default_settings.by_type.segments.colours;
      }
      orderRef.update(update);
      ga.event({category: 'Customizer', action: 'Update Type', value: 1});
    }
  },
  ChangeMessage: (new_value) => {
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orderRef = Hydra.child('carts/' + user.uid);
      orderRef.update({
        text: new_value
      });
      ga.event({category: 'Customizer', action: 'Update Message', value: 1});
    }
  },
  ChangeMessage_2: (new_value) => {
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orderRef = Hydra.child('carts/' + user.uid);
      orderRef.update({
        text_2: new_value,
      });
      ga.event({category: 'Customizer', action: 'Update Message', value: 1});
    }
  },
  ChangeMessageInside: (new_value) => {
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orderRef = Hydra.child('carts/' + user.uid);
      orderRef.update({
        text_inside: new_value
      });
      ga.event({category: 'Customizer', action: 'Update Message Inside', value: 1});
    }
  },
  ChangeSwirlSelected: (new_value) => {
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orderRef = Hydra.child('carts/' + user.uid);
      orderRef.update({
        swirl_selected: new_value
      });
      ga.event({category: 'Customizer', action: 'Update Swirl', value: 1});
    }
  },
  ChangeTextColour: (new_value) => {
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orderRef = Hydra.child('carts/' + user.uid);

      if (new_value === 'N/A' && order.text_style === 'print') {
        new_value = '#070809';
      }

      orderRef.update({
        text_colour: new_value || null
      });

      ga.event({category: 'Customizer', action: 'Update Text Colour', value: 1});
    }
  },
  ChangeFont: (new_value) => {
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orderRef = Hydra.child('carts/' + user.uid);
      orderRef.update({
        font: new_value
      });
    }
    ga.event({category: 'Customizer', action: 'Update Font', value: 1});
  },
  ChangeArtwork: ({which, base64}) => {
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orderRef = null;
      switch (which) {
        case 'left':
        case 'right':
          orderRef = Hydra.child(`carts/${user.uid}/artworks/${which}`);
          break;
        default:
          console.error(`#fs4f31 invalid "which": ${which}`);
          break;
      }
      if (orderRef !== null) {
        orderRef.set(base64);
      }
      ga.event({category: 'Customizer', action: 'Update Art Work', value: 1});
    }
  },

  ChangePaymentMethod:(new_value) => {
    console.log(new_value);
    let user = UserStore.getActiveUser();
    if (user !== null) {
      let orderRef = Hydra.child('carts/' + user.uid);
      orderRef.update({
        payment_method: new_value
      });
      ga.event({category: 'Customizer', action: 'Update Payment Method', value: 1});
    }
  },

  ChangeTextStyle: (new_value) => {
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orderRef = Hydra.child('carts/' + user.uid);
      let text_colour = order.text_colour;
      if (new_value === 'print' && order.text_colour === 'N/A') {
        text_colour = '#070809';
      }
      orderRef.update({
        text_style: new_value,
        text_colour: text_colour
      });
      ga.event({category: 'Customizer', action: 'Update Text Style', value: 1});
    }
  },

  AddToCart: ({new_item}) => {

    ga.event({
      category: 'Shopping',
      action: 'Add To Cart',
      value: 0
    });

    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orderRef = Hydra.child('carts/' + user.uid);
      let cart = order.cart || [];

      // check if there is already same in cart - update quantity  https://github.com/pixiez/popwb.athena/issues/19

      if (typeof new_item === 'undefined') {
        new_item = {
          quantity: order.quantity,
          artworks_left: order.artworks.left,
          artworks_right: order.artworks.right,
          type: order.type,
          band_width: order.band_width,
          band_size: order.band_size,
          font: order.font,
          text: order.text,
          text_2: order.text_2,
          text_inside: order.text_inside,
          text_colour: order.text_colour,
          text_style: order.text_style,
          colours: (order.type === 'segments' || order.type === 'solid') ? order.colours : null,
          swirl_selected: (order.type === 'swirl') ? order.swirl_selected : null,
          payment_method: 'stripe'
        };
      }

      let already_in_cart = false;

      for (let i = 0; i < cart.length; i++) {

        let item = {
          quantity: cart[i].quantity,
          artworks_left: cart[i].artworks_left,
          artworks_right: cart[i].artworks_right,
          type: cart[i].type,
          font: cart[i].font,
          band_width: cart[i].band_width,
          band_size: cart[i].band_size,
          text: cart[i].text,
          text_2: cart[i].text_2,
          text_inside: cart[i].text_inside,
          text_colour: cart[i].text_colour,
          text_style: cart[i].text_style,
          colours: (cart[i].type === 'segments' || cart[i].type === 'solid') ? cart[i].colours : null,
          swirl_selected: (cart[i].type === 'swirl') ? cart[i].swirl_selected : null
        };

        if (
          item.type === new_item.type &&
          item.artworks_left === new_item.artworks_left &&
          item.artworks_right === new_item.artworks_right &&
          item.font === new_item.font &&
          item.band_width === new_item.band_width &&
          item.band_size === new_item.band_size &&
          item.text === new_item.text &&
          item.text_2 === new_item.text_2 &&
          item.text_inside === new_item.text_inside &&
          item.text_colour === new_item.text_colour &&
          item.text_style === new_item.text_style &&
          JSON.stringify(item.colours) === JSON.stringify(new_item.colours) &&
          item.swirl_selected === new_item.swirl_selected
        ) {
          already_in_cart = true;
          cart[i].quantity += new_item.quantity;
        }

      }

      if (already_in_cart === false) {
        cart.push(Object.assign({}, {
          id: Date.now()
        }, new_item));
      }

      orderRef.update({
        cart: cart
      });

      SmoothScroll({eID: 'myCart', padding: -30});
    }
  },

  RemoveFromCart: (item_id) => {
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orderRef = Hydra.child('carts/' + user.uid);
      let cart = order.cart || [];

      cart = cart.filter(function (obj) {
        return obj.id !== item_id;
      });

      orderRef.update({
        cart: cart
      });
      ga.event({category: 'Shopping', action: 'Remove From Carty', value: 1});
    }
  },

  saveStripeToken: ({token, addresses}) => {
    ga.event({category: 'Shopping', action: 'Purchase', value: 1});
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orders = Hydra.child('orders');

      let delivery_date = GetDeliveryDate({days: parseInt(order.shipping, 10)});
      let order_to_push = Object.assign({}, order, {at: Date.now()});
      order_to_push.items = order_to_push.cart;
      order_to_push.category = order_to_push.shipping;
      order_to_push.total = order_to_push.total_order_price;
      order_to_push.guarantee_delivery_date = delivery_date;

      delete order_to_push.cart;
      delete order_to_push.shipping;
      delete order_to_push.total_order_price;

      console.log('order_to_push', order_to_push);

      let ref = orders.push(order_to_push, function (err) {
        if (err !== null) {
          console.error('Failed to push order to database');
          console.error(err);
        }
      });
      console.log('order pushed!')
      let payment = Hydra.child('payments/' + ref.key());

      let shipping_address = {};
      let billing_address = {};
      let shipping_address_1_line = '';
      for (var key in addresses) {
        if (key.toLowerCase().startsWith('shipping_') && addresses.hasOwnProperty(key)) {
          shipping_address[key.substring(9)] = addresses[key];
          shipping_address_1_line = shipping_address_1_line + `${addresses[key]},`;
        }
        if (key.toLowerCase().startsWith('billing_') && addresses.hasOwnProperty(key)) {
          billing_address[key.substring(8)] = addresses[key];
        }
      }
      shipping_address_1_line = shipping_address_1_line.substring(0, shipping_address_1_line.length - 1).split(' null').join(' ');
      let payment_obj = {
        shipping_address: shipping_address,
        billing_address: billing_address,
        address: shipping_address_1_line,
        token_raw: token,
        at: token.created,
        by: user.uid,
        email: token.email,
        name: billing_address.name,
        token: token.id,
        status: 'submitted'
      };
      console.log('payment_obj', payment_obj);
      payment.set(payment_obj, ()=> {
        let orderRef = Hydra.child('carts/' + user.uid);
        orderRef.update({
          cart: {}
        });
        window.location = `?order_id=${ref.key()}`;
      });

    }
  },

  ChangeQuantityInCart(item_id, value) {
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orderRef = Hydra.child('carts/' + user.uid);
      let cart = order.cart || [];

      cart = cart.filter(function (obj) {
        if (obj.id === item_id) {
          obj.quantity = value;
        }
        return obj;
      });

      orderRef.update({
        cart: cart
      });
      ga.event({category: 'Shopping', action: 'Change Quantity in Cart', value: 1});
    }
  },

  ChangeShipping(value) {
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orderRef = Hydra.child('carts/' + user.uid);
      orderRef.update({
        shipping: value
      });
    }
    ga.event({category: 'Shopping', action: 'Update Shipping', value: 1});
  },

  ChangeDiscountCoupon(value) {
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orderRef = Hydra.child('carts/' + user.uid);
      orderRef.update({
        discount_coupon: value
      });
    }
  },

  ChangeBandSize(value) {
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orderRef = Hydra.child('carts/' + user.uid);
      orderRef.update({
        band_size: value
      });
      ga.event({category: 'Shopping', action: 'Update Band Size', value: 1});
    }
  },

  ChangeDestination(value) {
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orderRef = Hydra.child('carts/' + user.uid);
      orderRef.update({
        destination: value
      });
      ga.event({category: 'Shopping', action: 'Update Destination', value: 1});
    }
  },

  ChangeShippingDetails(fullname, phone, address, postcode, comment) {
    let order = OrderStore.getOrder();
    let user = UserStore.getActiveUser();
    if (order !== null && user !== null) {
      let orderRef = Hydra.child('carts/' + user.uid);
      orderRef.update({
        shipping_fullname: fullname,
        shipping_phone: phone,
        shipping_address: address,
        shipping_postcode: postcode,
        shipping_comment: comment
      });
    }
  }

};
