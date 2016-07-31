import React from 'react';
import {ButtonHover} from './ButtonHover.jsx';
import TextField from 'material-ui/lib/text-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import {CustomiserFooterQuantity} from './CustomiserFooterQuantity.jsx';

export const CustomiserFooter = React.createClass({

  render: function () {

    const styles = this.props.styles;
    const order = this.props.order;
    const handleChange = this.props.handleChange;
    const handleWidthChange = this.props.handleWidthChange;
    const handleSizeChange = this.props.handleSizeChange;
    const addToCart = this.props.addToCart;
    const resetCustomiser = this.props.resetCustomiser;

    let menu_items_band_widths = [];

    menu_items_band_widths.push(<MenuItem key={'ad_12'} value={'1/4 inch'} primaryText={'1/4 inch'}/>);
    menu_items_band_widths.push(<MenuItem key={'ad_11'} value={'1/2 inch'} primaryText={'1/2 inch'}/>);
    menu_items_band_widths.push(<MenuItem key={'ad_13'} value={'1 inch'} primaryText={'1 inch'}/>);

    let menu_items_band_sizes = [];
    menu_items_band_sizes.push(<MenuItem key={'ad_22'} value={'child'} primaryText={'child'}/>);
    menu_items_band_sizes.push(<MenuItem key={'ad_21'} value={'youth'} primaryText={'youth'}/>);
    menu_items_band_sizes.push(<MenuItem key={'ad_23'} value={'adult'} primaryText={'adult'}/>);

    return <div>

      <div style={{display: 'flex', margin: '30px 0 0px'}}>

        <div style={{flex: 1}}>
          <div style={{
            fontWeight: 600, fontSize: '18px', lineHeight: '60px', marginRight: '20px',
            display: 'flex', flexDirection: 'row'
            }}
          >
            <div style={{marginRight: 15}}>
              Quantity
            </div>
            <div style={{width: 100}}>
              <CustomiserFooterQuantity
                quantity={order.quantity}
                handleChange={handleChange}
              />
              <div style={Object.assign({}, styles.t_grey, {lineHeight: '18px', fontWeight: 300, fontSize: '13px'})}>
                ${Math.round(order.price / order.quantity, 2) / 100} per item
              </div>
            </div>
          </div>
          <div style={{flex: 1}}>
            <div style={{display: 'flex'}}>
              <div style={{flex: 1}}>

              </div>


            </div>
          </div>
        </div>
        <div style={{flex: 1}}>
          <div style={{display: 'flex'}}>
            <div style={Object.assign({}, styles.grey_text, {width: 100, paddingTop: 16})}>Band Width:</div>
            <DropDownMenu value={order.band_width} onChange={handleWidthChange}
                          style={{fontWeight: 600, fontSize: '18px', width: 150}}>
              {menu_items_band_widths}
            </DropDownMenu>
          </div>
          <div style={{display: 'flex'}}>
            <div style={Object.assign({}, styles.grey_text, {width: 100, paddingTop: 16})}>Band Size:</div>
            <DropDownMenu value={order.band_size} onChange={handleSizeChange}
                          style={{fontWeight: 600, fontSize: '18px', width: 150}}>
              {menu_items_band_sizes}
            </DropDownMenu>
          </div>
        </div>
      </div>
      <div style={Object.assign({}, styles.t_grey, {marginTop: '10px', display: 'flex', justifyContent: 'center'})}>
        <ButtonHover
          onTouchTap={addToCart}
          style={styles.btn_add_to_cart}
          hoverStyle={{backgroundColor: '#fff', color: '#FF4081'}}>
          ADD TO LISTs
        </ButtonHover>
        <div style={{width: 150, height: 25}}></div>
        <ButtonHover
          onTouchTap={resetCustomiser}
          style={styles.btn_reset_customizer}
          hoverStyle={{backgroundColor: '#fff', color: '#FF4081'}}>
          RESET
        </ButtonHover>        
      </div>
      <div style={Object.assign({}, {color: '#FF4081', fontWeight:300, marginTop: '10px', display: 'flex', justifyContent: 'center'})}>
        Top Tips: We offer Bundle Discount when you buy multiple items (e.g. size and colors) in the same order, Best Price Guarantee!
      </div>
    </div>;
  }

});
