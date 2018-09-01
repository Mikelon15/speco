import React from 'react';
import PropTypes from 'prop-types';
import { MenuList, MenuItem, withStyles, Typography } from '@material-ui/core';

const styles = theme => ({
  list: {
    backgroundColor: 'white'
  },
  title: {
    float: 'left',
    width: '45%'
  },
  time: {
    float: 'right',
    width: '45%'

  }

})

class Shelf extends React.Component{
  state = {
    selectedIndex: 1,
  };

  handleListItemClick = (index) => {
    this.setState({ selectedIndex: index });
  };

  render(){
    //     const { selected } = this.props;
    const { items, onClickAction, selected, classes  } = this.props;
    console.log(selected)
    return (
      
        <div>
          <MenuList component="nav">
            { items.map((e, index) => {
            //check if the entry is the selected one and mark as active
            console.log(index, (index === 1))
              return (
                <MenuItem
                  key={e.key} 
                  selected={(e.key === selected) }
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
                </MenuItem>
              )
            })}
          </MenuList>
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
