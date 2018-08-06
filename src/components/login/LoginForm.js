import React from 'react';
import PropTypes from 'prop-types';

import TextField, {Input} from '@material/react-text-field';

class LoginForm extends React.Component {
  state = {value: 'Woof'};

  render() {
    let { saving, user, onChange } = this.props;
    return (
    <div>
        <br/>
        <TextField
           className='long-text-field'
           label='Email'
         >
           <Input
             name='email'
             onChange={onChange}
             value={user.email}
           />
         </TextField>
          <br/>
         <TextField
           className='long-text-field'
            label='Password'
          >
            <Input
              name='password'
              type='password'
              onChange={onChange}
              value={user.password}
            />
          </TextField>
          <br/>
    </div>
    );
  }
}

LoginForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default LoginForm;
