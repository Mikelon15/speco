import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {signInWithEmailAndPassword, toggleUserSubscribing} from '../../actions/index';
import LoginForm from './LoginForm';

// import toastr from 'toastr';

export class RegistrationPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        name: "",
        email: "",
        password: ""
      },
      saving: false
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
    this.props.signInWithEmailAndPassword(this.state.user)
  }

  render() {
    return (
      <div>
        <LoginForm
          onChange={this.updateUserState}
          onSave={this.createUser}
          saving={this.state.saving}
          user={this.state.user}
        />
        <div id="toggleLogin">Dont have an account? <a href="" onClick={e=>{e.preventDefault(); this.props.toggleUserSubscribing()}}> Sign Up </a></div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {
    signInWithEmailAndPassword: user => {dispatch(signInWithEmailAndPassword(user))},
    toggleUserSubscribing: () => {
      dispatch(toggleUserSubscribing())
    }

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
