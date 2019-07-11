import React, { Component } from 'react';
import { ChatroomListWrapper } from './ChatroomStyles';
import { Form, Button, Input, Icon } from 'antd'
import SubmitButton from 'components/Buttons/SubmitButton';
import SideButton from 'components/Buttons/SideButton';
import SocketHandler from 'utils/socket';

class AddChatroom extends Component {
  componentDidMount() {
    this.client = SocketHandler.instance;
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const that = this;
    const { history } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        that.client.create(values.name, (chatroom) => {
          history.push({ pathname: `/chatroom/${chatroom.id}`})
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <ChatroomListWrapper>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '채팅방 이름을 입력해주세요' }],
            })(
              <Input
                prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="채팅방 이름을 입력해주세요"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <SubmitButton text={'생성'} />
          </Form.Item>
          <SideButton link={'/chatrooms'}/>
        </Form>
      </ChatroomListWrapper>
    )
  }
}

export default Form.create({ name: 'addchatroom_form' })(AddChatroom);