import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import TODO from './TODO';

const rootElement = document.getElementById('root');

ReactDOM.render(
    <TODO />,
    rootElement);
