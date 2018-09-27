const initialState = {
  selected: "",
  fetched: false,
  fetching: false,
  journals: [],
};

const journal = (state = initialState, action) => {
  switch (action.type) {
    case 'JOURNAL_EDIT':
      return Object.assign({}, state, {});
    case 'JOURNAL_EDIT_TITLE':
      return Object.assign({}, state, {
        journals: state.journals.map(journal =>
          (journal.key === action.key)
            ? { ...journal, title: action.title }
            : journal
        )
      });
    case 'JOURNAL_LOAD':
      return Object.assign({}, state, {
        journals: [{
          key: action.key,
          title: action.title,
          time: action.time,
          active: false
        }, ...state.journals]
      });
    case 'JOURNAL_RESET_LIST':
      return Object.assign({}, state, initialState);
    case 'JOURNAL_SELECT':
      return Object.assign({}, state, {
        selected: action.key,
        journals: state.journals.map(journal =>
          (journal.key === action.key)
            ? { ...journal, active: true }
            : { ...journal, active: false }
        )
      });
    case 'JOURNAL_DESELECT':
      return Object.assign({}, state, {
        selected: "",
        journals: state.journals.map(journal => { return { ...journal, active: false } }
        )
      });
    case 'JOURNAL_DELETE':
      return Object.assign({}, state, {
        journals: state.journals.filter((journal) => {
          if (journal.key !== action.key) {
            return journal;
          }
        })
      });
    case 'JOURNAL_TOGGLE_FETCHED':
      return Object.assign({}, state, {
        fetched: !state.fetched
      });
    case 'JOURNAL_TOGGLE_FETCHING':
      return Object.assign({}, state, {
        fetching: !state.fetching
      });
    default:
      return state
  }
}

export default journal
