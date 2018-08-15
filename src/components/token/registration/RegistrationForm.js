import React from 'react';
import TextInput from '../common/TextInput';
import { withStyles, TextField } from '@material-ui/core';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

const RegistrationForm = ({user, onSave, onChange, saving}) => {
  return (
    <form>
      <h1>Create account</h1>
      <TextField
        name="email"
        label="Email"
        onChange={onChange}
        value={user.email}
        />

      <TextField
        name="password"
        label="Password"
        onChange={onChange}
        value={user.password}
        />

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Signing up...' : 'Sign Up'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

RegistrationForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  user: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default withStyles(styles)(RegistrationForm);
