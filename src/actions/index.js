let nextTodoId = 0
let nextEntryId = 0

export const addTodo = text => ({
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

export const addEntry = name => ({
  type: 'ADD_ENTRY',
  id: nextEntryId++,
  name: name
})

export const editEntryText = text => ({
  type: 'EDIT_ENTRY_TEXT',
  text: text
})
