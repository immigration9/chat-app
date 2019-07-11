import React, { Component } from 'react';
import { ChatroomListWrapper, ChatroomInner, MessageWrapper, WriteWrapper, WriteArea, ButtonArea, WriteComponent, MenuBarWrapper } from './ChatroomStyles';
import { Button, message as messagePopup, Input, Icon } from 'antd';
import ConfirmButton from 'components/Buttons/ConfirmButton';
import ChatMessage from 'components/ChatComponent/ChatMessage';
import SideButton from 'components/Buttons/SideButton';
import SocketHandler from 'utils/socket';
import { connect } from 'react-redux';

class Chatroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: false,
      message: '',
      chatMessages: [],
      inviteUser: '',
    }

    this.retry = 0;
  }

  componentDidMount() {
    const that = this;
    const { match, history, username } = this.props;
    const { chatMessages } = this.state;

    this.chatroomId = match && match.params && match.params.chatroomId ? Number(match.params.chatroomId) : 0;

    if (this.chatroomId === 0) history.push({ pathname: '/chatrooms' })
      
    this.client = SocketHandler.instance;

    if (username) {
      this.client.join(this.chatroomId, username, () => {});

      this.client.listen(this.onMessageArrival)
    } else {
      this.retryConnection();
    }
  }

  onMessageArrival = (data) => {
    const that = this;
    const { chatMessages } = this.state;
    const { username } = this.props;

    this.setState({
      chatMessages: chatMessages.concat({
        id: data.id,
        isOwner: data.name === username ? true : false,
        name: data.name,
        message: data.message
      })
    })
  }

  retryConnection = () => {
    const that = this;
    const { username } = this.props;
    if (this.retry < 5) {
      setTimeout(() => {
        if (username) { 
          that.client.join(that.chatroomId, username, () => {}); 
        }
        else { 
          that.retryConnection(); that.retry += 1 
        }
      }, 3000)
    }
  }

  handleSendMessage = () => {
    const that = this;
    const { message, chatMessages } = this.state;
    const { username } = this.props;

    if (message !== '') {
      this.client.message(this.chatroomId, username, message, () => {
        that.setState({
          message: ''
        })
      });
    } else {
      messagePopup.info("내용을 입력해주시기 바랍니다");
    }
  }

  sendInvitation = () => {
    const that = this;
    const { inviteUser } = this.state;
    this.client.invite(this.chatroomId, inviteUser, () => {
      that.setState({ inviteUser: '' })
    })
  }

  componentWillUnmount() {
    const { username } = this.props;
    console.log("calling leave");
    this.client.leave(this.chatroomId, username, () => {});
  }
  
  
  render() {
    const { message, chatMessages, inviteUser } = this.state;
    return (
      <ChatroomListWrapper>
        <ChatroomInner>
          <MessageWrapper>
            { chatMessages && chatMessages.map((msg) => {
                return (
                  <ChatMessage key={msg.id} isOwner={msg.isOwner} text={`${msg.name}: ${msg.message}`} />
                )
              })
            }
          </MessageWrapper>
          <WriteWrapper>
            <WriteArea>
              <WriteComponent value={message} onChange={(e) => this.setState({ message: e.target.value })} placeholder={"글자를 입력해주세요!"}/>
            </WriteArea>
            <ButtonArea>
              <ConfirmButton onConfirm={this.handleSendMessage} text={"전송"} styles={{ height: '80%' }}/>
            </ButtonArea>
          </WriteWrapper>
          <MenuBarWrapper>
            <Input 
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="초대할 사용자를 입력하세요"
              onChange={(e) => this.setState({ inviteUser: e.target.value })}
              value={inviteUser}
              style={{ width: '35%'}}/>
            <ConfirmButton type={"default"} text={'사용자 초대하기'} styles={{ width: '30%' }} onConfirm={this.sendInvitation} />
            <SideButton link={'/chatrooms'} text={'목록으로 돌아가기'} styles={{ width: '30%' }} />
          </MenuBarWrapper>
        </ChatroomInner>
      </ChatroomListWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    username: state.userInfo.user
  }
}

export default connect(mapStateToProps)(Chatroom);