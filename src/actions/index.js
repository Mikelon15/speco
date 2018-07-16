import firebase from '../firebase'

/*------------------------------------------------------------------------------
*
*                             JOURNAL STATE ACTIONS
*
------------------------------------------------------------------------------*/
export const changeSelected = key => ({
  type: 'SELECT_ENTRY',
  key
})

export const addEntryHelper = (key, title, time) => ({
  type: 'ADD_ENTRY',
  key: key,
  title: title,
  time: time
})

export const editEntryText = text => ({
  type: 'EDIT_ENTRY_TEXT',
  text: text
})

/*------------------------------------------------------------------------------
*
*                             USER STATE ACTIONS
*
------------------------------------------------------------------------------*/
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

export const signoutUser = () => ({
  type: 'USER_SIGN_OUT'
});

export const startSubscribing = () => ({
  type: 'USER_START_SUBSCRIBING'
});
/*------------------------------------------------------------------------------
*
*                             FIREBASE USER ACTIONS
*
------------------------------------------------------------------------------*/

export const signUpWithEmailAndPassword = (email, password, username) => {
  return function(dispatch, getState) {
    console.log(email);
    firebase.auth().createUserWithEmailAndPassword(email, password).then((obj)=>{
      //updates user's profile username
      obj.user.updateProfile({displayName: username})
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
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function() {
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
          console.log(result);
          dispatch(setUserEmail(result.email));
          dispatch(setUserName(result.displayName));
          dispatch(setUserUID(result.uid));
          dispatch(userAuthorized());
        });
      })
  }
}
export const checkUserExists = () => {
    return function (dispatch) {
        firebase.auth().onAuthStateChanged(function(user){
          if(user){
            // user signed in
            dispatch(setUserEmail(user.email));
            dispatch(setUserName(user.displayName));
            dispatch(setUserUID(user.uid));
            dispatch(userAuthorized());
          }
          else{
            // user not signed in
          }
        })
    }
};
export const signout = () => {
  return function(dispatch){
    firebase.auth().signOut().then(function(promise){
      dispatch(signoutUser());
    });
  }
}

/*------------------------------------------------------------------------------
*
*                             FIREBASE ACTIONS
*
------------------------------------------------------------------------------*/

export const addNewEntry = name => {
  return function(dispatch) {
    // A post entry.
    let entryData = {
      title: name,
      text: "",
      time: Date()
    };
    let location = 'users/'+firebase.auth().currentUser.uid;
    // Get a key for a new Entry.
    let newEntryKey = firebase.database().ref(location).child('posts').push().key;

    // Write the new entry data
    let updates = {};
    updates['/posts/' + newEntryKey] = entryData;

    // dispatch action to change local data
    dispatch(addEntryHelper(newEntryKey, entryData.title, entryData.time))
    return firebase.database().ref(location).update(updates);
  }
}
