import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import NavBar from './components/NavBar/NavBar';
import AppRouter from './components/Router/AppRouter';

ReactDOM.render(
  <React.StrictMode>
    <NavBar />
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);
