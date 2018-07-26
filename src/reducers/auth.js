let initialState = {
  initialized: false,
  logged: false,
  subscribing: false,
  error: null
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_INITIALIZATION_DONE':
      return Object.assign({}, state, {initialized: true});

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
    case 'AUTH_ERROR_MESSAGE':
      return Object.assign({}, state, {
        error: action.error
      });

    default:
      return state;
  }
}

export default auth
