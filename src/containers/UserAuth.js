import {connect } from 'react-redux';
import { changeSelected } from '../actions';
import EntryList from '../components/EntryList';
import LogIn from '../components/AuthScreen';

const mapStateToProps = state => {
  return {
    selected: state.journal.selected,
    entries:  state.journal.entries
  }
}

const mapDispatchToProps = dispatch => {
  return {
    }
}

const UserAuth = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn)

export default UserAuth;
