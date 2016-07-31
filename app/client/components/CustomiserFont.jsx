import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';

export const CustomiserFont = ({font, fonts, handleFontChange}) => {

  let options = [];
  let key = 600;
  for (var f in fonts) {
    if (fonts.hasOwnProperty(f)) {
      options.push(<MenuItem key={key++} value={fonts[f].font} primaryText={fonts[f].font}
                             style={{fontFamily: fonts[f].font}}/>);
    }
  }

  return <div style={{display: 'flex', margin: '20px 0'}}>
    <div style={{fontWeight: 500, width: '70px', fontSize: '16px', fontStyle: 'italic'}}>Font</div>
    <div style={{flex: 1}}>
      <DropDownMenu
        underlineStyle={{borderWidth: '2px', borderColor: '#010101'}}
        iconStyle={{fill: '#010101'}}
        value={font} maxHeight={300} onChange={handleFontChange}
        style={{width: '490px', padding: 0, margin: -24, fontWeight: 600, fontSize:'18px', fontFamily: font}}
        autoWidth={false}>
        {options}
      </DropDownMenu>
    </div>
  </div>;
};
