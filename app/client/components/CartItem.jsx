import {CustomiserPreviewSegments} from './CustomiserPreviewSegments.jsx';
import {CustomiserPreviewSwirl} from './CustomiserPreviewSwirl.jsx';
import GetArtwork from './../helpers/GetArtwork';
import {SettingsStore} from '../stores/SettingsStore.js';
import {CartItemQuantity} from './CartItemQuantity.jsx';

const hexToName = (hex) => {

  let settings = SettingsStore.getSettings();
  let result = hex;
  if (settings !== null) {
    Object.keys(settings.text_colours).map((key) => {
      if (settings.text_colours[key].hex === hex) {
        result = settings.text_colours[key].name || hex;
      }
    });
  }

  if (hex !== result) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }
  return result;

};

export const CartItem = ({item, handleQuantityChange, styles, handleItemRemove, preview}) => {

  const artworks = GetArtwork({
    artworks_left: item.artworks_left,
    artworks_right: item.artworks_right,
    text_colour: item.text_colour
  });
  let key = 400;
  let item_info = [];
  item_info.push(
    <div key={key++}>
      <span style={styles.grey_text}>Text Colour: </span>
      {hexToName(item.text_colour)}
    </div>
  );
  item_info.push(
    <div key={key++}>
      <span style={styles.grey_text}>Text Font: </span>
      {item.font}
    </div>
  );
  if (item.text) {
    item_info.push(
      <div key={key++}>
        <span style={styles.grey_text}>Text: </span>
        "<span style={{whiteSpace: 'pre'}}>{item.text}</span>"
      </div>
    );
  }
  if (item.text_2) {
    item_info.push(
      <div key={key++}>
        <span style={styles.grey_text}>2nd text: </span>
        "<span style={{whiteSpace: 'pre'}}>{item.text_2}</span>"
      </div>
    );
  }
  if (item.text_inside) {
    item_info.push(
      <div key={key++}>
        <span style={styles.grey_text}>Text inside: </span>
        "<span style={{whiteSpace: 'pre'}}>{item.text_inside}</span>"
      </div>
    );
  }
  if (item.band_width) {
    item_info.push(
      <div key={key++}>
        <span style={styles.grey_text}>Band width: </span>
        {item.band_width}
      </div>
    );
  }
  if (item.band_size) {
    item_info.push(
      <div key={key++}>
        <span style={styles.grey_text}>Band size: </span>
        {item.band_size}
      </div>
    );
  }
  if (artworks.left || artworks.left_black) {
    item_info.push(
      <div key={key++}>
        <span style={styles.grey_text}>Artwork before: </span>
        {artworks.left_black}
      </div>
    );
  }
  if (artworks.right || artworks.right_black) {
    item_info.push(
      <div key={key++}>
        <span style={styles.grey_text}>Artwork after: </span>
        {artworks.right_black}
      </div>
    );
  }

  return <div
    style={{display: 'flex', padding: '0 10px', margin: '15px 0', flexWrap: 'wrap'}}>
    <div style={{width: '300px', height: '90px', textAlign: 'center', lineHeight: '90px', marginBottom: '15px'}}>
      {(item.type === 'segments' || item.type === 'solid') ?
        <div>
          <CustomiserPreviewSegments order={item} cartItem={true}/>
        </div> :
        <div>
          <CustomiserPreviewSwirl order={item} cartItem={true}/>
        </div>
      }
    </div>
    <div style={{display: 'flex', paddingLeft: '30px', flex: 1}}>
      <div style={{flex: 1, minWidth: '350px'}}>
        <div>
          <span style={styles.grey_text}>Style: </span>
          {item.text_style.charAt(0).toUpperCase() + item.text_style.slice(1)}
        </div>
        {item_info}
      </div>
      <div style={{flex: 1, display: 'flex', flexDirection: 'row', flexWrap: 'no-wrap'}}>
        <div>
          <div style={{width: '85px'}}>
            <span style={styles.grey_text}>Quantity:</span>
            {(preview === true)
              ? <span style={{fontWeight: 600, fontSize: '18px'}}>{item.quantity}</span>
              : <CartItemQuantity quantity={item.quantity} handleChange={handleQuantityChange}/>
            }
          </div>
        </div>
      </div>
      <div style={{width: 140}}>
        Price: ${((parseInt(item.price, 10) || 0) / 100).toFixed(2)}
      </div>
      {(preview === true) ? null : <div style={{textAlign: 'right', paddingRight: '30px', flex: 1}}>
      <span style={{fontSize: '50px', color: '#b8babb', fontWeight: 300, cursor: 'pointer'}}
            onTouchTap={handleItemRemove}>×</span>
      </div>}
    </div>
  </div>;
};
