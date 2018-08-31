import React from 'react';
import { connect } from 'react-redux';
import { Input, Button } from '@material-ui/core';
import './library.css'
import { addNewJournal, addNewEntry } from '../../actions';

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
        <div className="add">
          <Input
            placeholder="add new item"
            value={this.state.value}
            onChange={this.handleChange}
            name="new"
            type="text"
            id="new"
          />
          <Button onClick={ this.handleSubmit } variant="contained" color="primary" > Add </Button>
        </div>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddJournal)
