import React from 'react';
import { Route, withRouter } from 'react-router-dom'
import { ComponentWrapper } from './LayoutStyles'

const CoreLayout = ({ component, ...rest }) => {
  const Component = withRouter(component);
  return (
    <Route {...rest} render={matchProps => (
      <ComponentWrapper>
        <Component { ...matchProps } />
      </ComponentWrapper>
    )} />
  )
}

export default CoreLayout;