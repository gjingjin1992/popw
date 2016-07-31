export const CustomiserPreviewSwirl = ({order, cartItem = false}) => {

  const style = {
    display: 'flex',
    flex: 1,
    height: (cartItem) ? 56 : 116,
    marginTop: (cartItem) ? 10 : 9,
    justifyContent: 'center',
    backgroundImage: `URL(./images/swirl/${(cartItem)
      ? order.swirl_selected
      : 'big_preview/' + order.swirl_selected}.png)`,
    backgroundSize: '100% auto',
    backgroundRepeat: 'no-repeat'
  };

  let image_src = '';
  switch (order.text_style) {
    case 'embossed_with_text_colour':
      image_src = './images/embossed.png';
      break;
    case 'embossed':
      image_src = './images/embossed.png';
      break;
    case 'debossed_with_text_colour':
      image_src = './images/debossed.png';
      break;
    case 'debossed':
      image_src = './images/debossed.png';
      break;
    default:
      image_src = `./images/${order.text_style}.png`;
      break;
  }

  return <div style={{marginLeft: '3px', height: '115px', marginBottom: '22px'}}>
    <div style={{width: (cartItem) ? 264 : 506, height: (cartItem) ? 'auto' : 122, textAlign: 'center'}}>
      <div style={style}></div>
    </div>
    <img
      style={{width: (cartItem) ? 225 : 402,
        height: (cartItem) ? 21 : 40,
        position: 'relative',
        top: (cartItem) ? -57 : -56,
        left: (cartItem) ? -15 : 51,
        zIndex: 3}}
      src={image_src}/>
  </div>;
};
