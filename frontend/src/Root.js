import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router } from "react-router-dom";
import reducers from 'reducers';

export default ({ children, initialState = {} }) => {
  return (
    <Provider store={createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())} >
      <Router history={createBrowserHistory()}>
        { children }
      </Router>
    </Provider>
  )
}