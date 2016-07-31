import React from 'react';

export default function ({artworks_left, artworks_right, text_colour, default_width = 30}) {
  let left_black = null;
  let left_white = null;
  let left = null;
  let right_black = null;
  let right_white = null;
  let right = null;

  if (artworks_left !== 'none') {
    if (artworks_left.substr(0, 11) === 'data:image/') {
      // this is custom icon uploaded by user
      left = artworks_left;
      left_black = artworks_left;
      left_white = artworks_left;
    } else {

      let svg = atob(artworks_left).split('<path ');
      if (text_colour !== 'N/A') {
        left = svg.join(`<path fill="${text_colour}" `);
      } else {
        left = svg.join('<path ');
      }

      left_white = svg.join('<path fill="#f5f5f5" ');

      left = `data:image/svg+xml;base64,${btoa(left)}`;
      left_black = `data:image/svg+xml;base64,${artworks_left}`;
      left_white = `data:image/svg+xml;base64,${btoa(left_white)}`;
    }
  }

  if (artworks_right !== 'none') {
    if (artworks_right.substr(0, 11) === 'data:image/') {
      // this is custom icon uploaded by user
      right = artworks_right;
      right_black = artworks_right;
      right_white = artworks_right;
    } else {

      let svg = atob(artworks_right).split('<path ');
      if (text_colour !== 'N/A') {
        right = svg.join(`<path fill="${text_colour}" `);
      } else {
        right = svg.join('<path ');
      }

      right_white = svg.join('<path fill="#f5f5f5" ');

      right = `data:image/svg+xml;base64,${btoa(right)}`;
      right_black = `data:image/svg+xml;base64,${artworks_right}`;
      right_white = `data:image/svg+xml;base64,${btoa(right_white)}`;
    }
  }

  return {
    left_black: (left_black) ?
      <img src={left_black} style={{width: default_width, maxHeight: default_width}}/>
      : null,
    left_white: (left_white) ?
      <img src={left_white} style={{width: default_width, maxHeight: default_width}}/>
      : null,
    left: (left) ?
      <img src={left} style={{width: default_width, maxHeight: default_width}}/>
      : null,
    right_black: (right_black) ?
      <img src={right_black} style={{width: default_width, maxHeight: default_width}}/>
      : null,
    right_white: (right_white) ?
      <img src={right_white} style={{width: default_width, maxHeight: default_width}}/>
      : null,
    right: (right) ?
      <img src={right} style={{width: default_width, maxHeight: default_width}}/>
      : null,
    left_black_src: left_black,
    left_white_src: left_white,
    left_src: left,
    right_black_src: right_black,
    right_white_src: right_white,
    right_src: right
  };

}
