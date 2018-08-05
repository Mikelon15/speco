import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import './login.css'

const LoginForm = ({user, onSave, onChange, saving}) => {
  return (
    <form>
      <h3>Login</h3>
      <TextInput
        placeholder="Email"
        name="email"
        id="email"
        type="text"
        label="Email"
        onChange={onChange}
        value={user.email}
        />
      <TextInput
        placeholder="Password"
        name="password"
        id="password"
        type="password"
        label="Password"
        onChange={onChange}
        value={user.password}
        />
      <button
        id="loginButton"
        type="submit"
        disabled={saving}
        onClick={onSave}
        >
          {saving ? 'Logining in...' : 'Login'}
        </button>
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
