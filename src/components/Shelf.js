import React from 'react';
import PropTypes from 'prop-types';
import Item from '../components/Item';
import { ListGroup } from 'react-bootstrap';

class Shelf extends React.Component{
  render(){
    const { items, selected, onClickAction  } = this.props;
    return (
        <div>
          <ListGroup>
            { items.map((e, index) => {
              //check if the entry is the selected one and mark as active
              e.active = (e.key === selected)
              if (e.key === selected){
                console.log("FOUND")
              }
              //return the Item Component
              return (<Item key={e.key} {...e} onClick={(event) => {onClickAction(e.key); event.preventDefault(); }}/>)
            })}
          </ListGroup>
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

export default Shelf
