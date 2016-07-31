export const CustomiserTextModes = ({
  texts_outside,
  handleTextsOutsideChange,
  text_inside_on_off,
  handleTextInsideOnOffChange
}) => {
  return (
    <div style={{display: 'flex', margin: '3px 3px 10px'}}>
      <div style={{
                  flex: 1,
                  backgroundColor: (texts_outside === 1) ? '#989898' : '#ffffff',
                  cursor: 'pointer',
                  textAlign: 'center',
                  padding: '2px 0'
                }}
           onTouchTap={() => handleTextsOutsideChange(1)}
      >
        One text outside
      </div>
      <div style={{backgroundColor: '#c9c9c9', width: 2}}></div>
      <div style={{
                    flex: 1,
                  backgroundColor: (texts_outside === 2) ? '#989898' : '#ffffff',
                    cursor: 'pointer',
                    textAlign: 'center',
                    padding: '2px 0'
                  }}
           onTouchTap={() => handleTextsOutsideChange(2)}
      >
        Two texts outside
      </div>
      <div style={{backgroundColor: '#c9c9c9', width: 2}}></div>
      <div style={{
                    flex: 1,
                    backgroundColor: (text_inside_on_off) ? '#989898' : '#ffffff',
                    cursor: 'pointer',
                    textAlign: 'center',
                    padding: '2px 0'
                  }}
           onTouchTap={() => handleTextInsideOnOffChange(!text_inside_on_off)}
      >
        Add inside text
      </div>
    </div>
  );
};
