const Db = require('firebase');
export const Hydra = new Db('https://popwb-athena.firebaseio.com');

export const validateCoupon = ({coupon_code, cb}) => {
  const HydraCoupons = Hydra.child(`coupons/${coupon_code}`);

  HydraCoupons.on('value', (snapshot) => {
      let coupon = snapshot.exportVal();

      if (coupon) {
        cb(null, Object.assign({}, coupon, {code: coupon_code}));
      } else {
        cb('invalid_code', null);
      }

    }, (err) => {
      cb('invalid_code', null);
    }
  );

};
