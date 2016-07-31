import ActionDone from 'material-ui/lib/svg-icons/action/done';

export const CustomiserBandColour = ({styles, band_colours, order, handleChange}) => {

  let colours = order.colours;
  let options = [];
  let key = 100;

  for (var bc in band_colours) {
    if (band_colours.hasOwnProperty(bc)) {
      let hex = band_colours[bc].hex;

      let title = band_colours[bc].name || '';
      let selected = (colours.indexOf(hex) !== -1);

      let selectCallback = handleChange.bind(null, hex,
        (selected) ? (colours.length === 1) ? '' : 'remove'
          : (colours.length === 7) ? '' : 'add'
      );

      options.push(<div
        key={key++}
        data-tip={title}
        style={Object.assign({}, styles.palette_item, {backgroundColor: hex})}
        onTouchTap={selectCallback}>
        {(selected)
          ? <ActionDone style={styles.palette_selected} color={(hex === '#ffffff') ? '#000' : '#fff'}/>
          : null}
      </div>);
    }
  }

  return <div style={{display: 'flex', margin: '0 0 20px'}}>
    <div style={{fontWeight: 500, width: '70px', fontSize: '16px', fontStyle: 'italic'}}>Band<br />colour</div>
    <div style={{flex: 1}}>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {options}
      </div>
    </div>
  </div>;
};
