import React from 'react';

export const CustomiserMessage = React.createClass({

  getInitialState: function () {
    return {
      message_preview_font_size: 16,
      value: this.props.text || this.props.default_text,
      value_2: this.props.text_2 || this.props.default_text_2,
      default_text: this.props.default_text,
      default_text_2: this.props.default_text_2,
      focus_1: false,
      focus_2: false
    };
  },

  componentDidMount: function () {
    this.autoFontSize();
  },

  componentDidUpdate: function () {
    this.autoFontSize();
  },

  componentWillReceiveProps: function (nextProps, nextState) {

    if (nextProps.text !== '' || (nextProps.text === '' && this.state.focus_1)) {
      this.setState({
        value: nextProps.text,
        default_text: nextProps.default_text
      });
    } else if (nextProps.text === '' && this.state.focus_1 === false) {
      this.setState({
        value: nextProps.default_text,
        default_text: nextProps.default_text
      });
    }


    if (nextProps.text_2 !== '' || (nextProps.text_2 === '' && this.state.focus_2)) {
      this.setState({
        value_2: nextProps.text_2,
        default_text_2: nextProps.default_text_2
      });
    } else if (nextProps.text_2 === '' && this.state.focus_2 === false) {
      this.setState({
        value_2: nextProps.default_text_2,
        default_text_2: nextProps.default_text_2
      });
    }

  },

  handleFocus: function () {
    let state = {focus_1: true};
    if (this.state.value === this.state.default_text) {
      state = Object.assign({}, state, {value: '', default_text: ''});
    }
    this.setState(state);
  },
  handleFocus_2: function () {
    let state = {focus_2: true};
    if (this.state.value_2 === this.state.default_text_2) {
      state = Object.assign({}, state, {value_2: '', default_text_2: ''});
    }
    this.setState(state);
  },

  handleBlur: function () {
    let state = {focus_1: false}
    if (this.state.value === '') {
      state = Object.assign({}, state, {value: this.props.default_text, default_text: this.props.default_text});
    }
    this.setState(state);
  },

  handleBlur_2: function () {
    let state = {focus_2: false};
    if (this.state.value_2 === '') {
      state = Object.assign({}, state, {value_2: this.props.default_text_2, default_text_2: this.props.default_text_2});
    }
    this.setState(state);
  },

  handleChange: function (e) {
    this.setState({value: e.target.value});
    this.props.handleChange(e);
  },
  handleChange_2: function (e) {
    this.setState({value_2: e.target.value});
    this.props.handleChange_2(e);
  },

  autoFontSize: function () {
    let texts_outside = this.props.order.texts_outside || 1;
    let var_1 = (texts_outside === 2 && this.props.which_text === 'outside') ? 190 : 403;
    let var_2 = (texts_outside === 2 && this.props.which_text === 'outside') ? 170 : 385;

    if (this.refs.hidden_text.offsetWidth > var_1 && this.state.message_preview_font_size > 1) {
      this.setState({
        message_preview_font_size: this.state.message_preview_font_size - 0.2
      });
    } else if (this.refs.hidden_text.offsetWidth < var_2 && this.state.message_preview_font_size < 16) {
      this.setState({
        message_preview_font_size: this.state.message_preview_font_size + 1
      });
    }
  },

  render: function () {
    const artworks = this.props.artworks;
    const artworks_2 = this.props.artworks_2 || {};
    const order = this.props.order;
    const styles = this.props.styles;


    let image = null;
    let colours = order.colours;
    let text_colour = order.text_colour;


    switch (colours.length) {
      case 0:
        image = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" ' +
          'xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 502.3 44.8" ' +
          'enable-background="new 0 0 502.3 44.8" xml:space="preserve"> <rect x="0" y="0" fill="#ffffff" ' +
          'width="502.3" height="44.8"/> </svg>';
        break;
      case 1:
        image = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 502.3 44.8"
      enable-background="new 0 0 502.3 44.8" xml:space="preserve"> <rect x="0" y="0" fill="${colours[0]}"
       width="502.3" height="44.8"/> </svg>`;
        break;
      case 2:
        image = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             viewBox="0 0 502.3 44.8" enable-background="new 0 0 502.3 44.8" xml:space="preserve">
                        <rect x="0.4" y="0.3" fill="${colours[0]}" width="251.1" height="44.8"/>
                        <rect x="251.5" y="0.3" fill="${colours[1]}" width="251.1" height="44.8"/>
                        </svg>`;
        break;
      case 3:
        image = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 502.3 44.8" enable-background="new 0 0 502.3 44.8" xml:space="preserve">
                    <rect x="0.4" y="0.3" fill="${colours[0]}" width="167.4" height="44.8"/>
                    <rect x="335.2" y="0.3" fill="${colours[1]}" width="167.4" height="44.8"/>
                    <rect x="167.8" y="0.3" fill="${colours[2]}" width="167.4" height="44.8"/>
                    </svg>`;
        break;
      case 4:
        image = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 502.3 44.8" enable-background="new 0 0 502.3 44.8" xml:space="preserve">
                      <rect x="0.4" y="0.3" fill="${colours[0]}" width="125.6" height="44.8"/>
                      <rect  x="251.5" y="0.3" fill="${colours[1]}" width="125.6" height="44.8"/>
                      <rect x="126" y="0.3" fill="${colours[2]}" width="125.6" height="44.8"/>
                      <rect x="377.1" y="0.3" fill="${colours[3]}" width="125.6" height="44.8"/>
                    </svg>`;
        break;
      case 5:
        image = `
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 502.3 44.8" enable-background="new 0 0 502.3 44.8" xml:space="preserve">
                  <rect x="0.4" y="0.3" fill="${colours[0]}" width="100.5" height="44.8"/>
                  <rect x="201.3" y="0.3" fill="${colours[1]}" width="100.5" height="44.8"/>
                  <rect x="402.2" y="0.3" fill="${colours[2]}" width="100.5" height="44.8"/>
                  <rect x="100.9" y="0.3" fill="${colours[3]}" width="100.5" height="44.8"/>
                  <rect x="301.8" y="0.3" fill="${colours[4]}" width="100.5" height="44.8"/>
            </svg>`;
        break;
      case 6:
        image = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 502.3 44.8" enable-background="new 0 0 502.3 44.8" xml:space="preserve">
                      <rect x="0.4" y="0.3" fill="${colours[0]}" width="83.7" height="44.8"/>
                      <rect x="167.9" y="0.3" fill="${colours[1]}" width="83.7" height="44.8"/>
                      <rect x="335.3" y="0.3" fill="${colours[2]}" width="83.7" height="44.8"/>
                      <rect x="84.1" y="0.3" fill="${colours[3]}" width="83.7" height="44.8"/>
                      <rect x="251.6" y="0.3" fill="${colours[4]}" width="83.7" height="44.8"/>
                      <rect x="419.1" y="0.3" fill="${colours[5]}" width="83.7" height="44.8"/>
                    </svg>`;
        break;
      case 7:
      default:
        image = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 502.3 44.8" enable-background="new 0 0 508 100" xml:space="preserve">
                      <rect x="-0.6" y="0.3" fill="${colours[0]}" width="72.5714" height="100"/>
                      <rect x="143.5" y="0.3" fill="${colours[1]}" width="72.5714" height="100"/>
                      <rect x="287.7" y="0.3" fill="${colours[2]}" width="72.5714" height="100"/>
                      <rect x="431.8" y="0.3" fill="${colours[3]}" width="72.5714" height="100"/>
                      <rect x="71.5" y="0.3" fill="${colours[4]}" width="72.5714" height="100"/>
                      <rect x="215.6" y="0.3" fill="${colours[5]}" width="72.5714" height="100"/>
                      <rect x="359.7" y="0.3" fill="${colours[6]}" width="72.5714" height="100"/>
                    </svg>`;

        break;
    }

    let texts_outside = this.props.order.texts_outside || 1;

    const style = Object.assign({}, styles.text_input, {
      border: 'none',
      color: text_colour,
      zIndex: 50,
      fontSize: this.state.message_preview_font_size,
      width: (texts_outside === 2 && this.props.which_text === 'outside') ? 254 : 508,
      background: 'transparent'
    });

    if (order.text_colour === 'N/A') {
      style.color = (colours.length == 1 && order.colours[0] === '#000000' ) ? '#ffffff' : '#000000';
    }


    let artwork_left = null;
    let artwork_right = null;
    if (artworks !== null) {
      artwork_left = artworks.left;
      if (order.text_colour === 'N/A') {
        artwork_left = (colours.length === 1 && order.colours[0] === '#000000')
          ? artworks.left_white
          : artworks.left_black;
      }

      artwork_right = artworks.right;
      if (order.text_colour === 'N/A') {
        artwork_right = (colours.length === 1 && order.colours[0] === '#000000')
          ? artworks.right_white
          : artworks.right_black;
      }
    }

    let artwork_left_2 = null;
    let artwork_right_2 = null;
    if (artworks_2 !== null) {
      artwork_left_2 = artworks_2.left;
      if (order.text_colour === 'N/A') {
        artwork_left_2 = (colours.length === 1 && order.colours[0] === '#000000')
          ? artworks_2.left_white
          : artworks_2.left_black;
      }

      artwork_right_2 = artworks_2.right;
      if (order.text_colour === 'N/A') {
        artwork_right_2 = (colours.length === 1 && order.colours[0] === '#000000')
          ? artworks_2.right_white
          : artworks_2.right_black;
      }
    }


    return <div style={{height: 30}}>
      <div style={{
        display: 'flex',
        maxWidth: 512,
        height: 30,
        backgroundImage: `url('data:image/svg+xml;base64, ${btoa(image)}')`,
        backgroundSize: '100%'
      }}
      >
        <div>
          <input type="text"
                 maxLength={50}
                 value={this.state.value}
                 onChange={this.handleChange}
                 onFocus={this.handleFocus}
                 onBlur={this.handleBlur}
                 style={style}
          />
          <div style={{
            position: 'relative',
            zIndex: 3,
            width: style.width,
            top: -23,
            fontSize: this.state.message_preview_font_size,
            fontWeight: 500,
            pointerEvents: 'none',
            whiteSpace: 'pre',
            display: 'flex',
            justifyContent: 'center',
            fontFamily: style.fontFamily
          }}
          >
            <div style={{margin: '0px 10px', width: 35}}>
              {(artworks !== null && artworks.left_src) ? artwork_left : null}
            </div>
            <div ref={'hidden_text'} style={{visibility: 'hidden'}}>{this.state.value}</div>
            <div style={{width: 35}}>
              {(artworks !== null && artworks.right_src) ? artwork_right : null}
            </div>
          </div>
        </div>
        {(texts_outside === 2 && this.props.which_text === 'outside')
          ?
          <div>

            <input type="text"
                   maxLength={50}
                   value={this.state.value_2}
                   onChange={this.handleChange_2}
                   onFocus={this.handleFocus_2}
                   onBlur={this.handleBlur_2}
                   style={style}
            />
            <div style={{
               position: 'relative',
               zIndex: 3,
               width: style.width,
               top: -23,
               fontSize: this.state.message_preview_font_size,
               fontWeight: 500,
               pointerEvents: 'none',
               whiteSpace: 'pre',
               display: 'flex',
               justifyContent: 'center',
               fontFamily: style.fontFamily
             }}
            >
              <div style={{margin: '0px 10px', width: 35}}>
                {(artworks_2 !== null && artworks_2.left_src) ? artwork_left_2 : null}
              </div>
              <div ref={'hidden_text_2'} style={{visibility: 'hidden'}}>{this.state.value_2}</div>
              <div style={{width: 35}}>
                {(artworks_2 !== null && artworks_2.right_src) ? artwork_right_2 : null}
              </div>
            </div>
          </div>

          : null
        }
      </div>


    </div>;
  }
});
