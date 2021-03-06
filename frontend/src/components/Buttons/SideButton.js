import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { ButtonWrapper } from 'styles/global';

const SideButton = ({ link = '/', text = '돌아가기', type = 'dashed', styles = {}, disableLink = false }) => {
  return (
    <Button 
      type={type}
      className="login-form-button" style={{ width: '100%', ...styles }}>
      { disableLink 
      ? text
      : <Link to={link}>{text}</Link>
      }
    </Button>
  )
}

export default SideButton;