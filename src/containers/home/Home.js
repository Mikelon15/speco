import React from 'react';
import { Typography, Grid, withStyles } from '@material-ui/core';
import quotes from '../../media/quotes';
import styles from './styles';

let timer;

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            quote: "",
            time: "",
            updating: true
        }
        this.timer = null;
        this.startClock = this.startClock.bind(this);
    }
    componentDidMount() {
        this.startClock();
        let index = Math.floor(Math.random() * 1640);
        this.setState({ quote: quotes[index], updating: true });
        timer = setInterval(this.startClock, 5000);
    }
    startClock() {
        let t = new Date();
        this.setState({ time: t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
    }
    componentWillUnmount() {
        clearInterval(timer)
    }
    render() {
        let { quote, time } = this.state;
        let { classes } = this.props;
        return (
            <div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Typography
                        className={classes.time}
                        variant="display3" >
                        {time}
                    </Typography>

                    {/* This is the quote section */}
                    <Grid item xs={8} sm={12} className={classes.quote}>
                        <Typography className={classes.text} variant="title">
                            {quote.quoteText}
                        </Typography>
                        <br />
                        <Typography className={classes.author} variant="subheading">
                            {quote.quoteAuthor}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


export default withStyles(styles)(Home)