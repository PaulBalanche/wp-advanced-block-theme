import { Component, Fragment } from '@wordpress/element';

import {
  Editor,
  EditorState,
  ContentState,
  RichUtils,
  convertFromRaw,
  convertToRaw
} from 'draft-js';

import {stateToHTML} from 'draft-js-export-html';

export class DraftEditor extends Component {

    constructor(props) {
        super(props);

        this.rawDraftContentState = ( props?.initialContent?.raw ) ? props.initialContent.raw : null;
        this.state = {
            editorState: ( this.rawDraftContentState != null ) ? EditorState.createWithContent( convertFromRaw(this.rawDraftContentState) ) : EditorState.createEmpty()
        };
        this.onChange = editorState => this.handleChange(editorState);
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);


        this.block_types = [];
        for( const [key, val] of Object.entries(props.blockTypes) ) {
            this.block_types.push( {
                label: val.label,
                style: key
            } );
        }

        this.blockRenderers = {};
        for( const [key, val] of Object.entries(props.blockTypes) ) {
            this.blockRenderers[ val.label ] = (block) => this._handleBlockRenderers(block);
        }
        this.optionsStateToHTML = {
            // inlineStyles: {
            //   // Override default element (`strong`).
            // //   BOLD: {element: 'b'},
            // //   ITALIC: {
            // //     // Add custom attributes. You can also use React-style `className`.
            // //     attributes: {class: 'foo'},
            // //     // Use camel-case. Units (`px`) will be added where necessary.
            // //     style: {fontSize: 12}
            // //   },
            // //   // Use a custom inline style. Default element is `span`.
            // //   RED: {style: {color: '#900'}},
            // },
            blockRenderers: this.blockRenderers
        };

        console.log(props.blockTypes);
    }

    _handleBlockRenderers( block ) {

        return '<div class="' + this.props.blockTypes[block.getType()].class + '">' + block.getText() + '</div>';
    }

    handleChange( editorState ) {
        this.setState( { editorState } );

        let currentContentState = editorState.getCurrentContent();
        this.rawDraftContentState = convertToRaw(currentContentState);

        let htmlContent = stateToHTML( currentContentState, this.optionsStateToHTML );
        console.log({ raw: this.rawDraftContentState , html: htmlContent });
        this.props.onChange( { raw: this.rawDraftContentState , html: htmlContent } );
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

        // const BLOCK_TYPES = [
        //     {label: 'H1', style: 'header-one'},
        //     {label: 'H2', style: 'header-two'},
        //     {label: 'H3', style: 'header-three'},
        //     {label: 'H4', style: 'header-four'},
        //     {label: 'H5', style: 'header-five'},
        //     {label: 'H6', style: 'header-six'},
        //     {label: 'Blockquote', style: 'blockquote'},
        //     {label: 'UL', style: 'unordered-list-item'},
        //     {label: 'OL', style: 'ordered-list-item'},
        //     {label: 'TEST', style: 'test-coffe'},
        // ];
    
        const BlockStyleControls = (props) => {
        const {editorState} = props;
        const selection = editorState.getSelection();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();

        return (
            <div className="DraftEditor-controls">
            { this.block_types.map((type) =>
                <StyleButton
                key={type.label}
                active={type.style === blockType}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
                />
            ) }
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