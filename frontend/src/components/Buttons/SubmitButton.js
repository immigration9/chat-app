import React from 'react';
import { Button } from 'antd';
import { ButtonWrapper } from 'styles/global';

const SubmitButton = ({ text = '로그인' }) => (
  <Button
    type="primary" htmlType="submit"
    className="login-form-button" style={{ width: '100%' }}>
    { text }
  </Button>
)

export default SubmitButton;