import 'isomorphic-fetch'; // IE 11 one love
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App'; // eslint-disable-line import/no-unresolved

ReactDOM.render(
  React.createElement(BrowserRouter, null, React.createElement(App)),
  document.getElementsByClassName('content')[0],
);
