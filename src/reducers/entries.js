const initialState = {
  selected: "",
  fetched: false,
  fetching: false,
  entries: []
}
const entries = (state = initialState, action) => {
  switch (action.type) {
      case 'ENTRY_ADD':
        return Object.assign({}, state, {
          entries : [ ...state.entries,  {
            key: action.key,
            title: action.title,
            text: "",
            time: action.time,
            active: false
          }]
        });
      case 'ENTRY_EDIT_TEXT':
        return Object.assign({}, state, {
          entries: state.entries.map(entry =>
            (entry.key === state.selected)
            ? {...entry, text: action.text}
            : entry
          )
        });
      case 'ENTRY_TOGGLE_FETCHED':
        return Object.assign({}, state, {
          fetched: !state.fetched
        })
      case 'ENTRY_TOGGLE_FETCHING':
        return Object.assign({}, state, {
          fetching: !state.fetching
        })
      case 'ENTRY_LOAD':
        return Object.assign({}, state, {
          entries : [ ...state.entries,  {
            title: action.title,
            key: action.key,
            text: action.text,
            time: action.time,
            active: false
          }]
        });
      case 'ENTRY_RESET_LIST':
        return Object.assign({}, state, {
            entries: []
        });
      case 'ENTRY_SELECT':
        return Object.assign({}, state, {
          selected: action.key,
          entries: state.entries.map(entry =>
            (entry.key === action.key)
            ? {...entry, active: true}
            : {...entry, active: false}
          )
        });
      default:
        return state
  }
}
export default entries
