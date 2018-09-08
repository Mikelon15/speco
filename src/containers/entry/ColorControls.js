import React from 'react';
import 'draft-js/dist/Draft.css';
import { styles, colorStyleMap } from './styles';

class StyleButton extends React.Component {
    constructor(props) {
        super(props);
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let style;
        if (this.props.active) {
            style = { ...styles.styleButton, ...colorStyleMap[this.props.style] };
        } else {
            style = styles.styleButton;
        }

        return (
            <span style={style} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
}

var COLORS = [
    { label: 'Red', style: 'red' },
    { label: 'Orange', style: 'orange' },
    { label: 'Yellow', style: 'yellow' },
    { label: 'Green', style: 'green' },
    { label: 'Blue', style: 'blue' },
    { label: 'Indigo', style: 'indigo' },
    { label: 'Violet', style: 'violet' },
];

const ColorControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div style={styles.controls}>
            {COLORS.map(type =>
                <StyleButton
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};
export default ColorControls; 