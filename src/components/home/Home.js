import React from 'react'
import { Typography, Grid, withStyles } from '@material-ui/core';
import quotes from './quotes.json'

const styles = theme => ({
    time: {
        color: 'white',
        textShadow: '2px 2px 2px black',
        margin: '100px'
    },
    text: {
        color: 'white',
        textShadow: '2px 2px 3px black'
    },
    author: {
        color: 'white',
        textShadow: '2px 2px 3px black',
        margin: '5px',
        float: 'right'
    }
})

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
                      variant="display4" >
                        { time }
                    </Typography>   

                    {/* This is the quote section */}
                    <Typography className={classes.text} variant="display2">
                        {quote.quoteText}
                    </Typography>
                    <br/>
                    <Typography className={classes.author} variant="display1">
                        {quote.quoteAuthor}
                    </Typography> 
                </Grid>
            </div>
        )
    }
}


export default withStyles(styles)(Home)