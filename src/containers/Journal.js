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
import { Grid, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

// containers and components 
import './journal.css';
import Home from './/home/Home';
import Library from './library/Library';
import Entry from './entry/Entry';

// user actions 
import { fetchUserJournals, setUserLocation } from '../actions';


const mapStateToProps = state => {
  return { location: state.user.location }
}

const mapDispatchToProps = dispatch => {
  return {
    // i fetch the journals here because I want the journal list
    // to load as soon as the uesr is logged in 
    fetchJournals : () => {
      dispatch(fetchUserJournals())
    },
    changeLocation: location => {
      dispatch(setUserLocation(location))
    }
  }
};


class Journal extends React.Component{
  state = {
    value: 'home'
  };
  
  // fetch list of journals when component loads 
  componentWillMount(){
    this.props.fetchJournals();
  }

  handleChange = (event, value) => {
    this.props.changeLocation(value)
  }

  render(){
    // state  varibles
    let { location } = this.props;

    return(
      <div className="container">

        <Grid container>
            <Grid item xs={2} md={3}></Grid>
            <Grid align='center' item md={6} xs={8}>
              {( location === 'journals' ) ? <Library /> : ""}
              {( location === 'home' )     ?  <Home />   : ""}
              {( location === 'entry' )    ?  <Entry />  : ""}
            </Grid>
            <Grid item xs={2} md={3}></Grid>
        </Grid>


        <div className="bottom">
          <BottomNavigation
            value={ location }
            showLabels
            onChange={this.handleChange}
          >
            <BottomNavigationAction 
            value="home"
            label="Home"
            icon={<HomeIcon/>} 
            />
            <BottomNavigationAction                         
              value="journals"
              label="Journals" 
              icon={<LibraryBooksIcon />}
              />
            <BottomNavigationAction 
              value="entry"
              label="Entry" 
              icon={<LibraryAddIcon />}/>
          </BottomNavigation>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Journal);
