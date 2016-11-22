/* eslint-disable import/default */
import './styles/main.css';
import './styles/thirdparty.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './components/App';
import actions from './actions';

const store = configureStore();
store.dispatch(actions.input.getInputDevices());

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app')
);
