import React from 'react';

export const CustomiserMessageSwirl = React.createClass({

  getInitialState: function () {
    return {
      message_preview_font_size: 16,
      value: this.props.text || this.props.default_text,
      value_2: this.props.text_2 || this.props.default_text_2,
      default_text: this.props.default_text,
      default_text_2: this.props.default_text_2
    };
  },

  componentDidMount: function () {
    this.autoFontSize();
  },

  componentDidUpdate: function () {
    this.autoFontSize();
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.text !== this.state.value) {
      this.setState({
        value: nextProps.text || nextProps.default_text,
        value_2: nextProps.text_2 || nextProps.default_text_2,
        default_text: nextProps.default_text
      });
    }
  },

  handleFocus: function () {
    if (this.state.value === this.state.default_text) {
      this.setState({value: '', default_text: ''});
    }
  },
  handleFocus_2: function () {
    if (this.state.value_2 === this.state.default_text_2) {
      this.setState({value_2: '', default_text_2: ''});
    }
  },

  handleBlur: function () {
    if (this.state.value === '') {
      this.setState({value: this.props.default_text, default_text: this.props.default_text});
    }
  },
  handleBlur_2: function () {
    if (this.state.value_2 === '') {
      this.setState({value_2: this.props.default_text_2, default_text_2: this.props.default_text_2});
    }
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
    const swirl_selected = order.swirl_selected;
    const text_colour = order.text_colour;

    let texts_outside = this.props.order.texts_outside || 1;

    const style = Object.assign({}, styles.text_input, {
      color: (order.text_colour === 'N/A') ? (swirl_selected == 1 ? '#ffffff' : '#000000') : text_colour,
      fontSize: this.state.message_preview_font_size,
      width: (texts_outside === 2 && this.props.which_text === 'outside') ? 254 : 508,
      background: 'transparent',
      border: 'none'
    });

    let artwork_left = null;
    let artwork_right = null;
    if (artworks !== null) {
      artwork_left = (order.text_colour === 'N/A')
        ? (swirl_selected == 1 ? artworks.left_white : artworks.left_black)
        : artworks.left;
      artwork_right = (order.text_colour === 'N/A')
        ? (swirl_selected == 1 ? artworks.right_white : artworks.right_black)
        : artworks.right;
    }

    let artwork_left_2 = null;
    let artwork_right_2 = null;
    if (artworks_2 !== null) {
      artwork_left_2 = (order.text_colour === 'N/A')
        ? (swirl_selected == 1 ? artworks_2.left_white : artworks_2.left_black)
        : artworks_2.left;
      artwork_right_2 = (order.text_colour === 'N/A')
        ? (swirl_selected == 1 ? artworks_2.right_white : artworks_2.right_black)
        : artworks_2.right;
    }


    return <div style={{height: 30}}>
      <div style={{
          display: 'flex',
          maxWidth: 512,
          height: 30,
          backgroundImage: `URL(./images/swirl/input_bg/${swirl_selected}.png)`,
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

