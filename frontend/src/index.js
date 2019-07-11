import React from 'react';
import ReactDOM from 'react-dom';

import AppContainer from 'containers/AppContainer'
import Root from 'Root';

/**
 * Import third party stylesheets
 * 1. Antd Design Styles
 * 2. React Table Styles
 */
import 'antd/dist/antd.css';
import 'react-table/react-table.css'

ReactDOM.render(
  <Root>
    <AppContainer/>
  </Root>,
  document.querySelector('#root')
)