import React from 'react';
import PropTypes from 'prop-types';
import Entry from './Entry';
import { ListGroup, Button } from 'react-bootstrap';

const EntryList = ({ entries, onClickAction, onSignout  }) => (
  <div>
    <ListGroup> EntryList
        {
          entries.map((title, key) => (
          <Entry key={key} {...title} onClick={() => onClickAction(key)}/>
        ))}
    </ListGroup>
    <Button onClick={ e => {e.preventDefault(); onSignout()}}> Signout </Button>
  </div>
)

EntryList.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onClickAction: PropTypes.func.isRequired
}

export default EntryList
