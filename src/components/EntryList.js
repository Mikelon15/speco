import React from 'react';
import PropTypes from 'prop-types';
import Entry from './Entry';
import { ListGroup, Button } from 'react-bootstrap';

const EntryList = ({ entries, selected, onClickAction, onSignout  }) => (
  <div>
    <ListGroup> EntryList
        {
          entries.map((entry, index) => (
          <Entry key={index} {...entry} onClick={() => onClickAction(index)}/>
        ))}
    </ListGroup>
    <Button onClick={ e => {e.preventDefault(); onSignout()}}> Signout </Button>
  </div>
)

EntryList.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  selected: PropTypes.number.isRequired,
  onClickAction: PropTypes.func.isRequired
}

export default EntryList
