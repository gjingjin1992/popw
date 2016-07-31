import React from 'react';
import {ButtonHover} from './ButtonHover.jsx';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import FileFileUpload from 'material-ui/lib/svg-icons/file/file-upload';
import Snackbar from 'material-ui/lib/snackbar';
import {red500} from 'material-ui/lib/styles/colors';

export const CustomiserArtwork = React.createClass({
  getInitialState: function () {
    return {
      modal_open: false,
      snackbar: null,
      upload_filename: '',
      error: ''
    };
  },

  handleSelect: function (base64) {
    this.props.handleChange({base64: base64});
    this.setState({
      modal_open: false
    });
  },
  handleTalkLive: function () {
    $arcchat.open();
  },
  handleUpload: function (e) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      this.setState({upload_filename: file.name});
      let reader = new FileReader();
      reader.readAsDataURL(file, 'UTF-8');
      reader.onload = (evt) => {
        if (evt.target.result.substr(0, 11) === 'data:image/') {

          let img = new Image();
          img.src = window.URL.createObjectURL(file);

          img.onload = () => {
            let width = img.naturalWidth;
            let height = img.naturalHeight;

            if (width < 300 || height < 300) {
              this.setState({error: 'Minimum image size is 300x300px, please select a different image.'});
            } else {
              let new_width = null;
              let new_height = null;

              if (width === height) {
                new_width = 300;
                new_height = 300;
              } else if (width > height) {
                // +------------+
                // |   image    |
                // +------------+
                new_height = 300;
                new_width = width * (new_height / height);
              } else {
                new_width = 300;
                new_height = height * (new_width / width);
              }

              let _tmpCanvas = document.createElement('canvas');
              _tmpCanvas.width = new_width;
              _tmpCanvas.height = new_height;
              let ctx = _tmpCanvas.getContext('2d');
              ctx.drawImage(img, 0, 0, new_width, new_height);
              let file_type = evt.target.result.substr(11, 30).split(';')[0];// data:image/svg+xml;base64,....
              let base64String = _tmpCanvas.toDataURL(`image/${file_type}`);
              this.props.handleChange({base64: base64String});
              this.setState(this.getInitialState());
            }
          };
        } else {
          this.setState({error: 'Invalid image, please a different file.'});
        }
      };
      reader.onerror = () => {
        this.setState({error: 'Invalid image, please a different file.'});
      };
    }

  },
  render: function () {
    let k = 0;

    const actions =
      <div style={{display: 'flex', justifyContent: 'flex-end', lineHeight: '36px'}}>
        <FlatButton
          label="Cancel"
          onTouchTap={() => this.setState({modal_open: false})}
        />
        <div style={{fontSize: '12px', fontStyle: 'italic'}}>
          {this.state.upload_filename}
        </div>
        <FlatButton
          label="Upload custom"
          onTouchTap={() => this.refs.fileUpload.click()}
          icon={<FileFileUpload />}
        />
        <FlatButton
          label="None"
          primary={true}
          onTouchTap={() => this.handleSelect('none')}
        />
      </div>;

    let default_artworks = [];

    for (var key in this.props.default_artworks) {
      if (this.props.default_artworks.hasOwnProperty(key)) {
        default_artworks.push(
          <ButtonHover
            key={k++}
            style={{backgroundColor: '#fff'}}
            hoverStyle={{backgroundColor: '#FF4081', color: '#fff'}}
            onTouchTap={this.handleSelect.bind(null, this.props.default_artworks[key].base64)}
          >
            <div
              style={{
                backgroundImage: `url('data:image/svg+xml;base64,${this.props.default_artworks[key].base64}')`,
                backgroundSize: '100% 100%',
                width: 40, height: 40, margin: 5,
                cursor: 'pointer'
              }}
            >
            </div>
          </ButtonHover>);
      }
    }

    return <div>
      <ButtonHover
        onTouchTap={() => this.setState({modal_open: true})}
        style={{
          padding: '2px 10px',
          border: '2px solid #FF4081',
          backgroundColor: '#fff',
          color: '#FF4081'
        }}
        hoverStyle={{backgroundColor: '#FF4081', color: '#fff'}}
      >
        {this.props.buttonText}
      </ButtonHover>

      <Dialog
        autoScrollBodyContent={true}
        title={'Select or upload artwork'}
        open={this.state.modal_open}
        actions={actions}
        onRequestClose={() => this.setState({modal_open: false})}
      >
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {default_artworks}
        </div>

        <div style={{color: red500, textAlign: 'center', marginTop: '10px'}}>
          {(this.state.error)
            ?
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <div style={{lineHeight: '31px', marginRight: 25}}>
                {this.state.error}
              </div>
              <ButtonHover
                onTouchTap={this.handleTalkLive}
                style={{
                  padding: '2px 10px',
                  border: '2px solid #FF4081',
                  backgroundColor: '#fff',
                  color: '#FF4081'
                }}
                hoverStyle={{backgroundColor: '#FF4081', color: '#fff'}}
              >
                or talk to us LIVE!
              </ButtonHover>
            </div>
            : null
          }
        </div>

        <input ref="fileUpload" type="file" style={{display: 'none'}} onChange={this.handleUpload}/>
      </Dialog>
      <Snackbar
        open={this.state.snackbar !== null}
        message={this.state.snackbar || ''}
        autoHideDuration={5000}
        onRequestClose={() => this.setState({snackbar: null})}
      />
    </div>;
  }
});
