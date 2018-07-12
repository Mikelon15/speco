const initialState = {
  name: null,
  email: null,
  uid: null,
  authorized: false,
  subscribing: true
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
    case 'USER_AUTHORIZED':
        return Object.assign({}, state, {
            authorizing: false,
            authorized: true
        });
    case 'USER_START_SUBSCRIBING':
      return Object.assign({}, state, {
        subscribing: true
      });
    default:
      return state;
  }
}
export default user;
