import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, FormControl, Input, InputLabel, Button, CircularProgress } from '@material-ui/core';
import styles from '../styles';

class LoginForm extends React.Component {
  render() {
    let { user, onChange, onSubmit, classes, valid, fetching } = this.props;
    console.log('fetching', fetching)
    return (
      <div>
        <form onSubmit={onSubmit} className={classes.form}>
          <FormControl error={!valid} margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              value={user.email}
              onChange={onChange}
              id="email"
              name="email"
              autoComplete="email"
              autoFocus />
          </FormControl>
          <FormControl error={!valid} margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              value={user.password}
              onChange={onChange}
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
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

LoginForm.propTypes = {
  valid: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(LoginForm);
