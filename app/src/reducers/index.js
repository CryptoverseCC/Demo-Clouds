import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import profile from 'App/reducers/profile';
import clouds from 'App/reducers/clouds';
import cloud from 'App/reducers/cloud';
import holdings from 'App/reducers/holdings';
import pairing from 'App/reducers/pairing';
import keys from 'App/reducers/keys';
import sponsored from 'App/reducers/sponsored';

const rootReducer = combineReducers({
  profile,
  clouds,
  cloud,
  holdings,
  pairing,
  keys,
  sponsored,
  router: routerReducer
});

export default rootReducer;
