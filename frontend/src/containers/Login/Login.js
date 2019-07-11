import React, { Component } from 'react';
import { LoginWrapper, TitleWrapper } from './LoginStyles'
import { Form, Button, Input, Icon } from 'antd'
import SubmitButton from 'components/Buttons/SubmitButton';
import { connect } from 'react-redux';
import * as actions from 'actions';

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const that = this;
    const { history } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        that.props.loginUser(values.name);
        localStorage.setItem('name', values.name);
        history.push({ pathname: '/chatrooms' });
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

const WrappedLogin = Form.create({ name: 'login_form' })(Login)

export default connect(null, actions)(WrappedLogin);;