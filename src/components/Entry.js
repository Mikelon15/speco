import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'react-bootstrap';

const Entry = ({ onClick, name, id, active}) => (
  <ListGroupItem className={active ? "active" : ""} onClick={onClick} >
    {id}: {name}
  </ListGroupItem>
)

Entry.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired
}

export default Entry
