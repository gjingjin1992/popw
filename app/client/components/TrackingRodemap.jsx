import {ReviewOrderStore} from '../stores/ReviewOrderStore.js';

export const TrackingRodemap = React.createClass({
  getInitialState: function () {
    return {
      reviewOrder: ReviewOrderStore.getOrder()
    };
  },
  componentDidMount: function () {
    ReviewOrderStore.addChangeListener(() => this.setState({reviewOrder: ReviewOrderStore.getOrder()}));
  },
  componentWillUnmount: function () {
    ReviewOrderStore.addChangeListener(() => this.setState({reviewOrder: ReviewOrderStore.getOrder()}));
  },

  render: function () {

    const styles = this.getStyles();

    const is_valid_order = (typeof this.state.reviewOrder === 'object' && this.state.reviewOrder !== null);
    const trackings = is_valid_order
      ? this.state.reviewOrder.trackings || {}
      : {};

    let colors = {
      step_1: '#ffffff',
      step_2: '#ffffff',
      step_3: '#ffffff',
      step_4: '#ffffff',
      pending: '#ffffff',
      completed: '#E1FFE5',
      started: '#FBFFCF'
    };

    if (is_valid_order) {
      colors.step_1 = colors.completed;
    } else {
      colors.step_1 = colors.started;
    }
    if (!!trackings.review && trackings.review.status === 'completed') {
      colors.step_2 = colors.completed;
    } else if (typeof trackings.review === 'object' && trackings.review.status === 'started') {
      colors.step_2 = colors.started;
    }
    if (!!trackings.craft && trackings.craft.status === 'completed') {
      colors.step_3 = colors.completed;
    } else if (typeof trackings.craft === 'object' && trackings.craft.status === 'started') {
      colors.step_3 = colors.started;
    }
    if (!!trackings.ship && trackings.ship.status === 'completed') {
      colors.step_4 = colors.completed;
    } else if (typeof trackings.ship === 'object' && trackings.ship.status === 'started') {
      colors.step_4 = colors.started;
    }

    return <div style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{maxWidth: 1120}}>
        <h1 style={styles.h1} id="track">Real-time order tracking</h1>
        <h2 style={styles.h2}>See the status of your order at any time.</h2>
        <div style={{position: 'relative', width: '600px'}}>
          <div
            style={{borderRight: '3px solid #dfe0df',
              height: '1420px',
              position: 'relative',
              zIndex: 1,
              top: 0,
              left: '-2px',
              width: '50%'}}>
          </div>
          <div style={{position: 'absolute', zIndex: 2, top: 0, left: 0}}>

            <div style={{display: 'flex', width: '600px', marginTop: '120px'}}>
              <div style={{width: '230px', textAlign: 'right'}}>
                <div style={styles.title}>You design a wristband</div>
                <div style={styles.subtitle}>We make the design easy. It just takes a few clicks!</div>
              </div>
              <div style={{width: '140px', display: 'flex', justifyContent: 'center'}}>
                <div
                  style={Object.assign({}, styles.tracking_bubble,
                  {border: '2px solid #01bbd3', color: '#01bbd3', backgroundColor: colors.step_1})}>
                  1
                </div>
              </div>
              <div style={{width: '230px', display: 'flex'}}>
                <img src={'./images/icon-1.png'} style={{width: '75px', height: '75px'}}/>
                <div>
                  {(!!trackings.design && !!trackings.design.comment) ?
                    <div style={{margin: '11px', backgroundColor: colors[trackings.design.status]}}>{trackings.design.comment}</div> : null}
                </div>
              </div>
            </div>

            <div style={{display: 'flex', width: '600px', marginTop: '120px', textAlign: 'right'}}>
              <div style={{width: '230px', display: 'flex'}}>
                <div>
                  {(!!trackings.review && !!trackings.review.comment) ?
                    <div style={{margin: '11px', backgroundColor: colors[trackings.review.status]}}>{trackings.review.comment}</div> : null}
                </div>
                <img src={'./images/icon-2.png'} style={{width: '75px', height: '75px'}}/>
              </div>
              <div style={{width: '140px', display: 'flex', justifyContent: 'center'}}>
                <div
                  style={Object.assign({}, styles.tracking_bubble,
                  {border: '2px solid #01bbd3', color: '#01bbd3', backgroundColor: colors.step_2})}>
                  2
                </div>
              </div>
              <div style={{width: '230px', textAlign: 'left'}}>
                <div style={styles.title}>We review your design</div>
                <div style={styles.subtitle}>Your design is reviewed by a professional designer.</div>
              </div>
            </div>

            <div style={{display: 'flex', width: '600px', marginTop: '120px'}}>
              <div style={{width: '230px', textAlign: 'right'}}>
                <div style={styles.title}>We create your wristbands</div>
                <div style={styles.subtitle}>We craft you a beautiful, sturdy wristband.</div>
              </div>
              <div style={{width: '140px', display: 'flex', justifyContent: 'center'}}>
                <div
                  style={Object.assign({}, styles.tracking_bubble,
                  {border: '2px solid #01bbd3', color: '#01bbd3', backgroundColor: colors.step_3})}>
                  3
                </div>
              </div>
              <div style={{width: '230px', display: 'flex'}}>
                <img src={'./images/icon-3.png'} style={{width: '75px', height: '75px'}}/>
                <div>
                  {(!!trackings.craft && !!trackings.craft.comment) ?
                    <div style={{margin: '11px', backgroundColor: colors[trackings.craft.status]}}>{trackings.craft.comment}</div> : null}
                </div>
              </div>
            </div>

            <div style={{display: 'flex', width: '600px', marginTop: '120px', textAlign: 'right'}}>
              <div style={{width: '230px', display: 'flex'}}>
                <div>
                  {(!!trackings.ship && !!trackings.ship.comment) ?
                    <div style={{margin: '11px', backgroundColor: colors[trackings.ship.status]}}>{trackings.ship.comment}</div> : null}
                </div>
                <img src={'./images/icon-4.png'} style={{width: '75px', height: '75px'}}/>
              </div>
              <div style={{width: '140px', display: 'flex', justifyContent: 'center'}}>
                <div
                  style={Object.assign({}, styles.tracking_bubble,
                  {border: '2px solid #01bbd3', color: '#01bbd3', backgroundColor: colors.step_4})}>
                  4
                </div>
              </div>
              <div style={{width: '230px', textAlign: 'left'}}>
                <div style={styles.title}>We ship your wristbands</div>
                <div style={styles.subtitle}>Super fast shipping to anywhere in the world.</div>
              </div>
            </div>

            <div style={{display: 'flex', width: '600px', marginTop: '120px' }}>
              <div style={{width: '230px', textAlign: 'right'}}>
                <div style={styles.title}>You revieve the wristbands</div>
                <div style={styles.subtitle}>Pass out wristbands and share your message with the world!</div>
              </div>
              <div style={{width: '140px', display: 'flex', justifyContent: 'center'}}>
                <div
                  style={Object.assign({}, styles.tracking_bubble,
                  {border: '2px solid #01bbd3', color: '#01bbd3', backgroundColor: '#ffffff'})}>
                  5
                </div>
              </div>
              <div style={{width: '230px'}}>
                <img src={'./images/icon-5.png'} style={{width: '75px', height: '75px'}}/>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>;
  },

  getStyles: function () {
    return {
      h1: {
        fontSize: '32px',
        fontWeight: 700,
        color: '#01BCD4',
        paddingTop: '43px',
        textAlign: 'center',
        lineHeight: 1
      },
      h2: {
        fontSize: '18px',
        fontWeight: 300,
        color: '#999999',
        textAlign: 'center',
        lineHeight: 1.2,
        paddingBottom: '20px'
      },
      title: {
        fontSize: '28px',
        fontWeight: 700,
        color: '#000000',
        lineHeight: 1.2
      },
      subtitle: {
        marginTop: '15px',
        fontSize: '16px',
        fontWeight: 300,
        color: '#808080'
      },
      tracking_bubble: {
        fontWeight: 700,
        borderRadius: '500px',
        width: '60px',
        height: '60px',
        textAlign: 'center',
        fontSize: '25px',
        lineHeight: '63px'
      }
    };
  }

});
