const EventEmitter = require('eventemitter3');

import {Hydra} from '../helpers/Hydra.js';
const HydraSettings = Hydra.child('settings');

export const SettingsStore = Object.assign({}, EventEmitter.prototype, {

  settings: null,

  setSettings: function (val) {
    this.settings = val;
  },
  getSettings: function () {
    return this.settings;
  },

  emitChange: function () {
    this.emit('EVENT_SETTINGS_STORE_CHANGE');
  },
  addChangeListener: function (cb) {
    this.on('EVENT_SETTINGS_STORE_CHANGE', cb);
  },
  removeChangeListener: function (cb) {
    this.removeListener('EVENT_SETTINGS_STORE_CHANGE', cb);
  }

});

HydraSettings.on("value", function (snapshot) {

  let settings = snapshot.exportVal();

  let pricings_array = [];
  for (let c1 in settings.pricings) {
    if (settings.pricings.hasOwnProperty(c1)) {
      pricings_array.push(settings.pricings[c1]);
    }
  }

  let shipping_array = [];
  for (let c2 in settings.shipping) {
    if (settings.shipping.hasOwnProperty(c2)) {
      shipping_array.push(settings.shipping[c2]);
    }
  }


  settings.pricings = pricings_array;
  settings.shipping = shipping_array;

  SettingsStore.setSettings(settings);
  SettingsStore.emitChange();

}, (err) => {
  console.error('#d3k2jk error!');
  console.error(err);
});
