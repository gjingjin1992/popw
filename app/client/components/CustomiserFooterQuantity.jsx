import React from 'react';
import TextField from 'material-ui/lib/text-field';

export const CustomiserFooterQuantity = React.createClass({

  propTypes: {
    quantity: React.PropTypes.number,
    handleChange: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      quantity: this.props.quantity
    };
  },

  _handleChange: function (e) {
    let val = parseInt(e.target.value, 10) || null;

    this.setState({quantity: val});

    if (val !== null) {
      this.props.handleChange(val);
    }
  },

  render: function () {

    return <TextField
      id='CustomiserFooterQuantity'
      name={'quantity'}
      type={'number'}
      fullWidth={true}
      underlineFocusStyle={{borderColor: '#FF4081'}}
      inputStyle={{fontWeight: 600, fontSize: '18px'}}
      underlineStyle={{borderWidth: '2px', borderColor: '#c1c1c0'}}

      value={this.state.quantity}
      errorText={(this.state.quantity === null || this.state.quantity <= 0) ? 'Invalid Quantity' : null}
      onChange={this._handleChange}
    />;

  }

});
