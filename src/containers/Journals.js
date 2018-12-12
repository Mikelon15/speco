//---------------------------------------------------------------------
//    Journal.js
//
//    This file exports the Journal component. This is the main 
//    component that decides which part of the app to render.
//    It acts similiar to a Route component, but given the nature of
//    a chrome-extension, I didn't want to use that. 
//    
//    Author: Miguel Gutierrez
//---------------------------------------------------------------------


// react-redux
import React from 'react'
import { connect } from 'react-redux';

// containers and components 
import './journal.css';
import Library from './library/Library';
import Entry from './entry/Entry';

// user actions 
import { setUserLocation, signout } from '../actions';
const mapStateToProps = state => {
  return {
    location: state.user.location,
    background: state.user.background,
    selectedEntry: state.entries.selected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeLocation: location => {
      dispatch(setUserLocation(location))
    },
    signout: () => {
      dispatch(signout())
    }
  }
};


class Journals extends React.Component {
  state = { value: 'home' };


  handleChange = (event, value) => {
    this.props.changeLocation(value)
  }

  render() {
    // props  varibles
    // let { location, classes, background } = this.props;

    return (
      <div>
          { (this.props.selectedEntry) ? <Entry /> : <Library />}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Journals)
