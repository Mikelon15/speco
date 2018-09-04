import React from 'react'
import { connect } from 'react-redux';
import { Button, Grid, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

// my own component imports 
import Item from '../../components/Item';
import AddJournal from '../library/AddJournal';

// actions 
import { selectJournal, selectEntryHelper, deselectJournal, setUserLocation } from '../../actions';

//styling
import './library.css';


const mapStateToProps = state => {
    return {
      journals: state.journal.journals.map(j => {
        return {
          title: j.title,
          key: j.key,
          time: j.time
      }}),
      entries: state.entries.entries.map(e => {
        return {
          title: e.title,
          key: e.key,
          time: e.time
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
            dispatch(setUserLocation('entry'))
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
                
                <Item 
                items={items} 
                selected={selectedItem} 
                onClickAction={selectItem}
                />          
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Library); 