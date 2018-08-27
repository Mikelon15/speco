import React from 'react'
import { connect } from 'react-redux';

// ui elements 
import { Grid, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

// containers and components 
import './journal.css';
import Home from '../../components/home/Home';

// user actions 
import { fetchUserJournals, setUserLocation } from '../../actions';
import Library from '../Library';


  const mapStateToProps = state => {
    return {
      location: state.user.location
  }
}

const mapDispatchToProps = dispatch => {
  return {
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
            <Grid item xs={2} md={4}></Grid>
            <Grid align='center' item md={4} xs={8}>
              {( location === 'journals' ) ? <Library /> : ""}
              {( location === 'home' )     ? <Home /> : ""}
            </Grid>
            <Grid item xs={2} md={4}></Grid>
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
