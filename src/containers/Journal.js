import React from 'react'
import {connect } from 'react-redux';
import { fetchUserJournals, selectJournalHelper, deselectJournalHelper } from '../actions';
import Shelf from '../components/Shelf';
import Location from '../components/Location';

const mapStateToProps = state => {
    return {
      journals: state.journal.journals.map(e => {
        return {
          title: e.title,
          key: e.key
      }}),
      selected: state.journal.selected
  }
}

const mapDispatchToProps = dispatch => {
  dispatch(fetchUserJournals())
  return {
    selectJournal : key => {
      dispatch(selectJournalHelper(key))
    },
    deselectJournal : () => {
      dispatch(deselectJournalHelper())
    }
  }
};


class Journal extends React.Component{
  render(){
    let { journals, selected, selectJournal, deselectJournal } = this.props;
    let items = journals;
    return(
      <div>
        <Location journal={selected} />
        <Shelf items={items} selected={selected} onClickAction={selectJournal}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Journal);
