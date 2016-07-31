export const makeColoursAsArray = (order) => {

  // apply to customizer

  if (order.colours) {
    let colours = [];
    Object.keys(order.colours).forEach(function (k) {
      colours.push(order.colours[k]);
    });
    order.colours = colours;
  }

  // apply to cart items

  if (order.cart) {
    Object.keys(order.cart).forEach(function (key) {
      let item = order.cart[key];
      if (item.colours) {
        let colours = [];
        Object.keys(item.colours).forEach(function (k) {
          colours.push(item.colours[k]);
        });
        item.colours = colours;
      }
      order.cart[key] = item;
    });
  }

  return order;

};
