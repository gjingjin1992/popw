import React from 'react';
import {TopMenu} from './TopMenu.jsx';
import {Design} from './Design.jsx';
import {Cart} from './Cart.jsx';
import {TrackingRodemap} from './TrackingRodemap.jsx';
import {Rating} from './Rating.jsx';
import {RealProductGallery} from './RealProductGallery.jsx';
import {PopularQuestions} from './PopularQuestions.jsx';
import {Contact} from './Contact.jsx';
import {Footer} from './Footer.jsx';
import {ReviewOrderStore} from '../stores/ReviewOrderStore.js';
import {PricingTabs} from './PricingTabs.jsx';
import HardwareKeyboardArrowUp from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-up';
import IconButton from 'material-ui/lib/icon-button';
import {SmoothScroll} from '../helpers/SmoothScroll.js';

export const Home = React.createClass({

  getInitialState: function () {
    return {
      reviewOrder: ReviewOrderStore.getOrder()
    };
  },
  componentDidMount: function () {
    ReviewOrderStore.addChangeListener(() => this.setState({reviewOrder: ReviewOrderStore.getOrder()}));
  },
  componentWillUnmount: function () {
    ReviewOrderStore.removeChangeListener(() => this.setState({reviewOrder: ReviewOrderStore.getOrder()}));
  },
  render: function () {
    return <div style={{fontFamily: 'Poppins, sans-serif'}} id="top">
      <TopMenu />
      <div style={{position: 'fixed', bottom: 10, right: 10}}>
        <IconButton
          iconStyle={{width: 60, height: 60}}
          style={{height: 120, width: 120}}
          onTouchTap={() => SmoothScroll({eID: 'top', padding: 0})}
        >
          <HardwareKeyboardArrowUp />
        </IconButton>
      </div>
      <div>
        <Design />
        <Cart />
        {(this.state.reviewOrder !== null) ? <Cart reviewOrder={this.state.reviewOrder}/> : null}
        <TrackingRodemap />
        <Rating />
        <h1 style={{fontSize: '32px', fontWeight: 700, color: '#01BCD4',
                     paddingTop: '43px', textAlign: 'center', lineHeight: 1}}
            id="realProducts"
        >
          Product Gallery
        </h1>
        <RealProductGallery />
        <div style={{backgroundColor: '#f3f6f7', borderTop: '3px solid #dfe0df', borderBottom: '3px solid #dfe0df',
                      display: 'flex', justifyContent: 'center', padding: '30px 50px 50px'}}>
          <div style={{width: '90%'}}>
            <h2 id='pricing' style={{color: '#000000', fontSize: '28px', fontWeight: 600, textAlign: 'center'}}>
              Pricing table
            </h2>
            <PricingTabs />
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: '90px'}}>
          <div style={{display: 'flex', flexWrap: 'wrap', maxWidth: '1000px', flex: 1}}>
            <div style={{flex: 1, minWidth: '500px', display: 'flex', justifyContent: 'center'}}>
              <PopularQuestions />
            </div>
            <div id='contact' style={{flex: 1, minWidth: '500px', display: 'flex', justifyContent: 'center'}}>
              <Contact />
            </div>
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: '90px'}}>
          <div style={{display: 'flex', flexWrap: 'wrap', maxWidth: '1000px', flex: 1}}>
<div>
            <h3 style={{color: '#2dafca', fontSize: '18px', fontWeight: 600}}>Welcome to popwristbands.com – The ultimate place to design your own wristbands.</h3>
PopWristbands is a leading manufacturer of customized wristbands all over the globe.

Whether you want to spread awareness about a particular cause or promote any product;

our personalized wristbands are apt to fulfill your each &amp; every need. We offer multiple

choices in color, size, text, symbols and print to create a customized wristband as per your

requirement. You can even get wristbands with a message written fitting to your first

choice.

At PopWristbands, we take pride for providing 100% customer satisfaction to our valuable

clients. Now get funky and top quality wristbands at your door step.<br></br>

At PopWristbands, we take pride for providing 100% customer satisfaction to our valuable

clients. Now get funky and top quality wristbands at your door step. <br></br>

<br> </br>
<h3 style={{color: '#2dafca', fontSize: '18px', fontWeight: 600}}>Design you own band at few clicks!</h3>

<br>Style - Choose from an array of styles including debossed, printed, color coat or

embossed and give a unique touch to your wristbands.</br>

<br>Size - When it comes to size we have many options for you varying from adult to child.</br>
<br>Color – Cherry-pick from hundreds of shades from our online portal and give a matchless hue to your wristband.</br>
<br>Font - Pick up the font size of your choice and let our professional designers to

assist you in getting your unique piece perfectly made. Get your customized

message crafted or even logo inscribed on your personal wristband. Just upload it

online or send us an email and your work is done.</br>


 
<h3 style={{color: '#2dafca', fontSize: '18px', fontWeight: 600}}>What makes us different from others?</h3>


PopWristbands is a forerunner in the manufacturing of superior quality custom wristbands.

Avail the best offer and order cheap wristbands at a minimal budget. Make payment by

credit card, money orders, checks, bank wire transfer or in USD dollars we accept all.

            </div>
          </div>
        </div>
        <div
          style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: '110px', marginBottom: '50px'}}>
          <div style={{display: 'flex', flexWrap: 'wrap', maxWidth: '1000px', flex: 1}}>
            <Footer />
          </div>
        </div>
      </div>
    </div>;
  }

});
