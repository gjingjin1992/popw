import React from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';
import {SmoothScroll} from '../helpers/SmoothScroll.js';

import {SettingsStore} from '../stores/SettingsStore.js';
import {OrderStore} from '../stores/OrderStore.js';
import {OrderActions} from '../actions/OrderActions.js';
import {CustomiserStyle} from './CustomiserStyle.jsx';
import {CustomiserPreviewSegments} from './CustomiserPreviewSegments.jsx';
import {CustomiserPreviewSwirl} from './CustomiserPreviewSwirl.jsx';
import {CustomiserSelectSwirl} from './CustomiserSelectSwirl.jsx';
import {CustomiserBandColour} from './CustomiserBandColour.jsx';
import {CustomiserMessage} from './CustomiserMessage.jsx';
import {CustomiserMessageSwirl} from './CustomiserMessageSwirl.jsx';
import {CustomiserTextModes} from './CustomiserTextModes.jsx';
import {CustomiserTextColour} from './CustomiserTextColour.jsx';
import {CustomiserFont} from './CustomiserFont.jsx';
import {CustomiserTextStyle} from './CustomiserTextStyle.jsx';
import {CustomiserFooter} from './CustomiserFooter.jsx';
import {CustomiserArtwork} from './CustomiserArtwork.jsx';
import {ButtonHover} from './ButtonHover.jsx';
import GetArtwork from './../helpers/GetArtwork';

