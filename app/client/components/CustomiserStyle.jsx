import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';

export const CustomiserStyle = ({handleTypeChange, current_type}) => {
  return <div style={{display: 'flex', margin: '3px 0 6px'}}>
    <div style={{fontWeight: 500, width: '100px', fontSize: '16px', fontStyle: 'italic'}}>Style</div>
    <DropDownMenu underlineStyle={{borderWidth: '2px', borderColor: '#010101'}}
                  iconStyle={{fill: '#010101'}}
                  style={{flex: 1, padding: 0, margin: -24, fontWeight: 600, fontSize: '18px'}}
                  value={current_type} onChange={handleTypeChange} autoWidth={false}>
      <MenuItem value={'segments'} primaryText="Segments"/>
      <MenuItem value={'solid'} primaryText="Solid"/>
      <MenuItem value={'swirl'} primaryText="Swirl"/>
    </DropDownMenu>
  </div>;

};
