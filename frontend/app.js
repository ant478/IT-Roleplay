import 'isomorphic-fetch'; // IE 11 one love
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from '@ant478/web-components';
import App from './components/App'; // eslint-disable-line import/no-unresolved

customElements.define('ant478-footer', Footer);

ReactDOM.render(
  React.createElement(BrowserRouter, null, React.createElement(App)),
  document.getElementsByClassName('content')[0],
);
