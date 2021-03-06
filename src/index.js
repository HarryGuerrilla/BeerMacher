import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import Home from './Home';
import Recipe from './Recipes';
import reducers from './reducers';
import './index.css';
import './bootstrap/css/bootstrap.min.css';

const store = createStore(reducers, {}, applyMiddleware(thunk));
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="recipe/:id" component={Recipe} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
