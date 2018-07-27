import { combineReducers } from 'redux'

import journal from './journal'
import user from './user'
import auth from './auth'
import entries from './entries'

const rootReducer = combineReducers({
  journal,
  user,
  auth,
  entries
});

export default rootReducer;
