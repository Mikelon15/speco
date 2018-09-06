import React, {Component} from 'react';
import {Editor, EditorState, Modifier, RichUtils, convertFromRaw, convertToRaw, getDefaultKeyBinding} from 'draft-js';
import 'draft-js/dist/Draft.css';
import './editorstyle.css';
import { Slide, Typography, Input, Button , MenuItem} from '@material-ui/core';
import Select from '@material/react-select'
import '@material/react-select/dist/select.css';

import AddIcon from '@material-ui/icons/Add';
import {styles, colorStyleMap } from './styles';
import ColorControls from "./ColorControls";


// editing icons 
import Bold from '@material-ui/icons/FormatBold';
import Italic from '@material-ui/icons/FormatItalic';
import Underline from '@material-ui/icons/FormatUnderlined';

import Quote from '@material-ui/icons/FormatQuote';
import OList from '@material-ui/icons/FormatListNumbered';
import UList from '@material-ui/icons/FormatListBulleted';

class EntryEditor extends Component {
  constructor(props) {
    super(props);

    if(this.props.text){
      this.state = { 
        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse( this.props.text)) )
      };
    } else {
      this.state = {editorState: EditorState.createEmpty()};
    }
    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      this.setState({editorState});
      console.log(editorState)
      if(editorState.getCurrentContent() !== undefined)
        this.props.onChangeAction(JSON.stringify( convertToRaw(editorState.getCurrentContent())));
    }
    // buttons bindings 
    this.toggleColor = (toggledColor) => this._toggleColor(toggledColor);
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);


  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  
  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }
  
  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  _toggleColor(toggledColor) {
    const {editorState} = this.state;
    const selection = editorState.getSelection();

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap)
      .reduce((contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color)
      }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }

    this.onChange(nextEditorState);
  }

  handleFontChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { editorState } = this.state;
    const { title, time, changeEntryTitle} = this.props; 

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <div style={styles.root}>
          <div style={styles.header}> 
            <Input 
              placeholder="enter title" 
              fullWidth 
              value={title}
              style={styles.title}
              onChange={changeEntryTitle}> </Input>
            <Typography style={styles.time}> {time}  </Typography>
          </div>
          {/* <ColorControls
            editorState={editorState}
            onToggle={this.toggleColor}
          /> */}
          <div className="control-container">
            <Select
              value={this.state.age}
              onChange={this.handleFontChange}
              displayEmpty
              outlined
              name="age"
            >
              <option value='pomsky'>Pomsky</option>
              <option value='goldenDoodle'>Golden Doodle</option>
            </Select>

            <InlineStyleControls
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
            />

            <BlockStyleControls
              editorState={editorState}
              onToggle={this.toggleBlockType}
            /> 
          </div>

          <div style={styles.editor} onClick={this.focus}>
            <Editor
              customStyleMap={colorStyleMap}
              editorState={editorState}
              onChange={this.onChange}
              placeholder="Write your daily thoughts..."
              ref="editor"
            />
          </div>

          <Button variant="fab" color="primary" aria-label="Add" style={styles.addButton}>
            <AddIcon />
          </Button>
        </div>
      </Slide>
    );
  }
}

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};
function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}
class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}
const BLOCK_TYPES = [
  // { label: 'H1', style: 'header-one' },
  // { label: 'H2', style: 'header-two' },
  // { label: 'H3', style: 'header-three' },
  // { label: 'H4', style: 'header-four' },
  // { label: 'H5', style: 'header-five' },
  // { label: 'H6', style: 'header-six' },
  { key: 'Quote', label: <Quote />, style: 'blockquote' },
  { key: 'UList', label: <UList />, style: 'unordered-list-item' },
  { key: 'OList', label: <OList />, style: 'ordered-list-item' },
];
const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.key}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};
var INLINE_STYLES = [
  { key: 'Bold', label: <Bold />, style: 'BOLD' },
  { key: 'Italic', label: <Italic />, style: 'ITALIC' },
  { key: 'Underline', label: <Underline />, style: 'UNDERLINE' },
  // { label: 'Monospace', style: 'CODE' },
];
const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) =>
        <StyleButton
          key={type.key}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default EntryEditor