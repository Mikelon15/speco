const initialState = {
  email: null,
  error: null,
  fetching: false,
  location: 'home', //'home', 'library', 'entry' 
  name: null,
  uid: null,
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
    case 'USER_ERROR_MESSAGE':
      return Object.assign({}, state, {
        error: action.error
    });
    case 'USER_SET_LOCATION':
      return Object.assign({}, state, {
        location: action.location
      });
    case 'USER_SIGN_OUT':
      return initialState;
    case 'USER_RESET':
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}
export default user;
