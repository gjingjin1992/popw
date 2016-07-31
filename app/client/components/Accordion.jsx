import React from 'react'

export const Accordion = React.createClass({
  getInitialState: function () {
    return {
      open: this.props.open || false
    }
  },

  getDefaultProps: function () {
    return {
      headerClose: 'enter some text in headerClose attribute',
      headerOpen: '',
      styleHeader: {},
      styleContent: {},
      openHeight: 100
    };
  },

  render: function () {
    const styles = Object.assign({}, this.props.styleContent, {
      height: (this.state.open) ? `${this.props.openHeight}px` : '0px',
      overflow: 'hidden',
      transition: 'height 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
    });
    const header = (this.state.open) ? this.props.headerOpen || this.props.headerClose : this.props.headerClose;
    return <div>
      <div onTouchTap={() => {this.setState({open: !this.state.open})}} style={this.props.styleHeader}>{header}</div>
      <div style={styles}>{this.props.children || this.props.content}</div>
    </div>
  }
});
