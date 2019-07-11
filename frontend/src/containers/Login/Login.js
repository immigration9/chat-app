import React, { Component } from 'react';
import { LoginWrapper, TitleWrapper } from './LoginStyles'
import { Form, Button, Input, Icon } from 'antd'
import SubmitButton from 'components/Buttons/SubmitButton';

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <LoginWrapper>
        <TitleWrapper>Chat App</TitleWrapper>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '이름을 입력해주세요' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="이름을 입력해주세요"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <SubmitButton />
          </Form.Item>
        </Form>
      </LoginWrapper>
    )
  }
}

export default Form.create({ name: 'login_form' })(Login);