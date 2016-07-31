const EventEmitter = require('eventemitter3');
import {Hydra} from '../helpers/Hydra.js';

export const RatingsStore = Object.assign({}, EventEmitter.prototype, {

  ratings: null,
  average_rating: null,
  total_ratings: null,

  setRatings: function (ratings) {

    let total_ratigns = 0;
    let total_rating = 0;

    ratings.map((r) => {
      total_ratigns++;
      total_rating += r.rating;
    });

    this.total_ratings = total_ratigns;
    this.average_rating = Math.round((total_rating / total_ratigns) * 2) / 2;

    this.ratings = ratings;
    this.emitChange();
  },
  getRatings: function () {
    return {
      ratings: this.ratings,
      average_rating: this.average_rating,
      total_ratings: this.total_ratings
    };
  },

  emitChange: function () {
    this.emit('EVENT_RATIGNS_CHANGE');
  },
  addChangeListener: function (cb) {
    this.on('EVENT_RATIGNS_CHANGE', cb);
  },
  removeChangeListener: function (cb) {
    this.removeListener('EVENT_RATIGNS_CHANGE', cb);
  }

});


const HydraReviews = Hydra.child('reviews/public');

HydraReviews.on('value', function (snapshot) {

  let reviews = snapshot.exportVal();

  if (reviews) {

    let reviews_array = [];

    if (typeof reviews === 'object') {
      Object.keys(reviews).map((key) => {
        reviews_array.push(reviews[key]);
      });
    }
    RatingsStore.setRatings(reviews_array);
    RatingsStore.emitChange();

  } else if (RatingsStore.getRatings() !== null) {
    RatingsStore.setRatings(null);
    RatingsStore.emitChange();
  }

}, (err) => {

  console.error('#g34g4435 error!');
  console.error(err);

  if (RatingsStore.getRatings() !== null) {
    RatingsStore.setRatings(null);
    RatingsStore.emitChange();
  }
});

