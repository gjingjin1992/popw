import React from 'react';
const StripeCheckout = require('react-stripe-checkout');
import ReactPaypalExpressCheckout from './PaypalExpressCheckout.js';
import CircularProgress from 'material-ui/lib/circular-progress';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import {RadioButton, RadioButtonGroup} from 'material-ui/lib';
import TextField from 'material-ui/lib/text-field';
import {ButtonHover} from './ButtonHover.jsx';
import {CartItem} from './CartItem.jsx';
import {SettingsStore} from '../stores/SettingsStore.js';
import {OrderStore} from '../stores/OrderStore.js';
import {UserStore} from '../stores/UserStore.js';
import {SmoothScroll} from '../helpers/SmoothScroll.js';
import {OrderActions} from '../actions/OrderActions.js';
import Snackbar from 'material-ui/lib/snackbar';
import GetDeliveryDate from './../helpers/GetDeliveryDate';
import {CartCoupon} from './CartCoupon';
import {red500} from 'material-ui/lib/styles/colors';
import Dialog from 'material-ui/lib/Dialog';
import FlatButton from 'material-ui/lib/flat-button';
import SocialMood from 'material-ui/lib/svg-icons/social/mood';
const ga = require('react-ga');
var ReactTooltip = require('react-tooltip');

// auto save additional comment
let autoSaveTimeout = null;

