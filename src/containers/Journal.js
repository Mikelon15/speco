import {connect } from 'react-redux';
import { fetchInitialUserData } from '../actions';
import EntryList from '../components/EntryList';

const mapStateToProps = state => {
    return {
      entries: state.journal.entries.map(e => {
        return {
          title: e.title,
          key: e.key
      }}),
      selected: state.journal.selected
  }
}

const mapDispatchToProps = dispatch => {
  dispatch(fetchInitialUserData())
  return {
    // onClickAction : key => {
    //   dispatch(changeSelected(key))
    // }
    // fetchJournalEntries: () => {
    //   dispatch(fetchInitialUserData())
    // }
  }
};

const Journal = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryList)

export default Journal;
