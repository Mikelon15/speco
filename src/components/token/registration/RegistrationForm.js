import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, Input, InputLabel, FormHelperText, Button, CircularProgress } from '@material-ui/core';
import styles from '../styles';


class RegistrationForm extends React.Component {
  render() {
    let { user, onChange, classes, valid, onSubmit, fetching } = this.props;
    return (
      <div>
        <form onSubmit={onSubmit} className={classes.form}>
          <FormControl className={classes.input} error={(valid.email === "") ? false : true} margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              value={user.email}
              onChange={onChange}
              id="email"
              name="email"
              autoComplete="email"
            />
            <FormHelperText>{valid.email}</FormHelperText>
          </FormControl>
          <FormControl className={classes.input} error={(valid.password === "") ? false : true} margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              value={user.password}
              onChange={onChange}
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormHelperText>{valid.password}</FormHelperText>
          </FormControl>
          <FormControl className={classes.input} error={(valid.confirm === "") ? false : true} margin="normal" required fullWidth>
            <InputLabel htmlFor="confirm">Password</InputLabel>
            <Input
              value={user.confirm}
              onChange={onChange}
              name="confirm"
              type="password"
              id="confirm"
              autoComplete="current-password"
            />
            <FormHelperText>{valid.confirm}</FormHelperText>
          </FormControl>
          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            variant="raised"
            color="primary"
            style={{ float: 'right' }}
            onClick={onSubmit}>

            {(fetching) ? <CircularProgress style={{ color: 'white' }} /> : "SIGN IN"}
          </Button>
        </form>
      </div>
    );
  }
}

RegistrationForm.propTypes = {
  user: PropTypes.object.isRequired,
  valid: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(RegistrationForm);
