
class SliderButton extends React.Component{
    render(){
        let { onExpand, icon, variant, color, onClick}
        return (
            <Button
            onMouseEnter={this.changeColor}
            onMouseLeave={this.changeColor} style={{ marginRight: '5px', borderRadius: '45px' }}
            onClick={this.handleClick}
            variant="contained"
            color="primary" >
            <Transition
              in={this.state.hover}
              timeout={100}
              appear={true}
            >
              {state =>
                <Typography style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}>
                  Add new {(this.props.selectedJournal) ? ("ENTRY") : ("JOURNAL")}
                </Typography>
              }
            </Transition>
            <AddIcon />
          </Button>
        )
    }
}
       