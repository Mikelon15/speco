import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginTop: '5px',
    marginBottom: '5px',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200
  }
});

class LoginForm extends React.Component {
  render() {
    let { user, onChange, classes } = this.props;
    return (
      <div>
       <TextField
          className={classes.textField}
          label = 'email'
          placeholder = 'enter email'
          name  ='email'
          onChange={onChange}
          value={user.email} />
        <TextField
          className={classes.textField}
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

export default withStyles(styles)(LoginForm);
