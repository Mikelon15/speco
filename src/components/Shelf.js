import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, Checkbox, withStyles } from '@material-ui/core';

const styles = theme => ({
  list: {
    backgroundColor: 'white',
    color: 'green'
  }
})

class Shelf extends React.Component{
  render(){
    //     const { selected } = this.props;
    const { items, onClickAction  } = this.props;
    return (
        <div>
          <List className={this.props.classes.list}>
            { items.map((e, index) => {
              //check if the entry is the selected one and mark as active
              // e.active = (e.key === selected)
              // if (e.key === selected){
              //   console.log("FOUND")
              // }
              //return the Item Component
              return (
                <ListItem
                  key={e.key}
                  {...e}
                  dense
                  button
                  onClick={(event) => {
                    onClickAction(e.key);
                    event.preventDefault();
                  }}
                > 
                  <Checkbox
                    tabIndex={-1}
                    disableRipple
                  />
                  {e.title}
                </ListItem>
              )
            })}
          </List>
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
