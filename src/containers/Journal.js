import {connect } from 'react-redux';
import { changeSelected, signout } from '../actions';
import EntryList from '../components/EntryList';

const mapStateToProps = state => {
  return {
    selected: state.journal.selected,
    entries:  state.journal.entries
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClickAction : id => {
      dispatch(changeSelected(id))
    },
    onSignout: () => {
      dispatch(signout())
    }
  }
};

const Journal = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryList)

export default Journal;
