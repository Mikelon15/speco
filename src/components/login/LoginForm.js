import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import {TextField, Button} from '@material-ui/core';
import './login.css'

const LoginForm = ({user, onSave, onChange, saving}) => {
  return (
    <form>
      <h3>Login</h3>
      <TextField
        placeholder="Email"
        name="email"
        id="email"
        type="text"
        label="Email"
        margin="dense"
        fullWidth
        onChange={onChange}
        value={user.email}
        />
      <TextField
      
        placeholder="Password"
        name="password"
        id="password"
        type="password"
        label="Password"
        margin="dense"
        fullWidth
        onChange={onChange}
        value={user.password}
        />
      <Button
        id="loginButton"
        type="submit"
        disabled={saving}
        onClick={onSave}
        >

          {saving ? 'Logining in...' : 'Login'}
        </Button>
    </form>
  );
};

LoginForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default LoginForm;
