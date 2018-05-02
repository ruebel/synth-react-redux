import '../node_modules/react-select/dist/react-select.css';
import './styles/global';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { App, configureStore } from './modules/App';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

render(
  <ThemeProvider theme={theme}>
    <Provider store={configureStore()}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
