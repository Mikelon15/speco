import firebase from '../firebase'

let nextEntryId = 0

/*------------------------------------------------------------------------------
*
*                             USER STATE ACTIONS
*
------------------------------------------------------------------------------*/
export const changeSelected = id => ({
  type: 'SELECT_ENTRY',
  id
})

export const addEntryHelper = name => ({
  type: 'ADD_ENTRY',
  id: nextEntryId++,
  name: name
})

export const editEntryText = text => ({
  type: 'EDIT_ENTRY_TEXT',
  text: text
})

export const setUserName = (name) => ({
  type: 'SET_USER_NAME',
  name
});

export const setUserEmail = (email) => ({
  type: 'SET_USER_EMAIL',
  email
});

export const setUserUID = (uid) => ({
    type: 'SET_USER_UID',
    uid
});

export const userAuthorized = () => ({
    type: 'USER_AUTHORIZED'
});

/*------------------------------------------------------------------------------
*
*                             FIREBASE ACTIONS
*
------------------------------------------------------------------------------*/

export const signUpWithEmailAndPassword = (email, password) => {
  return function(dispatch, getState) {
    console.log(email);
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user)=>{
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }
}
export const logInWithEmailAndPassword = (email, password) => {
  return function(dispatch, getState) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token.
        var token = result.credential.accessToken;
      }
      var user = result.user;

      dispatch(setUserEmail(result.email));
      dispatch(setUserName(result.displayName));
      dispatch(setUserUID(result.uid));
      dispatch(userAuthorized());
    });
  }
}

export const addEntry = text => {
  return function(dispatch) {
    var database = firebase.database()
    database.ref('entries/').push({name: text})
    dispatch(addEntryHelper(text))
  }
}
