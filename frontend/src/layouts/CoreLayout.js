import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'
import { ComponentWrapper } from './LayoutStyles'
import SocketHandler from 'utils/socket';
import { connect } from 'react-redux';

class CoreLayout extends Component {
 componentDidMount() {
    this.client = SocketHandler.instance;
  }
  
  componentDidUpdate(prevProps, prevState) {
    const { username, history } = this.props;

    if (username && prevProps.username !== username) {
      this.client.invitation((name, chatroomId) => {
        if (name === username) {
          history.push({ pathname: `/chatroom/${chatroomId}` })
        }
      })
    }
  }

  render() {
    const { component, ...rest } = this.props;
    const Component = component;
    return (
      <Route {...rest} render={matchProps => (
        <ComponentWrapper>
          <Component { ...matchProps } />
        </ComponentWrapper>
      )} />
    )
  }
}


const mapStateToProps = (state) => {
  return { 
    username: state.userInfo.user
  }
}

export default withRouter(connect(mapStateToProps)(CoreLayout));