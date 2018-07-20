import firebaseApi from '../api/firebase'

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

export const loadEntry = (key, title, time, text) => ({
  type: 'LOAD_ENTRY',
  key: key,
  title: title,
  time: time,
  text: text
})

export const editEntryTextHelper = text => ({
  type: 'EDIT_ENTRY_TEXT',
  text: text
})

/*------------------------------------------------------------------------------
*
*                             USER STATE ACTIONS
*
------------------------------------------------------------------------------*/
export const authInitializedDone = () => ({
  type: 'AUTH_INITIALIZATION_DONE'
});

export const authLoggedInSuccess = (userUID) => ({
  type: 'AUTH_LOGGED_IN_SUCCESS', userUID
});

export const authLoggedOutSuccess = () => ({
  type: 'AUTH_LOGGED_OUT_SUCCESS'
});

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

export const toggleUserFetching = () => ({
  type: 'TOGGLE_USER_FETCHING'
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

export const authInitialized = (user) => {
  return (dispatch) => {
    console.log(user)
    dispatch(authInitializedDone());
    if (user) {
      dispatch(authLoggedIn(user.uid));
      dispatch(setUserEmail(user.email));
      dispatch(setUserName(user.displayName));
      dispatch(setUserUID(user.uid));
      dispatch(fetchInitialUserData());
    } else {
      dispatch(authLoggedOutSuccess());
    }
  };
}
/*------------------------------------------------------------------------------
*
*                             FIREBASE USER ACTIONS
*
------------------------------------------------------------------------------*/

// export const signUpWithEmailAndPassword = (email, password, username) => {
//   return function(dispatch, getState) {
//     console.log(email);
//     firebase.auth().createUserWithEmailAndPassword(email, password).then((obj)=>{
//       //updates user's profile username
//       obj.user.updateProfile({displayName: username})
//     })
//     .catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       if (errorCode === 'auth/weak-password') {
//         alert('The password is too weak.');
//       } else {
//         alert(errorMessage);
//       }
//       console.log(error);
//     });
//   }
// }
export const signInWithEmailAndPassword = (email, password) => {
  return function(dispatch) {
      return firebaseApi.signInWithEmailAndPassword(email, password).then(user => {
            console.log("USER LOGGED IN");
            dispatch(userAuthorized());
            dispatch(setUserEmail(user.email));
            dispatch(setUserName(user.displayName));
            dispatch(setUserUID(user.uid));
            // dispatch(toggleUserFetching());
      });
  }
}
export const authLoggedIn = (userUID) => {
  return (dispatch) => {
    dispatch(authLoggedInSuccess(userUID));
    dispatch(userAuthorized());
    // dispatch(beginAjaxCall());
    firebaseApi.GetChildAddedByKeyOnce('/users', userUID)
      .then(
        user => {
          // dispatch(userLoadedSuccess(user.val()));
          // dispatch(push('/'));
        })
      // .catch(
      //   error => {
      //     dispatch(beginAjaxCall());
      //     // @TODO better error handling
      //     throw(error);
      //   });
  };
}
// export const checkUserExists = () => {
//     return function (dispatch) {
//         firebase.auth().onAuthStateChanged(function(user){
//           if(user){
//             // user signed in
//             dispatch(userAuthorized());
//             dispatch(setUserEmail(user.email));
//             dispatch(setUserName(user.displayName));
//             dispatch(setUserUID(user.uid));
//             dispatch(fetchInitialUserData());
//             dispatch(toggleUserFetching())
//           }
//           else{
//             // user not signed in
//             console.log("USER DOES NOT EXIST")
//           }
//         })
//     }
// };
// export const signout = () => {
//   return function(dispatch){
//     firebase.auth().signOut().then(function(promise){
//       dispatch(signoutUser());
//     });
//   }
// }
// const getUserDatabase = () => {return firebase.database().ref('users/'+firebase.auth().currentUser.uid)}
/*------------------------------------------------------------------------------
*
*                             FIREBASE ACTIONS
*
------------------------------------------------------------------------------*/
//
// export const addNewEntry = name => {
//   return function(dispatch) {
//     // A post entry.
//     let entryData = {
//       title: name,
//       text: "",
//       time: Date()
//     };
//     let location = 'users/'+firebase.auth().currentUser.uid;
//     // Get a key for a new Entry.
//     let newEntryKey = firebase.database().ref(location).child('posts').push().key;
//
//     // Write the new entry data
//     let updates = {};
//     updates['/posts/' + newEntryKey] = entryData;
//
//     // dispatch action to change local data
//     dispatch(addEntryHelper(newEntryKey, entryData.title, entryData.time))
//     return firebase.database().ref(location).update(updates);
//   }
// }

// export const editEntryText = (text, key) => {
//   return function(dispatch){
//     //if nothing is selected, return and do nothing
//     if (key === "") return;
//
//     // update object
//     let updates = {}
//     updates['/posts/'+key+'/text'] = text;
//
//     //update data
//     dispatch(editEntryTextHelper(text))
//     return getUserDatabase().update(updates);
//   }
// }

export const fetchInitialUserData = () => {
  return function (dispatch, getState) {
    // console.log(getState().user.uid)
    // '+getState().user.uid+
    firebaseApi.GetValueByPathOnce('users/posts').then(snapshot => {
      let data = snapshot.val()
      console.log(data)
      if(data != null){
        let list = Object.keys(data).reverse();
        list.forEach(key => {
          dispatch(loadEntry(key, data[key].title, data[key].time, data[key].text ))
        });
      }
    })
    // .orderByKey()
    // .limitToLast(3)
    // .once('value', (snapshot) => {
      // }
    // })
  }
}
