import firebase from '../firebase'

let nextEntryId = 0

export const addEntry = text => {
  return function(dispatch) {
    // firebase.database().ref().push().key
    var database = firebase.database()
    console.log(database)
    database.ref('entries/').push({name: text})
    dispatch(addEntryHelper(text))
  }
}

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
