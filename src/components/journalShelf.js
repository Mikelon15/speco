import React, { Component } from 'react';
import logo from './public/favicon-16x16.png';
import './journalShelf.css';

class journalShelf extends Component{
  constructor(props){
    super(props);
    this.state = {
      journalList : [
        'personal',
        'pro',
        'feels'
      ]
    }
  }
  render(){
    return (
      <div>
        <h2> Journal List </h2>
        <ul>
          {journalList}
        </ul>
      </div>
    );
  }
}

export default journalShelf;
