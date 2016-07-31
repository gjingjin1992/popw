import React from 'react';
import TextField from 'material-ui/lib/text-field';
import {ButtonHover} from './ButtonHover.jsx';
import {OrderActions} from './../actions/OrderActions';
import Snackbar from 'material-ui/lib/snackbar';
import {validateCoupon} from './../helpers/Hydra';

export const CartCoupon = React.createClass({
  getInitialState: function () {
    return {
      show_input: false,
      snackbar: null
    };
  },
  getDefaultProps: function () {
    return {
      disabled: false
    };
  },

  handleApplyCoupon: function () {
    const user_input = this.refs.input_coupon.getValue();

    validateCoupon({
      coupon_code: user_input,
      cb: (err, data) => {
        if (err === null) {
          OrderActions.ChangeDiscountCoupon(data);
          this.setState({snackbar: 'Coupon applied'});
        } else {
          this.setState({snackbar: 'Invalid coupon'});
        }
      }
    });

  },

  render: function () {
    return (this.props.disabled === false && this.state.show_input) ? this.render_input() : this.render_text();
  },
  render_text: function () {

    return <div style={{textAlign: 'right'}}>
      <ButtonHover
        style={{backgroundColor: 'transparent', color: '#FF4081', padding: '0px 5px', fontWeight: 300,
              fontSize: 'inherit', border: '2px solid transparent', height: 35, margin: '23px 0 0 20px',
              opacity: (this.props.disabled) ? 0.3 : 1
              }}
        hoverStyle={{backgroundColor: (this.props.disabled) ? 'N/A' : '#FF4081',
          color: (this.props.disabled) ? '#ff4081' : '#fff',
          border: (this.props.disabled) ? '2px solid transparent' : '2px solid #FF4081',
          cursor: (this.props.disabled) ? 'default' : 'pointer'
          }}
        onTouchTap={() => (this.props.disabled) ? null : this.setState({show_input: true})}
      >
        I have discount coupon
      </ButtonHover>
    </div>;
  },
  render_input: function () {

    return <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <TextField
        ref="input_coupon"
        style={{width: 150}}
        floatingLabelText="Enter coupon code"
        underlineFocusStyle={{borderColor: '#FF4081'}}
        floatingLabelStyle={{color: '#c1c1c0'}}
        inputStyle={{fontWeight: 600, fontSize: '18px'}}
        underlineStyle={{borderWidth: '2px', borderColor: '#c1c1c0'}}
      />
      <ButtonHover
        style={{backgroundColor: 'transparent', color: '#FF4081', padding: 5, fontWeight: 300, fontSize: '16px',
        border: '2px solid transparent', height: 27, margin: '23px 0 0 20px'}}
        hoverStyle={{backgroundColor: '#FF4081', color: '#fff', border: '2px solid #FF4081'}}
        onTouchTap={this.handleApplyCoupon}
      >
        Apply
      </ButtonHover>

      <ButtonHover
        style={{backgroundColor: 'transparent', color: '#FF4081', padding: '0px 5px', fontWeight: 300, fontSize: '26px',
        border: '2px solid transparent', height: 35, margin: '23px 0 0 20px'}}
        hoverStyle={{backgroundColor: '#FF4081', color: '#fff', border: '2px solid #FF4081'}}
        onTouchTap={() => this.setState({show_input: false})}
      >
        &times;
      </ButtonHover>

      <Snackbar
        open={this.state.snackbar !== null}
        message={this.state.snackbar || ''}
        autoHideDuration={5000}
        onRequestClose={() => this.setState({snackbar: null})}
      />
    </div>;
  }

});
