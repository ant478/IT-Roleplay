import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App'; // eslint-disable-line import/no-unresolved

ReactDOM.render(
  React.createElement(BrowserRouter, null, React.createElement(App)),
  document.getElementById('content'),
);
