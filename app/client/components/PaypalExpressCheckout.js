'use strict';
import {ButtonHover} from './ButtonHover.jsx';
var React = require('react');
var ReactScriptLoaderMixin = require('react-script-loader').ReactScriptLoaderMixin;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var ReactPaypalExpressCheckout = React.createClass({

  mixins: [ReactScriptLoaderMixin],

  getInitialState: function() {
    return {
      scriptLoading: true,
      scriptLoadError: false
    };
  },

  propTypes: {
    user_id: React.PropTypes.func.isRequired,
    amt_usd: React.PropTypes.func.isRequired,
    qty_ttl: React.PropTypes.func.isRequired,
    on_click: React.PropTypes.func.isRequired,
    btn_style: React.PropTypes.object.isRequired
  },

  // Used by scriptLoader mixin
  getScriptURL: function() {
    return '//www.paypalobjects.com/api/checkout.js';
  },

  initiate_checkout: function(){
    let props = this.props;
    let url = '//payment.popwristbands.com/initiate?tkn=' + props.user_id() + '&amt='+props.amt_usd()+'&qty='+props.qty_ttl();
    props.on_click();
    paypal.checkout.startFlow(url);
  },

  statics: {
    paypalHandler: null,
    scriptDidError: false
  },

  hasPendingClick: false,

  onScriptLoaded: function() {
    this.setState({scriptLoading: false});
    paypal.checkout.setup('FPP5RGEDAR9EE', {
      container: ['form_paypal_checkout'],
      click: this.initiate_checkout
    });
  },
  onScriptError: function() {
    this.hideLoadingDialog();
    ReactPaypalExpressCheckout.scriptDidError = true;
    this.props.onScriptError &&
      this.props.onScriptError.apply(this);
  },
  render: function render() {
    return <div>
      <div id="form_paypal_checkout" style={{display: "none"}}></div>
      <ButtonHover
        style={this.props.btn_style}
        onTouchTap={this.initiate_checkout}
        hoverStyle={{backgroundColor: '#f3226e', color: '#fff'}}>CHECKOUT</ButtonHover>
    </div>
  }
});

module.exports = ReactPaypalExpressCheckout;
