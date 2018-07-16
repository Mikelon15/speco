import React from 'react';
import PropTypes from 'prop-types';
import Entry from './Entry';
import { ListGroup, Button } from 'react-bootstrap';

const EntryList = ({ entries, selected, onClickAction, onSignout  }) => (
  <div>
    <ListGroup> EntryList
        {
          entries.map((e, index) => {
            //check if the entry is the selected one and mark as active
            e.active = (e.key === selected)
            //return the Entry Component
            return (<Entry key={e.key} {...e} onClick={() => onClickAction(e.key)}/>)
          })
        }
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
  selected: PropTypes.string.isRequired,
  onClickAction: PropTypes.func.isRequired
}

export default EntryList
