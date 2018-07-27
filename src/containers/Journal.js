import React from 'react'
import { connect } from 'react-redux';
import { fetchUserJournals, selectJournal, deselectJournal } from '../actions';
import Shelf from '../components/Shelf';
// import Location from '../components/Location';
import AddJournal from './AddJournal';

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
    deselectJournal : () => {
      dispatch(deselectJournal())
    },
    fetchJournals : () => {
      dispatch(fetchUserJournals())
    }
  }
};


class Journal extends React.Component{
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount(){
    this.props.fetchJournals();
  }
  handleClick(event) {
    this.props.deselectJournal();
    event.preventDefault();
  }
  render(){
    // state  varibles
    let { journals, entries, selectedEntry, selectedJournal } = this.props;
    // action variables
    let {selectJournal } = this.props;
    // show journal or entries depending on which location user is at
    let items = (selectedJournal === "") ? journals : entries;
    return(
      <div>
        <AddJournal />
        <button onClick={this.handleClick}> HOME </button>
        <Shelf items={items} selected={selectedJournal} onClickAction={selectJournal}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Journal);
