import React, { Component } from 'react';
import { withStyles, Input, Typography, Button } from '@material-ui/core'
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import './editorstyle.css';

const styles = (theme) => ({
    root: {
        backgroundColor: '#fffcf7eb',
        marginTop: '15vh',
        borderRadius: '10px',
        height: '70vh',
        position: 'relative'
    },
    header: {
        padding: '7px',
        paddingBottom: '0',
        minHeight: '15px'
    },
    editor: {
        height: '200px'
    },
    addButton: {
        position: 'absolute',
        bottom: '100px',
        right: '20px'
    },
    time: {
        fontSize: '10pt',
        float: 'right',
        position: 'relative',
        top: '0',
        right: '0',
        color: '#6f6f6f',
    },
    title: {
        background: 'none',
        border: 'none',
        fontSize: '12pt',
        fontFamily: 'roboto',
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    }
})
/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
const modules = {
    toolbar: [
        [{ 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', { color: [] }]
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
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'color'
]

class EntryEditor extends Component {
    render() {
        const { title, classes, text, changeEntryTitle, onChangeAction } = this.props;

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
                <ReactQuill
                    theme="snow"
                    onChange={(e) => onChangeAction(e)}
                    value={text}
                    modules={modules}
                    formats={formats}
                    placeholder={placeholder}
                />
                <Button variant="fab" className={classes.fab}>
                    new
                  </Button>
            </div>
        )
    }
}
export default withStyles(styles)(EntryEditor);
