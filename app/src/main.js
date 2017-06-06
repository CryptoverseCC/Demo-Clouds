import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import getStore from './store';
import Dashboard from './components/Dashboard.js';
import './styles.css';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const history = createHistory();

function render() {
  ReactDOM.render(
    <Provider store={getStore(history)}>
      <Dashboard history={history}/>
    </Provider>,
    document.getElementById('app')
  );
}

render();
