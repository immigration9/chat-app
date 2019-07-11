import React, { Component } from 'react';
import { ChatroomListWrapper, ChatroomInner, MessageWrapper, WriteWrapper, WriteArea, ButtonArea, WriteComponent, MenuBarWrapper } from './ChatroomStyles';
import { Button } from 'antd';
import ConfirmButton from 'components/Buttons/ConfirmButton';
import ChatMessage from 'components/ChatComponent/ChatMessage';
import SideButton from 'components/Buttons/SideButton';
import SocketHandler from 'utils/socket';

class Chatroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      chatMessages: []
    }
  }

  componentDidMount() {
    const { match, history } = this.props;
    this.chatroomId = match && match.params && match.params.chatroomId ? Number(match.params.chatroomId) : 0;

    if (this.chatroomId === 0) history.push({ pathname: '/chatrooms' })
      
    this.client = SocketHandler.instance;

  }

  handleSendMessage = () => {
    const that = this;
    const { message, chatMessages } = this.state;
    this.client.message(this.chatroomId, message, (data, err) => {
      if (!err) {
        that.setState({
          message: '',
          chatMessages: chatMessages.concat(data)
        })
      }
    })

  }
  
  render() {
    const { message, chatMessages } = this.state;
    return (
      <ChatroomListWrapper>
        <ChatroomInner>
          <MessageWrapper>
            { chatMessages && chatMessages.map((msg) => {
                return (
                  <ChatMessage isOwner={msg.isOwner} text={msg.message} />
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
            <SideButton type={"default"} link={'/chatrooms'} text={'사용자 초대하기'} styles={{ width: '32%' }} />
            <SideButton type={"default"} link={'/chatrooms'} text={'사용자 목록보기'} styles={{ width: '32%' }} />
            <SideButton link={'/chatrooms'} text={'목록으로 돌아가기'} styles={{ width: '32%' }} />
          </MenuBarWrapper>
        </ChatroomInner>
      </ChatroomListWrapper>
    )
  }
}

export default Chatroom;