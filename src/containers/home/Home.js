import React from 'react';
import { Typography, Grid, withStyles } from '@material-ui/core';
import quotes from '../../media/quotes';
import styles from './styles';

class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            quote : "",
            time: "",
            updating: true
        }
        this.startClock = this.startClock.bind(this);
    }
    componentDidMount() {
        let index = Math.floor(Math.random() * 1640); 
        this.setState({quote: quotes[index], updating: true}); 
        this.startClock(); 
    }
    startClock(){        
        if(!this.state.updating) return; 
        let t = new Date(); 
        this.setState({time: t.toLocaleTimeString()});
        setTimeout(this.startClock, 100);
    }
    componentWillUnmount(){
        this.setState({updating: false});
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
                        { time }
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