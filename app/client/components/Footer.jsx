var ReactTooltip = require('react-tooltip');

export const Footer = () => <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
  <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
    <img src={'./images/logo-dark-lrg.png'} style={{width: '250px', height: '36px'}}/>
  </div>
  <ReactTooltip />
</div>;
