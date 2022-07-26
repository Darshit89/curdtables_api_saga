import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/global.scss';

import './index.scss';

import App from './App';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import * as Sentry from "@sentry/react";

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  });
};

ReactDOM.render(
  <Provider store={store}>
    <App /> 
  </Provider>,
  document.getElementById('root')
);
