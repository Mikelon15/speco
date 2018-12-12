import React from 'react';
import { connect } from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import './library.css'
import { addNewJournal, addNewEntry } from '../../actions';
import Transition from 'react-transition-group/Transition';
import { DialogActions, DialogContent, Dialog, TextField, DialogTitle } from '@material-ui/core';

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
    this.state = { value: '', hover: false, adding: false, newJournal: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeJournalName = this.changeJournalName.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    let { selectedJournal } = this.props;
    if (selectedJournal === "")
      this.props.addNewJournal(this.state.newJournal)
    else
      this.props.addNewEntry(selectedJournal, this.state.newJournal)
    this.setState({ newJournal: '', adding: false })
    event.preventDefault();
  }
  changeColor() {
    this.setState({ hover: !this.state.hover })
    this.setState({ newJournal: '' })
  }
  handleClick() {
    if (!this.props.selectedJournal) {
      this.setState({ adding: !this.state.adding })
      this.setState({ newJournal: '' })
    } else {
      this.props.addNewEntry(this.props.selectedJournal, this.state.newJournal)
    }
  }
  changeJournalName(e) {
    this.setState({ newJournal: e.target.value })
  }
  render() {

    let defaultStyle = {
      transition: `width .15s ease-in-out`,
      width: '150px',
      maxHeight: '24px',
      color: 'white',
      overflow: 'hidden'
    }

    let transitionStyles = {
      entering: { width: '0px', color: 'none' },
      entered: { width: '150px' },
      exiting: { width: '150px' },
      exited: { width: '0px' },
    };

    return (
      <div className="add">
        <Button
          style={{ float: 'right', padding: 'none', margin: 'none' }}
          onMouseEnter={this.changeColor}
          onMouseLeave={this.changeColor} style={{ marginRight: '5px', borderRadius: '45px' }}
          onClick={this.handleClick} 
          variant="contained"
          color="primary" >
          <Transition
            in={this.state.hover}
            timeout={100}
            appear={true}
          >
            {state =>
              <Typography style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}>
                Add new {(this.props.selectedJournal) ? ("ENTRY") : ("JOURNAL")}
              </Typography>
            }
          </Transition>
          <AddIcon />
        </Button>


        <Dialog
          open={this.state.adding}
          onClose={this.handleClick}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add new {(this.props.selectedJournal) ? ("ENTRY") : ("JOURNAL")}</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="New Journal"
                type="text"
                fullWidth
                value={this.state.newJournal}
                onChange={this.changeJournalName}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClick} color="secondary">
              cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              ADD
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddJournal)
