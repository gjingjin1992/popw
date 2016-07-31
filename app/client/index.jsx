import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';

// not really needed anymore, but stuff not stable @main react lib
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

// for dev tools
window.React = React;

((proxied) => {
  console.log = function () {
    return proxied.apply(this, arguments);
  };
})(console.log);


var routes = require('./routes.jsx');
var ga = require('react-ga');
ga.initialize('UA-78243156-1', {debug: true});

function logPageView() {
  ga.pageview(window.location.pathname);
}

render(<Router history={browserHistory} onUpdate={logPageView}>{routes}</Router>, document.getElementById('app'));
