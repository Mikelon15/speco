let initialState = {
  initialized: false,
  logged: false,
  subscribing: false,
  error: null,
  fetching: false
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_INITIALIZATION_DONE':
      return Object.assign({}, state, { initialized: true });

    case 'AUTH_LOGGED_IN_SUCCESSFUL':
      return Object.assign({}, state, {
        logged: true
      });

    case 'AUTH_LOGGED_OUT_SUCCESSFUL':
      return Object.assign({}, state, {
        logged: false
      });

    case 'AUTH_TOGGLE_SUBSCRIBING':
      return Object.assign({}, state, {
        subscribing: !state.subscribing
      });

    case 'AUTH_TOGGLE_FETCHING':
      return Object.assign({}, state, {
        fetching: !state.fetching
      });

    case 'AUTH_ERROR_MESSAGE':
      return Object.assign({}, state, {
        error: action.error
      });
    case 'AUTH_RESET':
      return Object.assign({}, state, initialState);
    case 'AUTH_CLEAR_ERROR':
      return Object.assign({}, state, {
        error: null
      })
    default:
      return state;
  }
}

export default auth
