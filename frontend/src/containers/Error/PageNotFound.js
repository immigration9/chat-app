import React, { Component } from 'react';

export default class PageNotFound extends Component {
  render() {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        주소가 잘못된 것 같아요!
      </div>
    )
  }
}
