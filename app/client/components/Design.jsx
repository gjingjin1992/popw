import {Customiser} from './Customiser.jsx';

const styles = {
  container_1: {
    background: '#999',
    backgroundImage: 'url(./images/hero-nobg-3.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center top',
    backgroundSize: '100% auto',
    display: 'flex',
    justifyContent: 'center'
  },
  container_2: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  container_3: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    maxWidth: '1120px',
    marginTop: '100px',
    marginBottom: '115px'
  },
  left: {
    flex: 1,
    minWidth: '380px',
    justifyContent: 'center',
    paddingLeft: '10px'
  },
  right: {
    flex: 1,
    minWidth: '400px',
    display: 'flex',
    justifyContent: 'center',
    paddingRight: '10px'
  },
  h1: {
    color: '#ffffff',
    fontSize: '40px',
    fontWeight: 700,
    lineHeight: 1.1
  },
  h2: {
    fontSize: '27px',
    color: '#fff',
    fontWeight: 300,
    lineHeight: 1.3
  },
  h1_small: {
    color: '#ffffff',
    fontSize: '25px',
    fontWeight: 600,
    lineHeight: 1.7
  },

  h2_small: {
    fontSize: '20px',
    color: '#33cc66',
    fontWeight: 300,
    lineHeight: 1.3,
    textAlign: 'left'
  },
  customiser_container: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    width: '570px',
    padding: '20px'
  },
  banner_container1: {
    width: '450px',
    height: '180px',
    backgroundImage: 'url(./images/banner_1.png)',
    marginTop: '25px'
  },
  banner_container2: {
    width: '450px',
    height: '180px',
    backgroundImage: 'url(./images/banner_2.png)',
    marginTop: '15px'
  },
  banner_container3: {
    width: '450px',
    height: '180px',
    backgroundImage: 'url(./images/banner_3.png)',
    marginTop: '15px'
  }

};

export const Design = () => <div style={styles.container_1}>
  <div style={styles.container_2}>
    <div style={styles.container_3}>
      <div style={styles.left}>
        <h1 style={styles.h1} id="design">
          THE EASIEST WAY TO DESIGN YOUR OWN WRISTBAND<span style={{color: '#f0256d'}}>!</span>
        </h1>
        <h1>WRISTBAND</h1>
        <h2 style={styles.h2}>
          You have a message to share. We'll help you spread it, one wristband at a time.
        </h2>
        <br></br>
        <div style={styles.banner_container1}></div>
        <div style={styles.banner_container2}></div>
        <div style={styles.banner_container3}></div>
      </div>
      <div style={styles.right}>
        <div style={styles.customiser_container}>
          <Customiser />
        </div>
      </div>
    </div>
  </div>
</div>;
