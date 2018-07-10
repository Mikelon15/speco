import { combineReducers } from 'redux'

import journal from './journal'
import user from './user'

const rootReducer = combineReducers({
  journal,
  user
});

export default rootReducer;
