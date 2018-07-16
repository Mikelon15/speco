import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';


const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)



render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();
