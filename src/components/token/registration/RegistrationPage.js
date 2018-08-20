import React from 'react';
import PropTypes from "prop-types";
import RegistrationForm from './RegistrationForm';
import { Typography, Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core';
import styles from '../styles';

class RegistrationPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        username: "",
        email: "",
        password: "",
        confirm: ""
      }
    };

    this.updateUserState = this.updateUserState.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  updateUserState(event) {
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user: user});
  }

  createUser(event) {
    event.preventDefault();
  }

  render() {
    let { error } = this.props; 
    return (
      <div>
        <Typography variant='title'>Sign Up</Typography>
        {(error) ?
          <Typography color="error">{error.toString()}</Typography> : "" 
        }
        <RegistrationForm
          onChange={this.updateUserState}
          onSave={this.createUser}
          saving={this.state.saving}
          user={this.state.user}
        />
        <div id="toggleLogin">
          <Typography>
            Already have an account? 
            <a onClick={e=>{e.preventDefault(); this.props.toggle()}}> 
              Sign In 
            </a>
          </Typography>
        </div>
        
        <Button 
          type="submit"
          fullWidth
          variant="raised"
          color="primary" 
          style={{float: 'right'}}
          onClick={this.createUser}>
          Sign Up
        </Button>
      </div>
    );
  }
}

RegistrationPage.propTypes = {
  // error: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(RegistrationPage);
