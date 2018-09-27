import React from 'react';
import PropTypes from 'prop-types';
import {
  MenuList, MenuItem, withStyles, Typography, Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField
} from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    overflow: 'auto',
    maxHeight: '350px'
  },
  list: {
    backgroundColor: 'white'
  },
  title: {
    float: 'left',
    width: '45%'
  },
  time: {
    float: 'right',
    width: '55%',
    textAlign: 'right',
    color: '#8a8176'
  },
  dialog: {
    minWidth: '350px'
  }
})

class Shelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      selectedTitle: "",
      selected: 0,
      editing: false,
      delete: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteJournal = this.deleteJournal.bind(this)
    this.handleListItemClick = this.handleListItemClick.bind(this);
    this.changeJournalName = this.changeJournalName.bind(this);
    this.confirmDeleteJournal = this.confirmDeleteJournal.bind(this);
  }
  handleListItemClick = (index) => {
    this.setState({ selectedIndex: index });
  };
  editItem(item, index) {
    this.setState({ selected: item })
    this.setState({ selectedTitle: item.title })
    this.setState({ editing: true })
  }

  toggleEdit() {
    this.setState({ editing: !this.state.editing })
  }

  changeJournalName(e) {
    this.props.onChangeJournalTitle(e.target.value, this.state.selected.key)
    this.setState({ selectedTitle: e.target.value })
  }

  deleteJournal() {
    this.setState({ editing: !this.state.editing })
    this.setState({ delete: !this.state.delete })
  }
  confirmDeleteJournal() {
    this.props.deleteJournal(this.state.selected.key)
    this.setState({ delete: !this.state.delete })
  }
  render() {
    const { items, onClickAction, selected, classes } = this.props;
    return (
      <div>
        <MenuList className={classes.root} component="nav">
          {items.map((e, index) => {
            //check if the entry is the selected one and mark as active
            return (
              <MenuItem
                key={e.key}
                selected={(e.key === selected)}
                dense
                button
                onClick={(event) => {
                  this.handleListItemClick(index)
                  onClickAction(e.key);
                  event.preventDefault();
                }}>
                <Typography className={classes.title}>
                  {e.title}
                </Typography>
                <Typography className={classes.time}>
                  {e.time}
                </Typography>
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    this.editItem(e)
                  }}>
                  <MoreVertIcon />
                </Button>
              </MenuItem>
            )
          })}
        </MenuList>

        <Dialog
          open={this.state.editing}
          onClose={this.toggleEdit}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit</DialogTitle>
          <DialogContent
            className={classes.dialog}>
            <form onSubmit={(e) => { e.preventDefault(); this.toggleEdit(); }}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="name"
                type="text"
                fullWidth
                value={this.state.selectedTitle}
                onChange={this.changeJournalName}
              />
            </form>
          </DialogContent>
          <DialogActions style={{ justifyContent: 'space-between' }}>
            <Button
              variant='contained'
              onClick={this.deleteJournal}
              color="secondary">
              <DeleteIcon />
              Delete
              </Button>
            <Button onClick={this.toggleEdit} color="primary">
              Done
              </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.delete}
          onClose={this.deleteJournal}>
          <DialogTitle
            className={classes.dialog} color="secondary">Are you sure?</DialogTitle>
          <DialogContent>
            Deleting the journal will also delete the entries it contains
            </DialogContent>
          <DialogActions>
            <Button onClick={this.confirmDeleteJournal} color="secondary">Yes</Button>
            <Button onClick={this.deleteJournal} color="primary">No</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

Shelf.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  selected: PropTypes.string.isRequired,
  onClickAction: PropTypes.func.isRequired
}

export default withStyles(styles)(Shelf)
