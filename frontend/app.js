import './components/HelloWorld/HelloWorld.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './components/HelloWorld/HelloWorld';
import * as helloWorldService from './services/helloWorldService';

ReactDOM.render(
  React.createElement(HelloWorld, { message: helloWorldService.getMessage() }),
  document.getElementById('content'),
);
