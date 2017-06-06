import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { getProfile, getClouds, getSponsoredClouds, getKeys } from './actions';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers';

export default function getStore (history) {
  const loggerMiddleware = createLogger();

  const rMiddleware = routerMiddleware(history);

  const store = createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
      rMiddleware
    )
  );

  store.dispatch(getProfile());
  store.dispatch(getClouds());
  store.dispatch(getSponsoredClouds());
  store.dispatch(getKeys());

  return store;
}
