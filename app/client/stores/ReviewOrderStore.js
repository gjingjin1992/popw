const EventEmitter = require('eventemitter3');
import {Hydra} from '../helpers/Hydra.js';

export const ReviewOrderStore = Object.assign({}, EventEmitter.prototype, {

  order: null,

  setOrder: function (order) {
    this.order = order;
    this.emitChange();
  },
  getOrder: function () {
    return this.order;
  },

  emitChange: function () {
    this.emit('EVENT_ORDER_REVIEW_CHANGE');
  },
  addChangeListener: function (cb) {
    this.on('EVENT_ORDER_REVIEW_CHANGE', cb);
  },
  removeChangeListener: function (cb) {
    this.removeListener('EVENT_ORDER_REVIEW_CHANGE', cb);
  }

});

const reviewOrderOrderId = (/order_id=([^&]+)/.exec(window.location.href) === null)
  ? null
  : /order_id=([^&]+)/.exec(window.location.href)[1];

if (reviewOrderOrderId !== null && ReviewOrderStore.getOrder() === null) {

  const HydraOrders = Hydra.child(`orders/${reviewOrderOrderId}`);

  HydraOrders.on('value', function (snapshot) {

    let order = snapshot.exportVal();

    if (order) {

      let items_array = [];

      if (typeof order.items === 'object') {
        Object.keys(order.items).map((key) => {
          let item = order.items[key];
          let colours_array = [];
          if (typeof item.colours === 'object') {
            Object.keys(item.colours).map((k) => {
              colours_array.push(item.colours[k]);
            });
          }
          item.colours = colours_array;
          items_array.push(item);
        });
      }
      order.items = items_array;
      order.trackings = [];

      ReviewOrderStore.setOrder(order);

      const HydraTrackings = Hydra.child(`trackings/${reviewOrderOrderId}`);

      HydraTrackings.on('value', function (snapshot_2) {
        let order_2 = ReviewOrderStore.getOrder();
        order_2.trackings = snapshot_2.exportVal();
        ReviewOrderStore.setOrder(order_2);
      });


    } else if (ReviewOrderStore.getOrder() !== null) {
      ReviewOrderStore.setOrder(null);
    }

  }, (err) => {

    console.error('#45g5345g error!');
    console.error(err);

    if (ReviewOrderStore.getOrder() !== null) {
      ReviewOrderStore.setOrder(null);
    }

  });
}
