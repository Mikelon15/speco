import firebaseApi from '../api/firebase'

/*------------------------------------------------------------------------------
*
*                             AUTH STATE ACTIONS
*
------------------------------------------------------------------------------*/
export const authInitializedDone = () => ({
  type: 'AUTH_INITIALIZATION_DONE'
});

export const authLoggedInSuccess = () => ({
  type: 'AUTH_LOGGED_IN_SUCCESSFUL'
});

export const authLoggedOutSuccess = () => ({
  type: 'AUTH_LOGGED_OUT_SUCCESSFUL'
});

export const signoutUser = () => ({
  type: 'AUTH_LOGGED_OUT_SUCCESSFUL'
});

export const authError = (error) => ({
  type: 'AUTH_ERROR_MESSAGE',
  error
});

export const toggleUserSubscribing = () => ({
  type: 'AUTH_TOGGLE_SUBSCRIBING'
})

export const authInitialized = (user) => {
  return (dispatch) => {
    dispatch(authInitializedDone());
    if (user) {
      dispatch(authLoggedIn(user));
    } else {
      dispatch(authLoggedOutSuccess());
    }
  };
}
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

export const toggleUserFetching = () => ({
  type: 'TOGGLE_USER_FETCHING'
});

export const userErrorMessage = (error) => ({
  type: 'USER_ERROR_MESSAGE',
  error
})

/*------------------------------------------------------------------------------
*
*                             JOURNAL STATE ACTIONS
*
------------------------------------------------------------------------------*/
export const deselectJournalHelper = () => ({
  type: 'JOURNAL_DESELECT'
})

export const editJournalHelper = () => ({
  type: 'JOURNAL_EDIT'
})

export const loadJournalHelper = (key, title, time) => ({
  type: 'JOURNAL_LOAD',
  key: key,
  title: title,
  time: time
})

export const resetJournalListHelper = () => ({
  type: 'JOURNAL_RESET_LIST'
})

export const selectJournalHelper = key => ({
  type: 'JOURNAL_SELECT',
  key
})

export const toggleFetchedJournalHlper = () => ({
  type: 'JOURNAL_TOGGLE_FETCHED'
})

export const toggleFetchingJournalHlper = () => ({
  type: 'JOURNAL_TOGGLE_FETCHING'
})

/*------------------------------------------------------------------------------
*
*                             ENTRY STATE ACTIONS
*
------------------------------------------------------------------------------*/
export const addEntryHelper = (key, title, time) => ({
  type: 'ADD_ENTRY',
  key: key,
  title: title,
  time: time
})


export const editEntryTextHelper = text => ({
  type: 'EDIT_ENTRY_TEXT',
  text: text
})

export const loadEntryHelper = (key, title, time, text) => ({
  type: 'LOAD_ENTRY',
  key: key,
  title: title,
  time: time,
  text: text
})

export const resetEntryListHelper = () => ({
  type: 'RESET_ENTRY_LIST'
})

export const selectEntryHelper = key => ({
  type: 'SELECT_ENTRY',
  key
})

/*------------------------------------------------------------------------------
*
*                             FIREBASE AUTH ACTIONS
*
------------------------------------------------------------------------------*/
export const signUpWithEmailAndPassword = (email, password, username) => {
  return function(dispatch, getState) {
    let user = { email: email, password: password }
    firebaseApi.createUserWithEmailAndPassword(user).then((obj)=>{
      //updates user's profile username
      obj.user.updateProfile({displayName: username})
      //dipatch functions to let app know user is signed in
      dispatch(authLoggedIn(obj.user))
      dispatch(toggleUserSubscribing())
    })
    .catch((error) => {
      // Handle Errors here
      dispatch(authError(error))
    });
  }
}

export const signInWithEmailAndPassword = (user) => {
  return function(dispatch) {
    firebaseApi.signInWithEmailAndPassword(user.email, user.password)
    .then(val =>  {
        dispatch(authLoggedIn(val.user));
      }).catch(error => {
        dispatch(authError(error))
      });
    }
}

export const authLoggedIn = (user) => {
  return (dispatch) => {
    dispatch(setUserUID(user.uid));
    dispatch(setUserEmail(user.email));
    dispatch(setUserName(user.displayName));
    dispatch(authLoggedInSuccess());
  };
}

export const signout = () => {
  return function(dispatch){
    firebaseApi.authSignOut().then(function(promise){
      dispatch(signoutUser());
      dispatch(resetJournalListHelper());
    });
  }
}

/*------------------------------------------------------------------------------
*
*                             FIREBASE JOURNAL ACTIONS
*
------------------------------------------------------------------------------*/
export const fetchUserJournals = () => {
  return function (dispatch, getState) {
    // fetch the user's firebase journals
    firebaseApi.getValueByPathOnce('users/'+getState().user.uid+'/journals').then(snapshot => {
      // fetch the desired data from the snapshot
      let data = snapshot.val()
      //if the data returns contains journals, load them onto the view
      if(data != null)
         Object.keys(data).forEach(key => { //dispatch action to load journal
           dispatch(loadJournalHelper(key, data[key].title, data[key].time))
        });
    })
  }
}

export const addNewJournal = name => {
  return function(dispatch) {
    // A post entry.
    let journalData = {
      title: name,
      time: Date()
    };
    //get user location
    let location = 'users/'+firebaseApi.getUserID()+'/journals/';

    // Get a key for a new Entry.
    let newEntryKey = firebaseApi.createNewKeyInPath(location);

    // Write the new entry data
    let updates = {};
    updates[newEntryKey] = journalData;

    // dispatch action to change local data
    dispatch(loadJournalHelper(newEntryKey, journalData.title, journalData.time))
    return firebaseApi.updateDatabaseByPath(location, updates);
  }
}

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