export const Cart = React.createClass({

  getInitialState: function () {
    return {
      shippingInfoWarningOpen: false,
      order: this.props.reviewOrder || OrderStore.getOrder(),
      settings: SettingsStore.getSettings(),
      snackbar: null
    };
  },
  updateStores: function () {

    if (this.state.settings === null || this.state.order === null) {
      if (!this.props.reviewOrder && document.getElementById('reviewCart')) {
        setTimeout(()=> {
          SmoothScroll({eID: 'track', padding: -100});
        }, 500);
      }
    }

    this.setState({
      settings: SettingsStore.getSettings(),
      order: this.props.reviewOrder || OrderStore.getOrder()
    });
  },
  componentDidMount: function () {
    SettingsStore.addChangeListener(this.updateStores);
    if (!this.props.reviewOrder) {
      OrderStore.addChangeListener(this.updateStores);
    }
  },
  componentWillUnmount: function () {
    if (autoSaveTimeout !== null) {
      this._saveAdditionalComment();
      clearTimeout(autoSaveTimeout);
    }
    SettingsStore.removeChangeListener(this.updateStores);
    if (!this.props.reviewOrder) {
      OrderStore.removeChangeListener(this.updateStores);
    }
  },

  handleQuantityChange: function (item_id, value) {
    OrderActions.ChangeQuantityInCart(item_id, value);
  },

  handleItemRemove: function (item_id) {
    OrderActions.RemoveFromCart(item_id);
  },

  handleReorder: function () {
    if (!this.props.reviewOrder) {
      return;
    }
    this.props.reviewOrder.items.map((item) => {
      let new_item = Object.assign({}, item, {
        colours: (item.type === 'segments') ? item.colours : null,
        swirl_selected: (item.type === 'swirl') ? item.swirl_selected : null
      });
      OrderActions.AddToCart({new_item: new_item});
    });
  },

  handleShippingChange: function (e, index, val) {
    OrderActions.ChangeShipping(val);
  },
  handleSizeChange: function (e, index, val) {
    OrderActions.ChangeBandSize(val);
  },
  handleDestinationChange: function (e, index, val) {
    OrderActions.ChangeDestination(val);
  },
  handlePaymentMethodOnChnage: function (e, val) {
    OrderActions.ChangePaymentMethod(val);
  },
  handleShippingFullnameChange: function (e) {
    let order = this.state.order;
    order.shipping_fullname = e.target.value;
    this.setState({
      order: order
    });
    if (autoSaveTimeout !== null) {
      clearTimeout(autoSaveTimeout);
    }
    autoSaveTimeout = setTimeout(() => {
      this._saveShippingDetails();
    }, 1000);
  },
  handleShippingAddressChange: function (e) {
    let order = this.state.order;
    order.shipping_address = e.target.value;
    this.setState({
      order: order
    });
    if (autoSaveTimeout !== null) {
      clearTimeout(autoSaveTimeout);
    }
    autoSaveTimeout = setTimeout(() => {
      this._saveShippingDetails();
    }, 1000);
  },
  handleShippingPhoneChange: function (e) {
    let order = this.state.order;
    order.shipping_phone = e.target.value;
    this.setState({
      order: order
    });
    if (autoSaveTimeout !== null) {
      clearTimeout(autoSaveTimeout);
    }
    autoSaveTimeout = setTimeout(() => {
      this._saveShippingDetails();
    }, 1000);
  },
  handleShippingPostcodeChange: function (e) {
    let order = this.state.order;
    order.shipping_postcode = e.target.value;
    this.setState({
      order: order
    });
    if (autoSaveTimeout !== null) {
      clearTimeout(autoSaveTimeout);
    }
    autoSaveTimeout = setTimeout(() => {
      this._saveShippingDetails();
    }, 1000);
  },
  handleShippingCommentChange: function (e) {
    let order = this.state.order;
    order.shipping_comment = e.target.value;
    this.setState({
      order: order
    });
    if (autoSaveTimeout !== null) {
      clearTimeout(autoSaveTimeout);
    }
    autoSaveTimeout = setTimeout(() => {
      this._saveShippingDetails();
    }, 1000);
  },
  _saveShippingDetails: function () {
    OrderActions.ChangeShippingDetails(
      this.refs.shipping_fullname.getValue(),
      this.refs.shipping_phone.getValue(),
      this.refs.shipping_address.getValue(),
      this.refs.shipping_postcode.getValue(),
      this.refs.shipping_comment.getValue()
    );
    this.setState({snackbar: 'Auto Save: Shipping Details'});
  },

  isValidOrder: function(user, order){
    let is_order_valid = false;
    console.log("user", user);
    console.log("order", order)
      if (user && order && order.shipping_fullname != ""
      && order.shipping_address != ""
      && order.shipping_phone != ""
      && order.shipping_postcode != ""
      && order.cart && order.cart.length > 0){
        is_order_valid = true;
        Object.keys(order.cart).forEach((key) => {
          let item = order.cart[key];
          if (item.price == 0 || item.price==null) {
            is_order_valid = false;
          }
        })
      }
    return is_order_valid;
  },

  getCheckoutId: function(){
    return this.isValidOrder(UserStore.getActiveUser(), this.state.order) ? UserStore.getActiveUser().uid : null; 
  },

  getCheckoutAmt: function(){
    return this.isValidOrder(UserStore.getActiveUser(), this.state.order) ? this.state.order.final_price : 0; 
  },

  getCheckoutQty: function(){
    return this.isValidOrder(UserStore.getActiveUser(), this.state.order) ? this.state.order.total_quantity: 0; 
  },

  onStripeToken: function (token, addresses) {
    OrderActions.saveStripeToken({token: token, addresses: addresses});
  },

  handleShippingDialogClose: function()
  {
    this.state.shippingInfoWarningOpen = false;
    this.setState(this.state);
  },

  render: function () {
    const styles = this.getStyles();
    let loading = <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><CircularProgress
      color={'#f0256d'} size={1.5}/></div>;
    let menu_items = [];
    let menu_items_destinations = [];
    let cart_items = [];
    let delivery_date = '';
    let discount_coupon = '';

    if (this.state.settings !== null && this.state.order !== null) {
      if (this.state.order.discount_coupon !== '') {
        let discount = '';

        if (this.state.order.discount_coupon.type === 'percent') {
          discount = `-${this.state.order.discount_coupon.value}%`;
        } else if (this.state.order.discount_coupon.type === 'fixed') {
          discount = `-$${(this.state.order.discount_coupon.value / 100).toFixed(2)}`;
        }

        discount_coupon = `${this.state.order.discount_coupon.code} (${discount})`;

        discount_coupon = <div style={{marginTop: 25, textAlign: 'right'}}>
          Discount coupon: {discount_coupon}
        </div>;
      }

      delivery_date = 'Guarantee Delivery: ' + GetDeliveryDate({days: parseInt(this.state.order.shipping, 10)});
      delivery_date = this.state.order.guarantee_delivery_date || delivery_date
      let k = 500;

      this.state.settings.shipping.map((i) => {
        k++;
        menu_items.push(<MenuItem key={k} value={i.pricing_category} primaryText={i.title}/>);
      });


      menu_items_destinations.push(<MenuItem key={1} value={'USA/Canada'} primaryText={'USA/Canada'}/>);
      menu_items_destinations.push(<MenuItem key={2} value={'Europe & UK'} primaryText={'Europe & UK'}/>);
      menu_items_destinations.push(<MenuItem key={3} value={'South America'} primaryText={'South America'}/>);
      menu_items_destinations.push(<MenuItem key={4} value={'Australia'} primaryText={'Australia'}/>);

      if (!this.props.reviewOrder) {
        this.state.order.cart.map((i) => {
          k++;
          cart_items.push(<CartItem styles={styles} key={k} item={i}
                                    handleQuantityChange={this.handleQuantityChange.bind(null, i.id)}
                                    handleItemRemove={this.handleItemRemove.bind(null, i.id)}/>);
        });
      } else {

        this.state.order.items.map((i) => {
          k++;
          cart_items.push(<CartItem styles={styles} key={k} item={i} preview={true}/>);
        });
      }
    }

    let btn_checkout =
      <ButtonHover style={styles.btn_checkout}
          onTouchTap={() => {
            this.state.shippingInfoWarningOpen = !this.isValidOrder(UserStore.getActiveUser(), this.state.order)
            this.setState(this.state);
          }}
        hoverStyle={{backgroundColor: '#f3226e', color: '#fff'}}>
        CHECKOUT
      </ButtonHover>
    let actions = [
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.handleShippingDialogClose}
      />
    ]

    let btn_paypal = <ReactPaypalExpressCheckout
      user_id={this.getCheckoutId}
      amt_usd={this.getCheckoutAmt}
      qty_ttl={this.getCheckoutQty}
      on_click={OrderActions.CheckoutClicked}
      btn_style={styles.btn_checkout}
    >
    </ReactPaypalExpressCheckout>
    let btn_stripe = <StripeCheckout
        token={this.onStripeToken}
        stripeKey="pk_live_xRkp51Ryy8ZwKGFVOORvkWlP"
        amount={this.getCheckoutAmt()}
        shippingAddress={false}
        billingAddress={true}
        allowRememberMe={true}
        currency="USD"
      >
        <ButtonHover
          style={styles.btn_checkout}
          onTouchTap={() => {
            OrderActions.CheckoutClicked();
          }}
          hoverStyle={{backgroundColor: '#f3226e', color: '#fff'}}>CHECKOUT</ButtonHover>
      </StripeCheckout>;

    console.log("IsValidOrder", this.isValidOrder(UserStore.getActiveUser(), this.state.order));
    if(this.isValidOrder(UserStore.getActiveUser(), this.state.order))
    {
      if(this.state.order.payment_method === 'paypal')
      {
        btn_checkout = btn_paypal;
      }else{
        btn_checkout = btn_stripe;
      }
    }
    let bundle_discount = null;
    let coupon_discount = null;

    if (this.state.settings !== null && this.state.order !== null) {
      bundle_discount = ((this.state.order.bundle_discount || 0) / 100).toFixed(2);
      if (this.state.order.coupon_discount > 0) {
        coupon_discount = ((this.state.order.coupon_discount || 0) / 100).toFixed(2);
      }
    }

    return <div
      style={{backgroundColor: (!this.props.reviewOrder) ? '#f3f6f7' : '#EFFBF2',
                borderBottom: '3px solid #dfe0df',
                paddingBottom: '75px',
                display: 'flex', justifyContent: 'center'}}
    >
      <div style={{maxWidth: '1120px', flex: 1}}>
        <div id="myCart"
             style={{fontSize: '32px', color: '#01BCD4', textAlign: 'center', padding: '50px 0', fontWeight: 600}}>
          {(!this.props.reviewOrder) ? 'My Order List' : <span id="reviewCart">Review your previous order</span>}
        </div>

        {(this.state.settings === null || this.state.order === null) ? <div>{loading}</div> : <div>
          <div>{cart_items}</div>
          <span style={styles.grey_text}>Shipping Details:</span>
        {(this.props.reviewOrder)
          ?
          <div style={{margin: '25px 0'}}>
          </div>
          :
          <div>
            <div style={{display: 'flex', flex: 1, alignItems: 'flex-end', flexWrap: 'wrap'}}>
              <div style={{flex: 1, minWidth: '300px', maxWidth: '300px', marginRight: '10px'}}>
                <TextField
                  value={this.state.order.shipping_fullname}
                  errorText={this.state.order.shipping_fullname ? "" : this.state.errorText}
                  ref="shipping_fullname"
                  floatingLabelText="Full Name"
                  underlineFocusStyle={{borderColor: '#FF4081'}}
                  floatingLabelStyle={{color: '#c1c1c0'}}
                  inputStyle={{fontWeight: 600, fontSize: '18px'}}
                  underlineStyle={{borderWidth: '2px', borderColor: '#c1c1c0'}}
                  fullWidth={true}
                  onChange={this.handleShippingFullnameChange}
                />
              </div>
              <div style={{flex: 1, minWidth: '200px', maxWidth: '200px', marginRight: '10px'}}>
                <TextField
                  value={this.state.order.shipping_phone}
                  errorText={this.state.order.shipping_phone ? "" : this.state.errorText}
                  ref="shipping_phone"
                  floatingLabelText="Phone Number"
                  underlineFocusStyle={{borderColor: '#FF4081'}}
                  floatingLabelStyle={{color: '#c1c1c0'}}
                  inputStyle={{fontWeight: 600, fontSize: '18px'}}
                  underlineStyle={{borderWidth: '2px', borderColor: '#c1c1c0'}}
                  fullWidth={true}
                  onChange={this.handleShippingPhoneChange}
                />
              </div>
              <div style={{flex: 1, lineHeight: '35px', textAlign: 'right'}}>
                <div style={{display: 'flex'}}>
                  <div data-html={true} data-multiline={true} data-tip="<div style='max-width: 300px'>Wanna know what is it? It's Magic! ^_^ We will show you exactly when you add different items to the shopping cart!</div>" style={Object.assign({}, styles.grey_text, {flex: 1, marginRight: 5})}>
                    Bundle Discount:</div>
                  <div style={Object.assign({}, styles.dark_text, {width: 90, color: red500})}>
                    -${bundle_discount}
                  </div>
                </div>
                <div style={{display: (coupon_discount) ? 'flex' : 'none'}}>
                  <div style={Object.assign({}, styles.grey_text, {flex: 1, marginRight: 5})}>Coupon Discount:</div>
                  <div style={Object.assign({}, styles.dark_text, {width: 90, color: red500})}>
                    -${coupon_discount}
                  </div>
                </div>
                <div style={{display: 'flex'}}>
                  <div style={Object.assign({}, styles.grey_text, {flex: 1, marginRight: 5})}>Subtotal (Tax and Delivery
                    inclusive):
                  </div>
                  <div style={Object.assign({}, styles.dark_text, {width: 90})}>
                    ${((this.state.order.final_price || 0) / 100).toFixed(2) || 0.00}
                  </div>
                </div>
              </div>
            </div>
            <div style={{display: 'flex', flex: 1, alignItems: 'flex-end', flexWrap: 'wrap'}}>
              <div style={{flex: 1, marginRight: '135px'}}>
                <TextField
                  value={this.state.order.shipping_address}
                  ref="shipping_address"
                  errorText={this.state.order.shipping_address ? "" : this.state.errorText}
                  floatingLabelText="Full Address (includes state & country)"
                  underlineFocusStyle={{borderColor: '#FF4081'}}
                  floatingLabelStyle={{color: '#c1c1c0'}}
                  inputStyle={{fontWeight: 600, fontSize: '18px'}}
                  underlineStyle={{borderWidth: '2px', borderColor: '#c1c1c0'}}
                  fullWidth={true}
                  onChange={this.handleShippingAddressChange}
                />
              </div>
              <div style={{textAlign: 'right'}}>
                {delivery_date}
                {discount_coupon}
              </div>
            </div>
          </div>
          }
          <div style={{display: 'flex', flex: 1, alignItems: 'flex-end', flexWrap: 'wrap'}}>
            <div style={{flex: 1, marginRight: '10px'}}>
              <TextField
                value={this.state.order.shipping_postcode}
                errorText={this.state.order.shipping_postcode ? "" : this.state.errorText}
                ref="shipping_postcode"
                floatingLabelText="Post Code"
                underlineFocusStyle={{borderColor: '#FF4081'}}
                floatingLabelStyle={{color: '#c1c1c0'}}
                inputStyle={{fontWeight: 600, fontSize: '18px'}}
                underlineStyle={{borderWidth: '2px', borderColor: '#c1c1c0'}}
                fullWidth={true}
                onChange={this.handleShippingPostcodeChange}
              />
            </div>
            <div style={{flex: 1}}>
              <span style={styles.grey_text}>Continent:</span>
              {(!this.props.reviewOrder) ?
                <DropDownMenu value={this.state.order.destination} onChange={this.handleDestinationChange}
                              style={{fontWeight: 600, fontSize: '18px'}} autoWidth={true}>
                  {menu_items_destinations}
                </DropDownMenu> : <span> {this.state.order.destination}</span>}
            </div>
            <div style={{flex: 1}}>
              <span style={styles.grey_text}>Delivery:</span>
              {(!this.props.reviewOrder)
                ?
                <DropDownMenu value={this.state.order.shipping}
                              onChange={this.handleShippingChange}
                              style={{fontWeight: 600, fontSize: '18px'}}
                              autoWidth={true}>
                  {menu_items}
                </DropDownMenu>
                : <span> {this.state.order.category}</span>}
            </div>
            {(!this.props.reviewOrder) ? <CartCoupon disabled={(!cart_items.length > 0)}/> : null}
          </div>

          <div style={{display: 'flex'}}>
            <div style={{flex: 1, marginRight: 100}}>
              <div>
                {(this.props.reviewOrder)
                  ?
                  <div style={{margin: '25px 0'}}>
                    <span style={{fontWeight: 600, marginRight: 25}}>Additional comment:</span>
                    {this.state.order.shipping_comment}
                  </div>
                  :
                  <TextField
                    value={this.state.order.shipping_comment}
                    ref="shipping_comment"
                    hintText="Additional Info"
                    multiLine={true}
                    underlineFocusStyle={{borderColor: '#FF4081'}}
                    floatingLabelStyle={{color: '#c1c1c0'}}
                    inputStyle={{fontWeight: 600, fontSize: '18px'}}
                    underlineStyle={{borderWidth: '2px', borderColor: '#c1c1c0'}}
                    rows={2}
                    fullWidth={true}
                    onChange={this.handleShippingCommentChange}
                  />
                }
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 15}}>
                  <a href="http://www.americanexpress.com/" target="_blank">
                    <img data-html={true} data-multiline={true}
                      data-tip="<div style='max-width: 300px'>We accept payment from American Express</div>"
                      src={'./images/amex.png'} style={{width: 70}}/>
                  </a>
                  <a href="http://www.mastercard.com/" target="_blank">
                    <img data-html={true} data-multiline={true}
                      data-tip="<div style='max-width: 300px'>We accept payment from MasterCard</div>"
                      src={'./images/mastercard.png'} style={{width: 100}}/>
                  </a>
                  <a href="http://www.visa.com/" target="_blank">
                    <img data-html={true} data-multiline={true}
                      data-tip="<div style='max-width: 300px'>We accept payment from Visa</div>"
                      src={'./images/visa.png'} style={{width: 120}}/>
                  </a>
                  <a href="https://stripe.com/docs/security/ssl" target="_blank">
                    <img data-html={true} data-multiline={true}
                      data-tip="<div style='max-width: 300px'>Your shopping security is our number one priority. Our website is
                    secured with SSL, all information and data you provided from your browser are protected and converted into
                    virtually impenetrable code using data encryption up to 256 bits.</div>"
                      src={'./images/secure_payment.png'} style={{width: 80}}/>
                  </a>
                  <a href="http://stripe.com/" target="_blank">
                    <img data-html={true} data-multiline={true}
                      data-tip="<div style='max-width: 300px'>To make all transaction secured, we employ Stripe as our payment
                       processor. Stripe has been audited by a PCI-certified auditor, and is certified to PCI Service Provider
                       Level 1. This is the most stringent level of certification available.</div>"
                      src={'./images/powered_by_stripe.png'} style={{width: '150'}}/>
                  </a>
                </div>
                <ReactTooltip />
              </div>
            </div>
            <div>
              <div>
                {(!this.props.reviewOrder)
                  ?
                  <div>

                    <div>
                      <RadioButtonGroup name="paymentMethod" valueSelected={this.state.order.payment_method} style={{display: 'flex', justifyContent: 'center', marginTop: 15}} onChange={this.handlePaymentMethodOnChnage}>
                        <RadioButton
                          value="paypal"
                          label="Paypal"
                          style={styles.radioButton}
                        />
                        <RadioButton
                          value="stripe"
                          label="Credit Card"
                          style={styles.radioButton}
                        />
                      </RadioButtonGroup>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 5}}>
                      <div style={{marginLeft: 24}}>
                        {btn_checkout}
                        <Dialog actions={actions} modal={false} open={this.state.shippingInfoWarningOpen} onRequestClose={this.handleShippingDialogClose}>
                        Please complete shipping details before checkout, thanks!
                        </Dialog>
                      </div>
                    </div>
                    <div style={{display: (cart_items.length > 0) ? 'flex' : 'none', marginTop: 15, justifyContent: 'flex-end'}}>
                      <ButtonHover
                        style={{color: '#f3226e', border: '2px solid transparent', padding: '5px 10px', fontSize: 17,
                          fontWeight: 300, backgroundColor: 'transparent'}}
                        hoverStyle={{backgroundColor: '#f3226e', color: '#fff'}}
                        onTouchTap={() => SmoothScroll({eID: 'design', padding: -150})}
                      >
                        Continue Shopping
                      </ButtonHover>
                    </div>
                  </div>
                  :
                  <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 35}}>
                    <ButtonHover onTouchTap={this.handleReorder}
                                 style={styles.btn_checkout}
                                 hoverStyle={{backgroundColor: '#f3226e', color: '#fff'}}
                    >
                      REORDER
                    </ButtonHover>
                  </div>}
              </div>
            </div>
          </div>
        </div>
        }

      </div>
      <Snackbar
        open={this.state.snackbar !== null}
        message={this.state.snackbar || ''}
        autoHideDuration={5000}
        onRequestClose={() => this.setState({snackbar: null})}
      />
    </div>;
  },
  getStyles: () => {
    return {
      radioButton: {
        marginBottom: 16,
        marginLeft: 20,
        width: '150px',
        height: 'auto'
      },
      grey_text: {
        fontSize: '16px',
        fontWeight: 300,
        color: '#6d6d6d'
      },
      dark_text: {
        fontSize: '16px',
        fontWeight: 600,
        color: '#1e1e1e'
      },
      btn_checkout: {
        backgroundColor: '#fff',
        cursor: 'pointer',
        fontSize: '15px',
        padding: '8px 15px',
        border: '2px solid #f3226e',
        borderRadius: '20px',
        color: '#f3226e',
        fontWeight: 400
      }
    };
  }
});
