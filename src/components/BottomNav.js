import React from 'react';
import { withStyles } from '@material-ui/core';

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

const styles = (themes) => ({
    root: {
        boxShadow: '0px - 3px 15px grey',
        bottom: '0',
        width: '100vw',
        position: 'fixed',
        backgroundColor: 'transparent',
    },
    item: {
        backgroundColor: '#fffcf7eb',
    },
    left: {
        backgroundColor: '#fffcf7eb',
        borderTopLeftRadius: '10px'
    },
    right: {
        backgroundColor: '#fffcf7eb',
        borderTopRightRadius: '10px'
    }
})


class BottomNav extends React.Component {
    render() {
        let { location, handleChange, classes } = this.props;
        return (
            <BottomNavigation
                className={classes.root}
                value={location}
                showLabels
                onChange={handleChange}
            >
                <BottomNavigationAction
                    className={classes.left}
                    value="home"
                    label="Home"
                    icon={<HomeIcon />}
                />
                <BottomNavigationAction
                    className={classes.right}
                    value="journals"
                    label="Journals"
                    icon={<LibraryBooksIcon />}
                />
                {/* <BottomNavigationAction
                    className={classes.right}
                    value="entry"
                    label="Entry"
                    icon={<LibraryAddIcon />} /> */}
            </BottomNavigation>
        )
    }

}

export default withStyles(styles)(BottomNav);