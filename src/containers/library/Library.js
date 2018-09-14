import React from 'react';
import { connect } from 'react-redux';
import { Slide, Button, Grid, Typography, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import Empty from '../../media/empty.png';
import AddJournal from './AddJournal';

// my own component imports 
import Item from '../../components/Item';

// actions 
import { selectJournal, selectEntry, deselectJournal, setUserLocation, editJournalTitle } from '../../actions';

//styling
import './library.css';


const mapStateToProps = state => {
    return {
        journals: state.journal.journals.map(j => {
            return {
                title: j.title,
                key: j.key,
                time: j.time
            }
        }),
        entries: state.entries.entries.map(e => {
            return {
                title: e.title,
                key: e.key,
                time: e.time
            }
        }),
        selectedJournal: state.journal.selected,
        selectedEntry: state.entries.selected,
        fetchingJournals: state.journal.fetching,
        fetchingEntries: state.entries.fetching
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deselectJournal: () => {
            dispatch(deselectJournal())
        },
        selectJournal: key => {
            dispatch(selectJournal(key))
        },
        selectEntry: key => {
            dispatch(selectEntry(key))
            dispatch(setUserLocation('entry'))
        },
        onChangeJournalTitle: (title, key) => {
            dispatch(editJournalTitle(title, key))
        }
    }
};


class Library extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }
    // this allows the nav to go back to journal list
    handleClick(event) {
        this.props.deselectJournal();
        event.preventDefault();
    }
    render() {
        // state  varibles
        let { journals, entries, selectedEntry, selectedJournal, fetchingJournals, fetchingEntries } = this.props;

        // action variables
        let { selectJournal, selectEntry, onChangeJournalTitle } = this.props;

        // show journal or entries depending on which location user is at
        let items = (selectedJournal === "") ? journals : entries;
        let selectItem = (selectedJournal === "") ? selectJournal : selectEntry;
        let selectedItem = (selectedEntry === "") ? selectedJournal : selectedEntry;
        let selectedJournalName = journals.map(obj => {
            if (selectedJournal === obj.key) {
                return obj.title
            } return "";
        })
        let itemType = (selectedJournal === "") ? "journals" : "entries"
        let isFetching = (selectedJournal === "") ? fetchingJournals : fetchingEntries;

        let itemDisplay =
            ((items.length !== 0) ?
                <Item
                    onChangeJournalTitle={onChangeJournalTitle}
                    items={items}
                    selected={selectedItem}
                    onClickAction={selectItem}
                />
                :
                <div>
                    <img src={Empty}
                        height="200" width="200" alt=""></img>
                    <Typography variant='subheading'> No {itemType} found </Typography>
                    <br />
                </div>
            )

        return (
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <div className="library">
                    <Grid className="controls" >
                        <Button style={{ padding: '2px', minWidth: '48px', }} className="home" onClick={this.handleClick}> <LibraryBooksIcon /> </Button>
                        {(selectedJournal) &&
                            (<Typography variant='title' style={{ verticalAlign: 'middle', padding: '2%', display: 'inline-flex', paddingLeft: '0' }}>
                                >   {selectedJournalName}
                            </Typography>)
                        }
                        <AddJournal className="add" />
                    </Grid>
                    {(isFetching) ? <CircularProgress /> : itemDisplay}
                </div>
            </Slide>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Library); 