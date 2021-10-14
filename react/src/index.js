import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import List from './List';
import User from './User';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/" component={List} />
      <Route exact path="/user/:id" component={User} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
