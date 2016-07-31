import React from 'react';
import TextField from 'material-ui/lib/text-field';

export const CartItemQuantity = React.createClass({

  propTypes: {
    quantity: React.PropTypes.number,
    handleChange: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      quantity: this.props.quantity
    };
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.quantity !== this.state.quantity) {
      this.setState({quantity: nextProps.quantity});
    }
  },

  _handleChange: function (e) {
    let val = parseInt(e.target.value, 10) || null;

    this.setState({quantity: val});

    if (val !== null) {
      this.props.handleChange(val);
    }
  },

  render: function () {

    return (
      <TextField
        name={'quantity'}
        type={'number'}
        fullWidth={true}
        underlineFocusStyle={{borderColor: '#FF4081'}}
        inputStyle={{fontWeight: 600, fontSize: '18px'}}

        value={this.state.quantity}
        errorText={(this.state.quantity === null || this.state.quantity <= 0 || this.state.quantity > 10000) ? 'Invalid Quantity' : null}
        onChange={this._handleChange}
      />
    );
  }

});
