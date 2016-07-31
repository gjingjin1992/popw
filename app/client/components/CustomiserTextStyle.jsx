import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';

export const CustomiserTextStyle = ({handleTypeChange, text_style}) => {
  return <div style={{display: 'flex', margin: '20px 0 6px'}}>
    <div style={{fontWeight: 500, width: '100px', fontSize: '16px', fontStyle: 'italic'}}>Text Style</div>
    <DropDownMenu underlineStyle={{borderWidth: '2px', borderColor: '#010101'}}
                  iconStyle={{fill: '#010101'}}
                  style={{flex: 1, padding: 0, margin: -24, fontWeight: 600, fontSize: '18px'}}
                  value={text_style} onChange={handleTypeChange} autoWidth={false}
    >
      <MenuItem value={'debossed'} primaryText="Debossed"/>
      <MenuItem value={'debossed_with_text_colour'} primaryText="Debossed with Text Colour"/>
      <MenuItem value={'embossed'} primaryText="Embossed"/>
      <MenuItem value={'embossed_with_text_colour'} primaryText="Embossed with Text Colour"/>
      <MenuItem value={'print'} primaryText="Print"/>
    </DropDownMenu>
  </div>;

};
