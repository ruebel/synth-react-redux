/* eslint-disable import/default */
import './styles/main.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './components/App';
import {setupContext} from './actions';

const store = configureStore();
store.dispatch(setupContext());

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app')
);
