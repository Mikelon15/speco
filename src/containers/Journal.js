import React from 'react'
import { connect } from 'react-redux';
import { fetchUserJournals, selectJournal, deselectJournal, selectEntryHelper } from '../actions';
import Shelf from '../components/Shelf';
import AddJournal from './AddJournal';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';

const mapStateToProps = state => {
    return {
      journals: state.journal.journals.map(j => {
        return {
          title: j.title,
          key: j.key
      }}),
      entries: state.entries.entries.map(e => {
        return {
          title: e.title,
          key: e.key
      }}),
      selectedJournal: state.journal.selected,
      selectedEntry: state.entries.selected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectJournal : key => {
      dispatch(selectJournal(key))
    },
    selectEntry : key => {
      dispatch(selectEntryHelper(key))
    },
    deselectJournal : () => {
      dispatch(deselectJournal())
    },
    fetchJournals : () => {
      dispatch(fetchUserJournals())
    }
  }
};


class Journal extends React.Component{
  state = {
    value: 'home'
  };
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }
  
  // fetch list of journals when component loads 
  componentWillMount(){
    this.props.fetchJournals();
  }

  // this allows the nav to go back to journal list
  handleClick(event) {
    this.props.deselectJournal();
    event.preventDefault();
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }
  render(){
    // state  varibles
    let { journals, entries, selectedEntry, selectedJournal } = this.props;
    let { value } = this.state;
    // action variables
    let {selectJournal, selectEntry } = this.props;

    // show journal or entries depending on which location user is at
    let items = (selectedJournal === "") ? journals : entries;
    let selectItem = (selectedJournal === "") ? selectJournal : selectEntry;
    let selectedItem = (selectedEntry === "") ? selectedJournal : selectedEntry;

    return(
      <div>
        <AddJournal />
        <button 
          onClick={this.handleClick}>
           HOME 
        </button>
        <Shelf 
          items={items} 
          selected={selectedItem} 
          onClickAction={selectItem}
        />
        <BottomNavigation
          value={ value }
          showLabels
          onChange={this.handleChange}
        >
          <BottomNavigationAction 
           value="home"
           label="Home"></BottomNavigationAction>
          <BottomNavigationAction                         
            value="journals"
            label="Journals"></BottomNavigationAction>
          <BottomNavigationAction 
            value="entry"
            label="Entry"></BottomNavigationAction>
        </BottomNavigation>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Journal);
