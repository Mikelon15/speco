// dependencies
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import './index.css';


// api
import FirebaseApi from './api/firebase';

// reducers
import rootReducer from './reducers';

// containers
import App from './App'

// actions
import { authInitialized } from './actions/index'

// styles
const loggerMiddleware = createLogger()

// store intiialization
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)


FirebaseApi.initAuth().then(user => {
  // dispatch
  store.dispatch(authInitialized(user))
  render(
    <Provider store = {store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
})

registerServiceWorker();
