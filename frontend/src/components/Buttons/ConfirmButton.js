import React from 'react';
import { Button } from 'antd';
import { ButtonWrapper } from 'styles/global';
const ConfirmButton = ({ onConfirm, text, styles = {} }) => {
  return (
    <Button 
      type="primary"
      onClick={onConfirm}
      className="login-form-button" style={{ width: '100%', ...styles }}>
      {text}
    </Button>
  )
}

export default ConfirmButton;