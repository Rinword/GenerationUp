import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

// import statisticReducer from './js/redux/statisticReducer';

import App from './app';

const history = createHistory();

const rCompose = window.__REDUX_DEVTOOLS_EXTENSION__ ? compose(
    applyMiddleware(thunk, routerMiddleware(history)),
    window.__REDUX_DEVTOOLS_EXTENSION__()
)  : applyMiddleware(thunk, routerMiddleware(history));

const store = createStore(
  combineReducers({
    router: routerReducer,
    // statistic: statisticReducer,
  }),
  {},
  rCompose
);

ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
          <App/>
      </ConnectedRouter>
    </Provider>,
  document.getElementById('root')
);
