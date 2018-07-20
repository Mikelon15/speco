// dependencies
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';

// api
import FirebaseApi from './api/firebase';

// reducers
import rootReducer from './reducers';

// containers
import App from './containers/App'

// actions
import { authInitialized } from './actions/index'

// stores

// styles

// import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

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
  store.dispatch(authInitialized(user))
  // store.dispatch
  render(
    <Provider store = {store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
})

registerServiceWorker();
