import React from 'react'
import { connect } from 'react-redux';
import Shelf from '../components/Shelf';
import AddJournal from './AddJournal';
import { selectJournal, selectEntryHelper, deselectJournal } from '../actions';
import { Button, Grid, Paper } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import './library.css';


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
      selectedEntry: state.entries.selected,
  }
}

const mapDispatchToProps = dispatch => {
    return {
        deselectJournal : () => {
            dispatch(deselectJournal())
        },
        selectJournal : key => {
            dispatch(selectJournal(key))
        },
        selectEntry : key => {
            dispatch(selectEntryHelper(key))
        },
    }
  };


class Library extends React.Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this);
      }
    // this allows the nav to go back to journal list
    handleClick(event) {
        this.props.deselectJournal();
        event.preventDefault();
    }
    render(){
      // state  varibles
      let { journals, entries, selectedEntry, selectedJournal } = this.props;

      // action variables
      let {selectJournal, selectEntry } = this.props;
  
      // show journal or entries depending on which location user is at
      let items = (selectedJournal === "") ? journals : entries;
      let selectItem = (selectedJournal === "") ? selectJournal : selectEntry;
      let selectedItem = (selectedEntry === "") ? selectedJournal : selectedEntry;
  
        return(
            <div className="library">
                <Grid className="controls" > 
                    <Button className="home" onClick={this.handleClick}> <HomeIcon /> </Button>
                    <AddJournal className="add" />
                </Grid> 
                
                <Shelf 
                items={items} 
                selected={selectedItem} 
                onClickAction={selectItem}
                />          
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Library); 