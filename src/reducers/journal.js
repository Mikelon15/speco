const initialState = {
  selected : -1,
  entries : []
};


const journal = (state = initialState, action ) => {
  switch (action.type){
    case 'ADD_ENTRY':
      return Object.assign({}, state, {
        entries : [ ...state.entries,  {
          id: action.id,
          name: action.name,
          text: null,
          active: false
        }]
      });
    case 'SELECT_ENTRY':
      return Object.assign({}, state, {
          selected: action.id,
          entries: state.entries.map(entry =>
            (entry.id === action.id)
            ? {...entry, active: true}
            : {...entry, active: false}
          )
        });
      case 'EDIT_ENTRY_TEXT':
          return Object.assign({}, state, {
              entries: state.entries.map(entry =>
                (entry.id === state.selected)
                ? {...entry, text: action.text}
                : entry
              )
            });
    default:
      return state
  }
}

export default journal
