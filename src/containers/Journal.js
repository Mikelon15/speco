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
import { Grid, BottomNavigation, BottomNavigationAction, Button, Popper, Grow, Paper, MenuList, MenuItem, ClickAwayListener } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import SettingsIcon from '@material-ui/icons/Settings';


// containers and components 
import './journal.css';
import Home from './/home/Home';
import Library from './library/Library';
import Entry from './entry/Entry';

// user actions 
import { fetchUserJournals, setUserLocation, signout } from '../actions';


const mapStateToProps = state => {
  return { location: state.user.location }
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
    value: 'home',
    open: false
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
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
    let { location } = this.props;
    // state
    let { open } = this.state;

    return (
      <div className="container">

        <Grid container>
          <Grid item xs={2} md={3}></Grid>
          <Grid align='center' item md={6} xs={8}>
            {(location === 'journals') ? <Library /> : ""}
            {(location === 'home') ? <Home /> : ""}
            {(location === 'entry') ? <Entry /> : ""}
          </Grid>
          <Grid item xs={2} md={3}>
            <Button
              buttonRef={node => {
                this.anchorEl = node;
              }}
              aria-owns={(open) ? 'menu-list-grow' : null}
              aria-haspopup="true"
              onClick={this.handleToggle}
              style={{ float: 'right' }}>
              <SettingsIcon />
            </Button>
            <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={this.handleClose}>
                      <MenuList>
                        <MenuItem onClick={this.props.signout}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Grid>
        </Grid>


        <div className="bottom">
          <BottomNavigation
            value={location}
            showLabels
            onChange={this.handleChange}
          >
            <BottomNavigationAction
              value="home"
              label="Home"
              icon={<HomeIcon />}
            />
            <BottomNavigationAction
              value="journals"
              label="Journals"
              icon={<LibraryBooksIcon />}
            />
            <BottomNavigationAction
              value="entry"
              label="Entry"
              icon={<LibraryAddIcon />} />
          </BottomNavigation>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Journal);
