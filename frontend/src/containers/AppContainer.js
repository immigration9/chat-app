import React, { Component, Fragment } from 'react';
import { Switch } from 'react-router-dom';
import CoreLayout from 'layouts/CoreLayout';
import { connect } from 'react-redux';

import Login from 'containers/Login/Login';
import ChatroomList from 'containers/Chatroom/ChatroomList';
import Chatroom from 'containers/Chatroom/Chatroom';
import PageNotFound from 'containers/Chatroom/Chatroom';
import AddChatroom from './Chatroom/AddChatroom';
import ParticipantList from './Chatroom/ParticipantList';
import SocketHandler from 'utils/socket';

class AppContainer extends Component {

 

  render() {
    return (
      <Fragment>
        <Switch>
          <CoreLayout exact path={"/"} component={Login} />
          <CoreLayout exact path={"/chatrooms"} component={ChatroomList} />
          <CoreLayout exact path={"/chatrooms/add"} component={AddChatroom} />
          <CoreLayout exact path={"/chatroom/:chatroomId"} component={Chatroom} />
          <CoreLayout exact path={"/chatroom/:chatroomId/list"} component={ParticipantList} />

          <CoreLayout component={PageNotFound} />
        </Switch>
      </Fragment>
    )
  }
}

export default AppContainer;