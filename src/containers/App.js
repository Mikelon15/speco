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

import React from 'react';
import { connect } from 'react-redux';

// the two main components, render Journal or authenticate user 
import UserAuth from './auth/UserAuth';


// ui elements 
import { Grid } from '@material-ui/core';

// containers and components 
import './journal.css';
import Home from './home/Home';
import Journals from './Journals';

// user actions 
import { fetchUserJournals, setUserLocation, signout } from '../actions';
import BottomNav from '../components/BottomNav';
import Settings from '../components/Settings';

// finds the active entry to update text changes
const mapStateToProps = state => {
  return {
    auth: state.auth.logged,
    location: state.user.location,
    background: state.user.background
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // i fetch the journals here because I want the journal list
    // to load as soon as the uesr is logged in 
    fetchJournals: () => {
      dispatch(fetchUserJournals())
    },
    changeLocation: location => {
      dispatch(setUserLocation(location))
    },
    signout: () => {
      dispatch(signout())
    }
  }
}

class App extends React.Component {
  state = {
    value: 'home'
  };

  handleChange = (event, value) => {
    this.props.changeLocation(value)
  }
  render() {
    // props  varibles
    let { location, background } = this.props;

    let { auth } = this.props;
    return (
      <div id="app">
        {(!auth) && <UserAuth />}
        {(auth) && (
          < div className="container" style={{ backgroundImage: background }} >
            <Grid container>
              <Grid item xs={2} md={3}></Grid>

              <Grid align='center' item md={6} xs={8}>
                {(location === 'journals') && <Journals />}
                {(location === 'home') && <Home />}
              </Grid>

              <Grid item xs={2} md={3}>
                <Settings signout={this.props.signout} />
              </Grid>
            </Grid>

            <BottomNav location={location} handleChange={this.handleChange} />
          </div>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);