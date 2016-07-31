import React from 'react';

export const RealProductGallery = React.createClass({
  render: function () {
    let slides = [];
    let key = 700;

    const titles = [
      'Embossed with color',
      'Debossed with color',
      'Print',
      'Embossed',
      'Debossed'
    ];

    for (let i = 1; i < 6; i++) {
      slides.push(
        <div key={key++}>
          <img src={`./images/real/wristband-${i}.jpg`} style={{width: 350, height: 350, margin: '12.5px 12.5px 0'}}/>
          <div style={{textAlign: 'center', marginBottom: 15}}>{titles[i - 1]}</div>
        </div>
      );
    }
    // while (slides.length % 3 !== 0) {
    //   slides.push(<div key={key++} style={{width: 375}}></div>);
    // }
    return <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
      {slides}
    </div>;
  }
});
