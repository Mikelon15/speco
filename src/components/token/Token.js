import React, { Component } from 'react';
import LogIn from './login/LoginPage';
import SignUp from './registration/RegistrationPage';
import { Grid, Paper, withStyles } from '@material-ui/core';
import './Token.css';
import Styles from "./styles";


class Token extends Component {
    render() {
        let { onSignUp, onSignIn, toggleUserSubscribing,
            classes, subscribing, error, fetching } = this.props;
        let errorMsg = (error) ? error : "";
        let authType = (subscribing) ?
            (<SignUp
                error={errorMsg}
                onSubmit={onSignUp}
                toggle={toggleUserSubscribing}
                fetching={fetching} />) :
            (<LogIn
                error={errorMsg}
                toggle={toggleUserSubscribing}
                onSubmit={onSignIn}
                fetching={fetching} />)
        return (
            <Grid className="grid-container" container>
                <Grid item xs={2} md={4}></Grid>
                <Grid item md={4} xs={8}>
                    <Paper className={classes.paper}>
                        <h1 className="logo">speco</h1>
                        {authType}
                    </Paper>
                </Grid>
                <Grid item xs={2} md={4}></Grid>
            </Grid>
        )
    }
}

export default withStyles(Styles)(Token);
