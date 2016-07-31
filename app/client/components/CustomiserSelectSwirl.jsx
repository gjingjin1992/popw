export const CustomiserSelectSwirl = ({swirls, swirl_selected, handleChange}) => {

  let icons = [];
  for (var s in swirls) {
    if (swirls.hasOwnProperty(s)) {

      let selected = (swirl_selected === s);

      icons.push(<div key={s} title={swirls[s].name}
                      style={{width: '62px',
                      height: '62px',
                      margin: '0 12px',
                      backgroundImage: `URL(./images/swirl/icons/${s}.png)`}}
                      onTouchTap={handleChange.bind(null, s)}>
        {(selected) ? <img src={'./images/thick.png'}
                           style={{width: '30px', position: 'relative', top: '17px', left: '-1px', zIndex: 2}}/> : null}
      </div>);

    }
  }

  return <div style={{display: 'flex', margin: '20px 0'}}>
    <div style={{fontWeight: 500, width: '70px', fontSize: '16px', fontStyle: 'italic'}}>presets</div>
    <div style={{flex: 1, textAlign: 'center', display: 'flex', zIndex: 3}}>
      {icons}
    </div>
  </div>;
};
