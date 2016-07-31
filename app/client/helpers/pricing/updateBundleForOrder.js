const md5 = require('js-md5');

const _getQuantityGroupedHash = (item) => {
  let hash = Object.assign({}, {
    band_width: item.band_width,
    text_style: item.text_style
  });
  hash = md5(JSON.stringify(hash));
  return hash;
};

export const updateBundleForOrder = (order) => {
  let cart = order.cart;
  let bundles = {};
  if (cart) {
    Object.keys(cart).forEach((key) => {
      let item = cart[key];
      const hash = _getQuantityGroupedHash(item);
      bundles[hash] = bundles[hash] || {
          quantity: 0,
          artworks_right: {},
          artworks_left: {},
          band_size: {},
          font: {},
          text: {},
          text_inside: {},
          text_style: item.text_style,
          band_width: item.band_width
        };
      //below the total quantity bundled
      bundles[hash].quantity += parseInt(item.quantity, 10);

      //below needed to calculate the extra cost 
      bundles[hash].artworks_right[item.artworks_right] = 1;
      bundles[hash].artworks_left[item.artworks_left] = 1;
      bundles[hash].band_size[item.band_size] = 1;
      bundles[hash].font[item.font] = 1;
      bundles[hash].text[item.text || null] = 1;
      bundles[hash].text_inside[item.text_inside || null] = 1;

    });

    Object.keys(bundles).forEach((hash) => {
      let bundle = bundles[hash];
      bundle.extra_cost = 0;
      console.log('extra_cost1',bundle.extra_cost);
      bundle.extra_cost += (Object.keys(bundle.artworks_right).length - 1) * 2000;
      bundle.extra_cost += (Object.keys(bundle.artworks_left).length - 1) * 2000;
      bundle.extra_cost += (Object.keys(bundle.band_size).length - 1) * 2000;
      bundle.extra_cost += (Object.keys(bundle.font).length - 1) * 2000;
      bundle.extra_cost += (Object.keys(bundle.text).length - 1) * 2000;
 
      Object.keys(bundle.text_inside).forEach((key) => {
        if (key != 'null' && key != null){
          bundle.extra_cost += 2000;  
        }
      });
      //we are clearing the artwork hash to save space
      bundle.artworks_right = Object.keys(bundle.artworks_right).length;
      bundle.artworks_left = Object.keys(bundle.artworks_left).length;

      //we need to make sure we dont have special char in the key so we moving key to value
      bundles[hash].band_size = {0: Object.keys(bundles[hash].band_size)[0]};
      bundles[hash].font = {0: Object.keys(bundles[hash].font)[0]};
      bundles[hash].text = {0: Object.keys(bundles[hash].text)[0]};
      bundles[hash].text_inside = {0: Object.keys(bundles[hash].text_inside)[0]};

      bundles[hash] = bundle;
      console.log('extra_cost',bundle.extra_cost);
    });
  }
  ;
  order.bundles = bundles;
  return order;
};
