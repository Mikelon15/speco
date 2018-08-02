import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'react-bootstrap';

const Entry = ({ onClick, title, active}) => (
  <ListGroupItem className={active ? "active" : ""} onClick={onClick} >
    {title}
  </ListGroupItem>
)

Entry.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default Entry