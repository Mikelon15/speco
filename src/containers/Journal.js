import {connect } from 'react-redux';
import { changeSelected, signout } from '../actions';
import EntryList from '../components/EntryList';

const mapStateToProps = state => {
  return {
    entries: state.journal.entries.map(e => { return {
      title: e.title,
      key: e.key
    }})
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
