import React from 'react';
import { withStyles } from '@material-ui/core';
import { Button, Popper, Grow, Paper, MenuList, MenuItem, ClickAwayListener } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';

const styles = theme => ({
    root: {
        borderRadius: '100%',
        minWidth: '40px',
        maxWidth: '40px',
        height: '40px',
        margin: '5px'
    }
})

class Settings extends React.Component {
    state = { open: false }

    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }
        this.setState({ open: false });
    };

    render() {
        let { open } = this.state;
        let { signout, classes } = this.props;
        console.log(signout)
        return (
            <div>
                <Button
                    variant='contained'
                    className={classes.root}
                    buttonRef={node => {
                        this.anchorEl = node;
                    }}
                    aria-owns={(open) ? 'menu-list-grow' : null}
                    aria-haspopup="true"
                    onClick={this.handleToggle}
                    style={{ float: 'right' }}>
                    <SettingsIcon />
                </Button>
                <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            id="menu-list-grow"
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    <MenuList>
                                        <MenuItem onClick={signout}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        )
    }
}

export default withStyles(styles)(Settings); 