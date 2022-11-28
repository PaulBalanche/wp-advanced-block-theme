import { Component, Fragment } from '@wordpress/element';

import {
  Editor,
  EditorState,
  ContentState,
  RichUtils,
  convertToRaw,
  convertFromHTML
} from 'draft-js';

import draftToHtml from 'draftjs-to-html';

export class DraftEditor extends Component {

    constructor(props) {
        super(props);

        const blocksFromHTML = convertFromHTML(props.initialContent);
        this.state = {
            editorState: EditorState.createWithContent( ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap,
            ) )
        };
        this.onChange = editorState => this.handleChange(editorState);
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    }

    handleChange( editorState ) {
        this.setState( { editorState } );

        let currentContentState = editorState.getCurrentContent();
        let rawContentState = convertToRaw(currentContentState); 
        let htmlContent = draftToHtml(
            rawContentState
        );
        console.log(htmlContent);
        this.props.onChange( htmlContent );
    }

    _onBoldClick() {
        this.onChange( RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD') );
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

    render() {

        const BLOCK_TYPES = [
            {label: 'H1', style: 'header-one'},
            {label: 'H2', style: 'header-two'},
            {label: 'H3', style: 'header-three'},
            {label: 'H4', style: 'header-four'},
            {label: 'H5', style: 'header-five'},
            {label: 'H6', style: 'header-six'},
            {label: 'Blockquote', style: 'blockquote'},
            {label: 'UL', style: 'unordered-list-item'},
            {label: 'OL', style: 'ordered-list-item'}
        ];
    
        const BlockStyleControls = (props) => {
        const {editorState} = props;
        const selection = editorState.getSelection();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();

        return (
            <div className="DraftEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                key={type.label}
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
        {label: 'Bold', style: 'BOLD'},
        {label: 'Italic', style: 'ITALIC'},
        {label: 'Underline', style: 'UNDERLINE'}
        ];

        const InlineStyleControls = (props) => {
            const currentStyle = props.editorState.getCurrentInlineStyle();
            
            return (
                <div className="DraftEditor-controls">
                    {INLINE_STYLES.map((type) =>
                        <StyleButton
                        key={type.label}
                        active={currentStyle.has(type.style)}
                        label={type.label}
                        onToggle={props.onToggle}
                        style={type.style}
                        />
                    )}
                </div>
            );
        };

        // If the user changes block type before entering any text, we can
          // either style the placeholder or hide it. Let's just hide it now.
          let className = 'DraftEditor-editor';
          var contentState = this.state.editorState.getCurrentContent();
          if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
              className += ' DraftEditor-hidePlaceholder';
            }
          }

        return <Fragment>
            <div className="DraftEditor-container">
              <BlockStyleControls
                editorState={this.state.editorState}
                onToggle={this.toggleBlockType}
              />
              <InlineStyleControls
                editorState={this.state.editorState}
                onToggle={this.toggleInlineStyle}
              />
              <div className={className} onClick={this.focus}>
                <Editor
                  editorState={this.state.editorState}
                  onChange={this.onChange}
                />
              </div>
            </div>
        </Fragment>;
    }
}

class StyleButton extends Component {

    constructor() {
      super();
      this.onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
      };
    }

    render() {
      let className = 'DraftEditor-styleButton';
      if (this.props.active) {
        className += ' DraftEditor-activeButton';
      }

      return (
        <span className={className} onMouseDown={this.onToggle}>
          {this.props.label}
        </span>
      );
    }
  }