import React from 'react';
import PropTypes from 'prop-types';


class LoginForm extends React.Component {
  state = {value: 'Woof'};

  render() {
    let { user, onChange } = this.props;
    return (
      <div>
       <input
          label = 'email'
          placeholder = 'enter email'
          name  ='email'
          onChange={onChange}
          value={user.email} />
        <input
          label = 'password'
          placeholder = 'enter password'
          name  ='password'
          type  ='password'
          onChange={onChange}
          value={user.password} />
      </div>
    );
  }
}

LoginForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default LoginForm;
