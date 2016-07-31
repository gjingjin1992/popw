import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import {yellow500, black} from 'material-ui/lib/styles/colors';

export const SupportSessionInfo = React.createClass({
  getInitialState: function () {
    return {
      display: 'none'
    };
  },
  componentDidMount: function () {
    if (window.location.href.indexOf('support_session=') !== -1 && this.state.display === 'none') {
      this.setState({
        display: 'flex'
      });
    }
  },
  _handleLogout: function () {
    localStorage.removeItem('firebase:session::popwb-athena');
    window.location = '?';
  },
  render: function () {
    let session_info = localStorage.getItem('firebase:session::popwb-athena');
    session_info = JSON.parse(session_info);
    let uid = (session_info) ? session_info.uid : '';
    return (
      <div
        style={{
          backgroundColor: yellow500, padding: '13px', color: black, fontSize: 20,
          display: this.state.display, justifyContent: 'center', width: 590
        }}
      >
        <div style={{marginRight: 35}}>
          Support Mode <span style={{fontSize: '12px'}}>{uid}</span>
        </div>
        <RaisedButton label="Logout" primary={true} onTouchTap={this._handleLogout}/>
      </div>
    );
  }
});
