import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './App';
import Home from './Home';
import Recipe from './Recipes';
import './index.css';
import './bootstrap/css/bootstrap.min.css';

ReactDOM.render(
  <Router history={ hashHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ Home }></IndexRoute>
      <Route path="recipe/:id" component={ Recipe }></Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
