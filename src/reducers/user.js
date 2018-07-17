const initialState = {
  name: null,
  email: null,
  uid: null,
  fetching: false,
  fetched: false,
  authorized: false,
  subscribing: false,
  error: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_NAME':
        return Object.assign({}, state, {
            name: action.name
        });
    case 'SET_USER_EMAIL':
        return Object.assign({}, state, {
            email: action.email
        });
    case 'SET_USER_UID':
      return Object.assign({}, state, {
        uid: action.uid
    });
    case 'TOGGLE_USER_FETCHING':
        let fetch = !state.fetching
        return Object.assign({}, state, {
            fetching: fetch
        });
    case 'TOGGLE_USER_FETCHED':
        return Object.assign({}, state, {
            fetched: !state.fetched
        });
    case 'USER_AUTHORIZED':
        return Object.assign({}, state, {
            authorizing: false,
            authorized: true
        });
    case 'USER_START_SUBSCRIBING':
      return Object.assign({}, state, {
        subscribing: true
      });
    case 'USER_ERROR_MESSAGE':
      return Object.assign({}, state, {
        error: action.code
      });
    case 'USER_SIGN_OUT':
      return initialState;
    default:
      return state;
  }
}
export default user;
