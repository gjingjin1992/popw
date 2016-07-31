import ActionDone from 'material-ui/lib/svg-icons/action/done';
var ReactTooltip = require('react-tooltip');

export const CustomiserTextColour = ({text_colours, order, styles, handleChange}) => {

  let text_colour = order.text_colour;
  let options = [];
  let key = 300;
  for (var tc in text_colours) {
    if (text_colours.hasOwnProperty(tc)) {
      let hex = text_colours[tc].hex;
      let title = text_colours[tc].name || '';

      let selected = (text_colour === hex);

      if (order.text_style !== 'print' || hex !== 'N/A') {
        let background = (hex === 'N/A')
          ? {backgroundImage: 'url(\'./images/transparent.png\')'}
          : {backgroundColor: hex};

        options.push(<div key={key++} data-tip={title} style={Object.assign({}, styles.palette_item, background)}
                          onTouchTap={handleChange.bind(null, hex, (selected) ? 'remove' : 'add')}>
          {(selected) ? <ActionDone style={styles.palette_selected}
                                    color={(hex === '#ffffff' || hex === 'N/A') ? '#000' : '#fff'}/> : null}
        </div>);
      }
    }
  }

  return <div style={{display: 'flex'}}>
    <div style={{fontWeight: 500, width: '70px', fontSize: '16px', fontStyle: 'italic'}}>Text<br />colour</div>
    <div style={{flex: 1}}>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {options}
      </div>
    </div>
    <ReactTooltip />

  </div>;

};
