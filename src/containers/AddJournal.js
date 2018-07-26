import React from 'react'
import { connect } from 'react-redux'
import { addNewJournal } from '../actions'
// import { FormGroup, FormControl, Button } from 'react-bootstrap'

const mapStateToProps = state => {
  return {

  }
}
const mapDispatchToProps = dispatch => {
  return {
    add: (name) => {
      dispatch(addNewJournal(name))
    }
  }
}
class AddJournal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      this.props.add(this.state.value)
      this.setState({value: ''})
      event.preventDefault();
    }

    render() {
      return (
          <form onSubmit={ this.handleSubmit }>
          <label>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddJournal)
