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

// ui elements 
import { Grid, withStyles } from '@material-ui/core';
import compose from 'recompose/compose';

// containers and components 
import './journal.css';
import Home from './/home/Home';
import Library from './library/Library';
import Entry from './entry/Entry';

// user actions 
import { fetchUserJournals, setUserLocation, signout } from '../actions';
import BottomNav from '../components/BottomNav';
import Settings from '../components/Settings';

const mapStateToProps = state => {
  return {
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
};


class Journal extends React.Component {
  state = {
    value: 'home'
  };



  // fetch list of journals when component loads 
  componentWillMount() {
    this.props.fetchJournals();
  }

  handleChange = (event, value) => {
    this.props.changeLocation(value)
  }

  render() {
    // props  varibles
    let { location, classes, background } = this.props;

    return (
      < div className="container"
        style={
          {
            backgroundImage: background
          }
        } >

        <Grid container>
          <Grid item xs={2} md={3}></Grid>

          <Grid align='center' item md={6} xs={8}>
            {(location === 'journals') && <Library />}
            {(location === 'home') && <Home />}
            {(location === 'entry') && <Entry />}
          </Grid>

          <Grid item xs={2} md={3}>
            <Settings signout={this.props.signout} />
          </Grid>
        </Grid>

        <BottomNav location={location} handleChange={this.handleChange} />

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Journal)
