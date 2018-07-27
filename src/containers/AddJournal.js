import React from 'react'
import { connect } from 'react-redux'
import { addNewJournal, addNewEntry } from '../actions'
// import { FormGroup, FormControl, Button } from 'react-bootstrap'

const mapStateToProps = state => {
  return {
    selectedJournal: state.journal.selected
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addNewJournal: (name) => {
      dispatch(addNewJournal(name))
    },
    addNewEntry: (journalKey, name) => {
      dispatch(addNewEntry(journalKey, name))
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
      let { selectedJournal } = this.props;
      if(selectedJournal === "")
        this.props.addNewJournal(this.state.value)
      else
        this.props.addNewEntry(selectedJournal, this.state.value)
      this.setState({value: ''})
      event.preventDefault();
    }

    render() {
      return (
          <form onSubmit={ this.handleSubmit }>
          <label>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Add Journal" />
        </form>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddJournal)
