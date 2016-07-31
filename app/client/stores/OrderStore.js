const EventEmitter = require('eventemitter3');
import {Hydra} from '../helpers/Hydra.js';
import {UserStore} from './UserStore.js';
import {SettingsStore} from './SettingsStore.js';
import {appendPricing} from './../helpers/pricing/appendPricing';
import {makeColoursAsArray} from './../helpers/stores/makeColoursAsArray';

export const OrderStore = Object.assign({}, EventEmitter.prototype, {

  default_order_settings: null,
  active_order: null,

  setOrder: function (order) {

    if (order === null) {
      this.active_order = null;
      return;
    }

    let colours_array = [];
    for (var c1 in order.colours) {
      if (order.colours.hasOwnProperty(c1)) {
        colours_array.push(order.colours[c1]);
      }
    }

    let cart_array = [];
    for (var c2 in order.cart) {
      if (order.cart.hasOwnProperty(c2)) {
        cart_array.push(order.cart[c2]);
      }
    }


    order.cart = cart_array;
    order.colours = colours_array;
    this.active_order = order;
  },
  getOrder: function () {
    return this.active_order;
  },

  setDefaultOrder: function (order) {
    this.default_order_settings = order;
  },
  getDefaultOrder: function () {
    return this.default_order_settings;
  },

  emitChange: function () {
    this.emit('EVENT_ORDER_CHANGE');
  },
  addChangeListener: function (cb) {
    this.on('EVENT_ORDER_CHANGE', cb);
  },
  removeChangeListener: function (cb) {
    this.removeListener('EVENT_ORDER_CHANGE', cb);
  }

});

const getOrder = ({user, default_order}) => {

  const HydraOrder = Hydra.child('carts');
  const PendingOrder = HydraOrder.child(user.uid);

  PendingOrder.on('value', function (snapshot) {
    let order = snapshot.exportVal();

    if (order) {
      order = makeColoursAsArray(order);
      order = appendPricing(order);
    }

    OrderStore.setOrder(order);
    OrderStore.emitChange();
  }, (err) => {
    console.warn('#fjh32jk2');
    console.warn(err);
    PendingOrder.set(Object.assign({}, default_order, {
      by: user.uid,
      status: 'pending'
    }), () => {
      // setted default order data - refresh page and load it
      location.reload();
    });
  });
};

const tryGetOrder = () => {
  let user = UserStore.getActiveUser();
  let settings = SettingsStore.getSettings();

  if (settings !== null && user !== null && OrderStore.getOrder() === null) {
    getOrder({user: user, default_order: settings.default_selections});
  } else if (user === null) {
    OrderStore.setOrder(null);
    OrderStore.emitChange();
  }
};

tryGetOrder();
UserStore.addChangeListener(tryGetOrder);
SettingsStore.addChangeListener(tryGetOrder);
