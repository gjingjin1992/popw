import {ButtonHover} from './ButtonHover.jsx';

const style = {
  btn: {
    border: '2px solid #000', backgroundColor: '#fff', color: '#000', padding: '10px 20px', marginLeft: '12px'
  },
  btn_hover: {
    backgroundColor: '#000', color: '#fff'
  }
};

const highlightChat = () => {
  if (window.$arcchat) {
    window.$arcchat.close();
    setTimeout(() => {
      window.$arcchat.open();
    }, 400);
  } else {
    setTimeout(() => {
      highlightChat();
    }, 1000);
  }
};

export const Contact = () => <div>
  <h2 style={{color: '#2dafca', fontSize: '28px', fontWeight: 600, marginBottom: '49px'}}>Contact Us</h2>
  <p style={{color: '#808080'}}>
    Questions? Drop us a line. We're happy to help :-)
  </p>
  <div style={{margin: '40px 0 50px'}}>
    <ButtonHover style={style.btn} hoverStyle={style.btn_hover}><a style={{color: 'inherit', textDecoration: 'none'}}
                                                                   href="mailto:sales@popwristbands.com">EMAIL
      US</a></ButtonHover>
    <ButtonHover style={style.btn} hoverStyle={style.btn_hover} onTouchTap={highlightChat}>LIVE CHAT</ButtonHover>
  </div>
  <div style={{color: '#000', fontSize: '18px', fontWeight: 600, margin: '0 0 5px'}}>Call us</div>
  <div style={{color: '#878787', fontSize: '28px', fontWeight: 600}}>
    <a style={{color: 'inherit', textDecoration: 'none'}} href="tel:0018777785832">(001)877-778-5832</a>
  </div>

</div>;
