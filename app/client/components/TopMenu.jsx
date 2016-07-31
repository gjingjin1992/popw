import React from 'react';
import {ButtonHover} from './ButtonHover.jsx';
import {SupportSessionInfo} from './SupportSessionInfo.jsx';
import {SmoothScroll, ElementInViewport} from '../helpers/SmoothScroll.js';

const styles = {
  btn: {
    borderBottom: '2px solid #000',
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    height: '44px',
    lineHeight: '46px',
    cursor: 'pointer',
    padding: '0 15px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 500,
    marginTop: '9px',
    color: '#fff',
    borderRadius: 0,
    marginLeft: '5px',
    opacity: 1
  },
  menu: {
    backgroundColor: '#000',
    position: 'fixed',
    height: '63px',
    width: '100%',
    paddingLeft: 10,
    display: 'flex',
    justifyContent: 'center',
    zIndex: 999,
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
  }
};

const hoverStyles = {
  borderColor: '#ff4081'
};

export const TopMenu = React.createClass({
  getInitialState: function () {
    return {
      btn_design: {},
      btn_track: {},
      btn_enjoy: {},
      btn_pricing: {},
      btn_contact: {},
      menuStyle: {
        opacity: 1
      }
    };
  },

  componentDidMount: function () {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  },

  componentWillUnmount: function () {
    window.removeEventListener('scroll', this.handleScroll);
  },

  handleScroll: function () {

    if (window.pageYOffset > 1 && this.state.menuStyle.backgroundColor !== 'rgba(0,0,0,0.5)') {
      this.setState({
        menuStyle: {
          backgroundColor: 'rgba(0,0,0,0.5)'
        }
      });
    } else if (window.pageYOffset < 1 && this.state.menuStyle.backgroundColor !== 'transparent') {
      this.setState({
        menuStyle: {
          backgroundColor: 'transparent'
        }
      });
    }


    if (document.getElementById('design')) {
      if (ElementInViewport({eID: 'design'})) {
        this.setState({
          btn_design: hoverStyles,
          btn_track: {},
          btn_enjoy: {},
          btn_pricing: {},
          btn_contact: {}
        });
      }
      if (ElementInViewport({eID: 'track'})) {
        this.setState({
          btn_design: {},
          btn_track: hoverStyles,
          btn_enjoy: {},
          btn_pricing: {},
          btn_contact: {}
        });
      }
      if (ElementInViewport({eID: 'enjoy'})) {
        this.setState({
          btn_design: {},
          btn_track: {},
          btn_enjoy: hoverStyles,
          btn_pricing: {},
          btn_contact: {}
        });
      }
      if (ElementInViewport({eID: 'pricing'})) {
        this.setState({
          btn_design: {},
          btn_track: {},
          btn_enjoy: {},
          btn_pricing: hoverStyles,
          btn_contact: {}
        });
      }
      if (ElementInViewport({eID: 'contact'})) {
        this.setState({
          btn_design: {},
          btn_track: {},
          btn_enjoy: {},
          btn_pricing: {},
          btn_contact: hoverStyles
        });
      }
    }
  },

  render: function () {
    return <div>
      <div style={Object.assign({}, styles.menu, this.state.menuStyle)}>
        <div style={{width: '100%', maxWidth: '1120px', display: 'flex'}}>
          <div style={{paddingTop: '13px', paddingBottom: '14px'}}>
            <img src="./images/logo-light-lrg.png" style={{width: '208px', height: '37px'}}/>
          </div>
          <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
            <SupportSessionInfo />
            <ButtonHover style={Object.assign({}, styles.btn, this.state.btn_design)} hoverStyle={hoverStyles}
                         onTouchTap={() => SmoothScroll({eID: 'design', padding: -150})}>
              Design
            </ButtonHover>
            <ButtonHover style={Object.assign({}, styles.btn, this.state.btn_track)} hoverStyle={hoverStyles}
                         onTouchTap={() => SmoothScroll({eID: 'track', padding: -100})}>
              Track
            </ButtonHover>
            <ButtonHover style={Object.assign({}, styles.btn, this.state.btn_enjoy)} hoverStyle={hoverStyles}
                         onTouchTap={() => SmoothScroll({eID: 'enjoy', padding: -165})}>
              Enjoy
            </ButtonHover>
            <ButtonHover style={Object.assign({}, styles.btn, this.state.btn_pricing)} hoverStyle={hoverStyles}
                         onTouchTap={() => SmoothScroll({eID: 'pricing', padding: -165})}>
              Pricing
            </ButtonHover>
            <ButtonHover style={Object.assign({}, styles.btn, this.state.btn_contact)} hoverStyle={hoverStyles}
                         onTouchTap={() => SmoothScroll({eID: 'contact', padding: -165})}>
              Contact
            </ButtonHover>
          </div>
        </div>
      </div>
    </div>;
  }
});
