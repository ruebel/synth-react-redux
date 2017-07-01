import '../node_modules/react-select/dist/react-select.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { App, configureStore } from './modules/App';

render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('app')
);
