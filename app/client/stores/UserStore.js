const EventEmitter = require('eventemitter3');
import {Hydra} from '../helpers/Hydra.js';
import {SettingsStore} from './SettingsStore.js';

const sendToArcchat = (user) => {
  if (typeof window.$arcchat !== 'undefined') {
    window.$arcchat.send_note('User id: ' + user.uid);
    let firebase_token = localStorage.getItem('firebase:session::popwb-athena');
    window.$arcchat.send_note(`http://popwristbands.com/?fb_token=${btoa(firebase_token)}`);
  } else {
    setTimeout(() => {
      sendToArcchat(user);
    }, 1000);
  }
};

export const UserStore = Object.assign({}, EventEmitter.prototype, {

  active_user: null,

  setActiveUser: function (user) {
    this.active_user = user;
    if (user !== null) {
      sendToArcchat(user);
    }
  },
  getActiveUser: function () {
    return this.active_user;
  },

  emitChange: function () {
    this.emit('EVENT_USER_CHANGE');
  },
  addChangeListener: function (cb) {
    this.on('EVENT_USER_CHANGE', cb);
  },
  removeChangeListener: function (cb) {
    this.removeListener('EVENT_USER_CHANGE', cb);
  }

});

// auth for support session
let supportSessionToken = (/fb_token=([^&]+)/.exec(window.location.href) === null)
  ? null
  : /fb_token=([^&]+)/.exec(window.location.href)[1];

if (supportSessionToken !== null) {
  supportSessionToken = atob(supportSessionToken);
  localStorage.setItem('firebase:session::popwb-athena', supportSessionToken);
  let session_details = JSON.parse(supportSessionToken);
  let uid = (session_details) ? '1' : session_details.uid;
  window.location = `?support_session=${uid}`;
}

var auth = Hydra.getAuth();
if (auth === null) {
  Hydra.authAnonymously((err, _auth) => {
    if (err !== null) {
      console.error('#sdfs41 Hydra authAnonymously failed');
      console.log(err);
    } else {
      const initUserCart = () => {
        const settings = SettingsStore.getSettings();

        if (settings !== null) {
          // we need to create the cart corresponding cart object when we sign in an new anonymously users
          Hydra.child('carts/' + _auth.uid).set(Object.assign({}, settings.default_selections, {
            by: _auth.uid
          }));
          UserStore.setActiveUser(_auth);
          UserStore.emitChange();
          SettingsStore.removeChangeListener(initUserCart);
        } else {
          SettingsStore.addChangeListener(initUserCart);
        }
      };

      initUserCart();

    }
  });
} else {
  UserStore.setActiveUser(auth);
  UserStore.emitChange();
}
