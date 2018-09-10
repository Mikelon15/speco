import React, { Component } from 'react';
import { withStyles, Input, Typography } from '@material-ui/core'
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import './editorstyle.css';

const styles = {
    root: {
        backgroundColor: '#f5f5f5cc',
        marginTop: '15%',
        borderRadius: '10px',
        height: '550px'
    },
    header: {
        padding: '7px',
        paddingBottom: '0'
    },
    time: {
        float: 'right',
        width: '60%',
        position: 'absolute',
        top: '0',
        right: '0',
        textAlign: 'right',
        padding: '5px',
        color: '#92928d',
        fontSize: '.7em'
    },
    editor: {
        height: '200px'
    },
    addButton: {
        position: 'absolute',
        bottom: '100px',
        right: '20px'
    }
}
/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
const modules = {
    toolbar: [
        [{ 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', { color: [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'color'
]

class EntryEditor extends Component {
    render() {
        const { title, time, classes, text, changeEntryTitle, onChangeAction } = this.props;

        let placeholder = 'write your epic...'

        return (
            <div className={classes.root}>
                <div className={classes.header}>
                    <Input
                        className={classes.title}
                        placeholder="enter title"
                        fullWidth
                        value={title}
                        onChange={changeEntryTitle}>
                    </Input>
                </div>
                <Typography className={classes.time}> {time}  </Typography>
                <ReactQuill
                    theme="snow"
                    onChange={(e) => onChangeAction(e)}
                    value={text}
                    modules={modules}
                    formats={formats}
                    placeholder={placeholder}
                />
            </div>
        )
    }
}
export default withStyles(styles)(EntryEditor);
