import firebase from '../firebase'

let nextTodoId = 0
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


export const addTodoHelper = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
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
