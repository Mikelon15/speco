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

export const toggleAuthFetching = () => ({
  type: 'AUTH_TOGGLE_FETCHING'
})

export const authInitialized = (user) => {
  return (dispatch) => {
    // user init done 
    dispatch(authInitializedDone());
    // check if location is saved
    let loc = localStorage.getItem("location");
    if (loc) {
      dispatch(setUserLocation(loc));
    }
    // check if user is login in or not
    (user) ? dispatch(authLoggedIn(user)): dispatch(authLoggedOutSuccess());
  };
}

export const authReset = () => ({
  type: 'AUTH_RESET'
})

export const authClearError = () => ({
  type: 'AUTH_CLEAR_ERROR'
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

export const toggleUserFetching = () => ({
  type: 'TOGGLE_USER_FETCHING'
});

export const userErrorMessage = (error) => ({
  type: 'USER_ERROR_MESSAGE',
  error
})

export const userReset = () => ({
  type: 'USER_RESET'
})

export const setUserLocationHelper = (location) => ({
  type: 'USER_SET_LOCATION',
  location
})

export const userToggleOnline = () => ({
  type: 'USER_TOGGLE_ONLINE'
})
export const changeUserBackgroundHelper = (background) => ({
  type: 'USER_CHANGE_BACKGROUND',
  background: background
})
export const setUserLocation = (location) => {
  return (dispatch) => {
    localStorage.setItem("location", location);
    dispatch(setUserLocationHelper(location));
  }
}
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

export const toggleJournalFetchedHelper = () => ({
  type: 'JOURNAL_TOGGLE_FETCHED'
})

export const toggleJournalFetchingHelper = () => ({
  type: 'JOURNAL_TOGGLE_FETCHING'
})
export const deselectJournal = () => {
  return (dispatch) => {
    localStorage.setItem("journal", null);
    dispatch(deselectJournalHelper())
    dispatch(deselectEntryHelper())
    dispatch(resetEntryListHelper())
  }
}
export const selectJournal = (key) => {
  return (dispatch) => {
    localStorage.setItem("journal", key);
    dispatch(selectJournalHelper(key))
    dispatch(fetchUserEntries())
  }
}

export const deleteJournal = (key) => {
  return (dispatch, getState) => {
    if (getState().journal.selected === key) {
      dispatch(deselectJournal());
    }
    dispatch(deleteJournalHelper(key))
    //if nothing is selected, return
    if (key === "") return;

    let location = 'users/' + getState().user.uid + '/journals/' + key + '/';
    //update data
    return firebaseApi.removeDatabaseByPath(location);
  }
}

export const deleteJournalHelper = (key) => ({
  type: 'JOURNAL_DELETE',
  key: key
})

export const editJournalTitleHelper = (title, key) => ({
  type: 'JOURNAL_EDIT_TITLE',
  title: title,
  key: key
})

/*------------------------------------------------------------------------------
*
*                             ENTRY STATE ACTIONS
*
------------------------------------------------------------------------------*/
export const addEntryHelper = (key, title, time) => ({
  type: 'ENTRY_ADD',
  key: key,
  title: title,
  time: time
})

export const deselectEntryHelper = () => ({
  type: 'ENTRY_DESELECT'
})

export const editEntryTextHelper = text => ({
  type: 'ENTRY_EDIT_TEXT',
  text: text
})

export const editEntryTitleHelper = title => ({
  type: 'ENTRY_EDIT_TITLE',
  title: title
})

export const toggleEntryFetchedHelper = () => ({
  type: 'ENTRY_TOGGLE_FETCHED'
})

export const toggleEntryFetchingHelper = () => ({
  type: 'ENTRY_TOGGLE_FETCHING'
})

export const loadEntryHelper = (key, title, time, text) => ({
  type: 'ENTRY_LOAD',
  key: key,
  title: title,
  time: time,
  text: text
})

export const resetEntryListHelper = () => ({
  type: 'ENTRY_RESET_LIST'
})

export const selectEntryHelper = key => ({
  type: 'ENTRY_SELECT',
  key
})

export const selectEntry = (key) => {
  return function (dispatch) {
    localStorage.setItem("entry", key);
    dispatch(selectEntryHelper(key))
  }
}
/*------------------------------------------------------------------------------
*
*                             FIREBASE AUTH ACTIONS
*
------------------------------------------------------------------------------*/
export const signUpWithEmailAndPassword = (email, password) => {
  return function (dispatch, getState) {
    let user = {
      email: email,
      password: password
    }
    dispatch(toggleUserFetching())
    firebaseApi.createUserWithEmailAndPassword(user).then((obj) => {
        //dipatch functions to let app know user is signed in
        dispatch(authLoggedIn(obj.user))
        dispatch(toggleUserSubscribing())
      })
      .catch((error) => {
        // Handle Errors here
        dispatch(authError(error))
        dispatch(toggleUserFetching())
      });
  }
}

export const signInWithEmailAndPassword = (user) => {
  return function (dispatch) {
    dispatch(toggleUserFetching())
    firebaseApi.signInWithEmailAndPassword(user.email, user.password)
      .then(val => {
        dispatch(authLoggedIn(val.user));
        dispatch(toggleUserFetching())
      })
      .catch(error => {
        dispatch(authError(error));
        dispatch(toggleUserFetching());
      });
  }
}
export const dispatchToggleConnectivity = () => {
  return function (dispatch) {
    dispatch(userToggleOnline())
    console.log('user toggle called')
  }
}
export const getUserBackground = () => {
  return function (dispatch) {
    let date = new Date().getDate();
    let lastDate = localStorage.getItem('lastLogin');
    let url = localStorage.getItem('background');

    // check if date is been refreshed or if no background
    if (date !== lastDate || !url) {
      url = 'url(../media/ls' + Math.floor(Math.random() * 5 + 1) + '.jpg)';
      localStorage.setItem('lastLogin', date)
      localStorage.setItem('background', url)
    }

    dispatch(changeUserBackgroundHelper(url));
  }
}
export const authLoggedIn = (user) => {
  return (dispatch) => {
    // set online/offline listeners
    window.addEventListener('online', dispatchToggleConnectivity);
    window.addEventListener('offline', dispatchToggleConnectivity);
    dispatch(getUserBackground());
    dispatch(setUserUID(user.uid));
    dispatch(setUserEmail(user.email));
    dispatch(authLoggedInSuccess());
  };
}

export const signout = () => {
  return function (dispatch) {
    firebaseApi.authSignOut().then(function (promise) {
      localStorage.clear();
      dispatch(signoutUser());
      dispatch(authReset());
      dispatch(userReset());
      dispatch(resetJournalListHelper());
      dispatch(resetEntryListHelper());
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
    dispatch(toggleJournalFetchingHelper());

    // fetch the user's firebase journals
    firebaseApi.getValueByPathOnce('users/' + getState().user.uid + '/journals').then(snapshot => {
      // fetch the desired data from the snapshot
      let data = snapshot.val()
      // check if location is saved for selected entry
      let loc = localStorage.getItem("journal");
      let load = false;
      if (loc) load = true;

      //if the data returns contains journals, load them onto the view
      if (data != null)
        Object.keys(data).forEach(key => { //dispatch action to load journal
          dispatch(loadJournalHelper(key, data[key].title, data[key].time))
          if (load)
            if (loc === key)
              dispatch(selectJournal(loc));
        });
      dispatch(toggleJournalFetchedHelper());
      dispatch(toggleJournalFetchingHelper());
    })
  }
}

export const addNewJournal = name => {
  return function (dispatch) {
    // A post entry.
    let journalData = {
      title: name,
      time: getDate()
    };
    //get user location
    let location = 'users/' + firebaseApi.getUserID() + '/journals/';

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
export const editJournalTitle = (title, key) => {
  return function (dispatch, getState) {
    //if nothing is selected, return
    if (key === "") return;

    let location = 'users/' + getState().user.uid + '/journals/' + key + '/';
    let updates = {};
    updates['title'] = title;

    //update data
    dispatch(editJournalTitleHelper(title, key))


    return firebaseApi.updateDatabaseByPath(location, updates);
  }
}
/*------------------------------------------------------------------------------
*
*                             FIREBASE ENTRY ACTIONS
*
------------------------------------------------------------------------------*/
export const fetchUserEntries = () => {
  return function (dispatch, getState) {
    dispatch(toggleEntryFetchingHelper());

    // fetch the user's firebase journals
    firebaseApi.getValueByPathOnce('users/' + getState().user.uid + '/entries/' +
      getState().journal.selected + '/').then(snapshot => {

      // check if location is saved for selected entry
      let loc = localStorage.getItem("entry");
      let load = false;
      if (loc) load = true;
      // fetch the desired data from the snapshot
      let data = snapshot.val()
      //if the data returns contains journals, load them onto the view
      if (data != null)
        Object.keys(data).forEach(key => { //dispatch action to load journal
          dispatch(loadEntryHelper(key, data[key].title, data[key].time, data[key].text))
          if (load)
            if (loc === key)
              dispatch(selectEntry(loc));
        });
      dispatch(toggleEntryFetchedHelper());
      dispatch(toggleEntryFetchingHelper());
    })
  }
}

export const addNewEntry = (journalKey, name) => {
  return function (dispatch) {
    // A post entry.
    let entryData = {
      title: name,
      text: "",
      time: getDate()
    };
    //get user location
    let location = 'users/' + firebaseApi.getUserID() + '/entries/' + journalKey + '/';

    // Get a key for a new Entry.
    let newEntryKey = firebaseApi.createNewKeyInPath(location);

    // Write the new entry data
    let updates = {};
    updates[newEntryKey] = entryData;

    // dispatch action to change local data
    dispatch(addEntryHelper(newEntryKey, entryData.title, entryData.time))
    dispatch(selectEntry(newEntryKey))
    dispatch(setUserLocation("entry"))
    return firebaseApi.updateDatabaseByPath(location, updates);
  }
}

export const editEntryText = (text, key) => {
  return function (dispatch, getState) {
    //if nothing is selected, return and do nothing
    if (key === "") return;

    // user location
    let location = 'users/' + getState().user.uid + '/entries/' +
      getState().journal.selected + '/' + key + '/';

    let updates = {};
    updates['text'] = text;

    //update data
    dispatch(editEntryTextHelper(text))
    return firebaseApi.updateDatabaseByPath(location, updates);
  }
}

export const editEntryTitle = (title, key) => {
  return function (dispatch, getState) {
    //if nothing is selected, return
    if (key === "") return;

    let location = 'users/' + getState().user.uid + '/entries/' +
      getState().journal.selected + '/' + key + '/';
    let updates = {};
    updates['title'] = title;

    //update data
    dispatch(editEntryTitleHelper(title))
    return firebaseApi.updateDatabaseByPath(location, updates);
  }
}

function getDate() {
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  let t = new Date();
  return t.toLocaleDateString('en-US', options);
}