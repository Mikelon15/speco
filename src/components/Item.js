import React from 'react';
import PropTypes from 'prop-types';

const Entry = ({ onClick, title, active}) => (
  <il className={active ? "active" : ""} onClick={onClick} >
    {title}
  </il>
)

Entry.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default Entry