export const Customiser = React.createClass({
  getInitialState: function () {
    return {
      settings: SettingsStore.getSettings(),
      order: OrderStore.getOrder()
    };
  },
  updateStores: function () {
    this.setState({
      settings: SettingsStore.getSettings(),
      order: OrderStore.getOrder()
    });
  },
  componentDidMount: function () {
    SettingsStore.addChangeListener(this.updateStores);
    OrderStore.addChangeListener(this.updateStores);
  },
  componentWillUnmount: function () {
    SettingsStore.removeChangeListener(this.updateStores);
    OrderStore.removeChangeListener(this.updateStores);
  },
  handleQuantityChange: function (value) {
    OrderActions.ChangeQuantity(value);
  },
  handleWidthChange: function (e, index, value) {
    OrderActions.ChangeWidth(value);
  },
  handleSizeChange: function (e, index, value) {
    OrderActions.ChangeSize(value);
  },
  handleTextsOutsideChange: function (mode) {
    OrderActions.ChangeTextsOutside(mode);
  },
  handleTextInsideOnOffChange: function (value) {
    OrderActions.ChangeTextInsideOnOff(value);
  },
  handleColourChange: function (colour, action) {
    let colours = this.state.order.colours;
    switch (action) {
      case 'add':
        if (this.state.order.type === 'solid') {
          colours = [colour];
        } else {
          colours.push(colour);
        }
        break;
      case 'remove':
        if (colours.indexOf(colour) !== -1) {
          colours.splice(colours.indexOf(colour), 1);
        }
        break;
      default:
        break;
    }
    OrderActions.ChangeColour(colours);
  },
  handleTypeChange: function (e, index, value) {
    OrderActions.ChangeType(value);
  },
  handleMessageChange: function (e) {
    if (e.target.value.length < 61) {
      OrderActions.ChangeMessage(e.target.value);
    }
  },
  handleMessageChange_2: function (e) {
    if (e.target.value.length < 61) {
      OrderActions.ChangeMessage_2(e.target.value);
    }
  },
  handleMessageChangeInside: function (e) {
    if (e.target.value.length < 61) {
      OrderActions.ChangeMessageInside(e.target.value);
    }
  },
  handleSwirlChange: function (swirl_index) {
    OrderActions.ChangeSwirlSelected(swirl_index);
  },
  handleTextColourChange: function (value) {
    OrderActions.ChangeTextColour(value);
  },
  handleFontChange: function (e, index, value) {
    OrderActions.ChangeFont(value);
  },
  handleTextStyleChange: function (e, index, value) {
    if (['embossed', 'debossed'].indexOf(value) !== -1) {
      OrderActions.ChangeTextColour('N/A');
    }
    OrderActions.ChangeTextStyle(value);
  },
  hadleFontChange: function (e, index, val) {
    OrderActions.ChangeFont(val);
  },
  handleArtworkChangeLeft: function ({base64}) {
    OrderActions.ChangeArtwork({which: 'left', base64: base64});
  },
  handleArtworkChangeRight: function ({base64}) {
    OrderActions.ChangeArtwork({which: 'right', base64: base64});
  },
  handleAddToCart: function ({new_item}) {
    if (!parseInt(document.getElementById('CustomiserFooterQuantity').value, 10)) {
      document.getElementById('CustomiserFooterQuantity').focus();
    } else {
      OrderActions.AddToCart({new_item: new_item});
    }
  },
  handleResetCustomiser: function ({new_item}) {
    OrderActions.Reset();
  },
  render: function () {

    const styles = this.getStyles();
    let loading = <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
      <CircularProgress color={'#f0256d'} size={1.5}/>
    </div>;

    let content = (this.state.settings === null || this.state.order === null)
      ? <div>{loading}</div>
      : this.renderAfterLoad();

    return <div>
      <div style={styles.h3}>Make a wristband</div>
      {content}
    </div>;

  },
  renderAfterLoad: function () {
    const styles = this.getStyles();

    const artworks = GetArtwork({
      artworks_left: this.state.order.artworks.left,
      artworks_right: this.state.order.artworks.right,
      artworks_left_black: this.state.order.artworks.left_black,
      artworks_right_black: this.state.order.artworks.right_black,
      text_colour: this.state.order.text_colour,
      default_width: 20
    });

    const order_artworks_2 = this.state.order.artworks_2 || {};

    const artworks_2 = GetArtwork({
      artworks_left: order_artworks_2.left || 'none',
      artworks_right: order_artworks_2.right || 'none',
      artworks_left_black: order_artworks_2.left_black || 'none',
      artworks_right_black: order_artworks_2.right_black || 'none',
      text_colour: this.state.order.text_colour
    });

    let texts_outside = this.state.order.texts_outside || 1;
    let text_inside_on_off = this.state.order.text_inside_on_off || false;

    return <div>
      <div style={{display: 'flex'}}>
        <div style={{flex: 1}}>
          <CustomiserStyle handleTypeChange={this.handleTypeChange} current_type={this.state.order.type}/>
          <CustomiserTextStyle handleTypeChange={this.handleTextStyleChange} text_style={this.state.order.text_style}/>
        </div>
        <div
          style={{textAlign: 'center', cursor: 'pointer', margin: '0 40px'}}
          onTouchTap={() => SmoothScroll({eID: 'realProducts', padding: -100})}
        >
          <ButtonHover
            onTouchTap={() => this.setState({modal_open: true})}
            style={{
              display: 'block', padding: 1, fontSize: 15, width: 70, height: 60, paddingTop: 10,
              border: '2px solid #fff', backgroundColor: '#fff', color: '#FF4081'
            }}
            hoverStyle={{backgroundColor: '#FF4081', color: '#fff', border: '2px solid #FF4081'}}
          >
            Product
            Gallery
          </ButtonHover>
        </div>
      </div>
      {(this.state.order.type === 'segments' || this.state.order.type === 'solid') ?
        <div>
          <CustomiserPreviewSegments order={this.state.order}/>
          <CustomiserBandColour
            styles={styles}
            band_colours={this.state.settings.band_colours}
            order={this.state.order}
            handleChange={this.handleColourChange}
          />
          <CustomiserTextModes
            texts_outside={texts_outside}
            text_inside_on_off={text_inside_on_off}
            handleTextsOutsideChange={this.handleTextsOutsideChange}
            handleTextInsideOnOffChange={this.handleTextInsideOnOffChange}
          />
          <CustomiserMessage
            which_text={'outside'}
            artworks={artworks}
            artworks_2={artworks}
            order={this.state.order}
            handleChange={this.handleMessageChange}
            handleChange_2={this.handleMessageChange_2}
            default_text={
              (texts_outside === 2)
                ? 'Enter 1st outside text here'
                : 'Enter outside text here'
            }
            default_text_2="Enter 2nd outside text here"
            styles={styles}
            text={this.state.order.text}
            text_2={this.state.order.text_2}
          />
          <div style={{height: 2}}></div>
          {(text_inside_on_off) ?
            <div>
              <CustomiserMessage
                which_text={'inside'}
                artworks={null}
                order={this.state.order}
                handleChange={this.handleMessageChangeInside}
                styles={styles}
                default_text="Your Message inside the Wristband"
                text={this.state.order.text_inside}
              />
              <div style={{justifyContent: 'center',
                       display: this.state.order.text_inside == '' ? 'none' : 'flex', alignItems: 'center'}}>
                There will be $20 additional cost for Inside Message
              </div>
            </div>
            : null}
          <br />
        </div> :
        <div>
          <CustomiserPreviewSwirl order={this.state.order}/>
          <CustomiserSelectSwirl
            handleChange={this.handleSwirlChange}
            swirl_selected={this.state.order.swirl_selected}
            swirls={this.state.settings.band_swirle}
          />
          <CustomiserTextModes
            texts_outside={texts_outside}
            text_inside_on_off={text_inside_on_off}
            handleTextsOutsideChange={this.handleTextsOutsideChange}
            handleTextInsideOnOffChange={this.handleTextInsideOnOffChange}
          />
          <CustomiserMessageSwirl
            which_text={'outside'}
            artworks={artworks}
            artworks_2={artworks}
            order={this.state.order}
            handleChange={this.handleMessageChange}
            handleChange_2={this.handleMessageChange_2}
            styles={styles}
            default_text={
              (texts_outside === 2)
                ? 'Enter 1st outside text here'
                : 'Enter outside text here'
            }
            default_text_2="Enter 2nd outside text here"
            text={this.state.order.text}
          />
          <div style={{height: 5}}></div>
          {(text_inside_on_off) ?
            <div>
              <CustomiserMessageSwirl
                which_text={'inside'}
                artworks={null}
                order={this.state.order}
                handleChange={this.handleMessageChangeInside}
                styles={styles}
                default_text="Your Message inside the Wristband"
                text={this.state.order.text_inside}
              />
              <div style={{justifyContent: 'center',
                       display: this.state.order.text_inside == '' ? 'none' : 'flex', alignItems: 'center'}}>
                There will be $20 additional cost for Inside Message
              </div>
            </div>
            : null}
          <br />
        </div>
      }

      {(['embossed_with_text_colour', 'debossed_with_text_colour', 'print'].indexOf(this.state.order.text_style) !== -1)
        ? <CustomiserTextColour
        order={this.state.order}
        text_colours={this.state.settings.text_colours}
        styles={styles}
        handleChange={this.handleTextColourChange}
      />
        : null
      }

      <CustomiserFont
        font={this.state.order.font}
        fonts={this.state.settings.fonts}
        handleFontChange={this.hadleFontChange}
      />


      <div style={{display: 'flex', margin: '0 0 20px'}}>
        <div style={{fontWeight: 500, width: '70px', fontSize: '16px', fontStyle: 'italic'}}>Artwork</div>
        <div style={{flex: 1, display: 'flex', padding: '5px 0px'}}>
          <CustomiserArtwork
            default_artworks={this.state.settings.artworks}
            order={this.state.order}
            buttonText={'Before text'}
            handleChange={this.handleArtworkChangeLeft}
          />
          <div style={{margin: '0px 10px',
            height: 30,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'}}
          >
            {artworks.left_black}
          </div>
          <CustomiserArtwork
            default_artworks={this.state.settings.artworks}
            order={this.state.order}
            buttonText={'After text'}
            handleChange={this.handleArtworkChangeRight}
          />
          <div style={{margin: '0px 10px',
            height: 30,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'}}
          >
            {artworks.right_black}
          </div>
        </div>
      </div>


      <CustomiserFooter
        order={this.state.order}
        styles={styles}
        handleChange={this.handleQuantityChange}
        handleWidthChange={this.handleWidthChange}
        handleSizeChange={this.handleSizeChange}
        addToCart={this.handleAddToCart}
        resetCustomiser={this.handleResetCustomiser}
      />
    </div>;
  },
  getStyles: function () {
    return {
      h3: {
        color: '#000000',
        fontSize: '26px',
        lineHeight: 1,
        fontWeight: 600,
        paddingBottom: '15px',
        textAlign: 'center'
      },
      t_grey: {
        color: '#808180',
        fontWeight: 300
      },
      t_accent: {
        color: '#FF4081',
        fontWeight: 600
      },
      palette_item: {
        width: '23px',
        height: '23px',
        margin: '3px',
        cursor: 'pointer',
        zIndex: 1,
        border: '1px solid #4f5052'
      },
      palette_selected: {
        width: '19px',
        position: 'relative',
        top: '0px',
        left: '1px',
        zIndex: 2
      },
      btn_add_to_cart: {
        cursor: 'pointer',
        backgroundColor: '#FF4081',
        color: '#fff',
        padding: '10px',
        borderRadius: '30px',
        fontWeight: 600,
        fontSize: '18px',
        textAlign: 'center',
        border: '2px solid #FF4081'
      },
      btn_reset_customizer: {
        cursor: 'pointer',
        backgroundColor: '#FF4081',
        color: '#fff',
        padding: '10px',
        borderRadius: '30px',
        fontWeight: 600,
        fontSize: '18px',
        textAlign: 'center',
        border: '2px solid #FF4081'
      },
      text_input: {
        textAlign: 'center',
        border: '1px solid rgb(102, 102, 102)',
        outline: 'none',
        width: 508,
        fontSize: '14px',
        fontWeight: 500,
        height: 26,
        fontFamily: (this.state.order) ? this.state.order.font : 'Arial',
        backgroundSize: '110% auto',
        backgroundRepeat: 'no-repeat'
      }
    };
  }
});
