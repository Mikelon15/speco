import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import './login.css'
const LoginForm = ({user, onSave, onChange, saving}) => {
  return (
    <form>
      <h3>Login</h3>
      <TextInput
        type="text"
        name="email"
        label="email"
        placeholder="Email"
        onChange={onChange}
        value={user.email}
        />
      <TextInput
        type="password"
        name="password"
        label="password"
        placeholder="Password"
        onChange={onChange}
        value={user.password}
        />

      <input
        id="loginButton"
        type="submit"
        disabled={saving}
        value={saving ? 'Logining in...' : 'Login'}
        className="btn btn-primary"
        onClick={onSave}/>
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
