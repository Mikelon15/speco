import React from 'react'

class Location extends React.Component{
  render(){
    let { journal } = this.props;
    let location = (journal === "") ?
                  (<div><button>Home</button></div>) :
                  (<div> <button>Home</button> > <button>{journal}</button> </div>)
    return (location)
  }
}

export default Location;
