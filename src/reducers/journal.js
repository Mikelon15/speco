const initialState = {
  selected : "",
  isFetching: "",
  entries : []
};

const journal = (state = initialState, action ) => {
  switch (action.type){
    case 'ADD_ENTRY':
    return Object.assign({}, state, {
      entries : [ ...state.entries,  {
        key: action.key,
        title: action.title,
        text: "",
        time: action.time,
        active: false
      }]
    });
    case 'EDIT_ENTRY_TEXT':
    return Object.assign({}, state, {
      entries: state.entries.map(entry =>
        (entry.key === state.selected)
        ? {...entry, text: action.text}
        : entry
      )
    });
    case 'LOAD_ENTRY':
      return Object.assign({}, state, {
        entries : [ ...state.entries,  {
          key: action.key,
          title: action.title,
          text: action.text,
          time: action.time,
          active: false
        }]
      });
    case 'RESET_ENTRY_LIST':
      return Object.assign({}, state, {
          entries: []
      });
    case 'SELECT_ENTRY':
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

export default journal
