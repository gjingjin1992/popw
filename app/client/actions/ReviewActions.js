import {Hydra} from '../helpers/Hydra.js';
import {UserStore} from '../stores/UserStore.js';

export const ReviewActions = {

  AddReview: ({rating, text}) => {

    let user = UserStore.getActiveUser();
    if (user !== null) {
      let ref = Hydra.child('reviews/private');
      let obj = {
        at: Date.now(),
        by: user.uid,
        comment: text,
        rating: rating
      };
      ref.push(obj);
    }
  }

};
