import { combineReducers } from 'redux'

import journal from './journal'
import user from './user'
import auth from './auth'

const rootReducer = combineReducers({
  journal,
  user,
  auth
});

export default rootReducer;
