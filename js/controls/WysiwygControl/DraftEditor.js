import { Component, Fragment } from '@wordpress/element';

import {
    SelectControl
} from '@wordpress/components';

import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw
} from 'draft-js';

// import { Map } from 'immutable/dist/immutable';

export class DraftEditor extends Component {

    constructor(props) {
        super(props);

        this.rawDraftContentState = ( props?.initialContent ) ? props.initialContent : null;
        this.state = {
            editorState: ( this.rawDraftContentState != null ) ? EditorState.createWithContent( convertFromRaw(this.rawDraftContentState) ) : EditorState.createEmpty()
        };
        this.onChange = editorState => this.handleChange(editorState);
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);

        this.defineBlocks();
        this.defineInlineStyles();

        // this.blockRenderers = {};
        // for( const [key, val] of Object.entries(props.typo) ) {
        //     if( val.type == 'block' ) {
        //         this.blockRenderers[ key] = (block) => this._handleBlockRenderers(block);
        //     }
        // }
        // this.optionsStateToHTML = {
        //     // inlineStyles: {
        //     //   // Override default element (`strong`).
        //     // //   BOLD: {element: 'b'},
        //     // //   ITALIC: {
        //     // //     // Add custom attributes. You can also use React-style `className`.
        //     // //     attributes: {class: 'foo'},
        //     // //     // Use camel-case. Units (`px`) will be added where necessary.
        //     // //     style: {fontSize: 12}
        //     // //   },
        //     // //   // Use a custom inline style. Default element is `span`.
        //     // //   RED: {style: {color: '#900'}},
        //     // },
        //     blockRenderers: this.blockRenderers
        // };
    }

    defineBlocks() {

        this.blockTypes = [];
        for( const [key, val] of Object.entries(this.props.typo) ) {
            if( val.type == 'block' ) {
                this.blockTypes.push( {
                    label: val.label,
                    style: key
                } );
            }
        }
    }

    defineInlineStyles() {

        this.inlineStyles = [];
        for( const [key, val] of Object.entries(this.props.typo) ) {
            if( val.type == 'inline' ) {
                this.inlineStyles.push( {
                    label: val.label,
                    style: key
                } );
            }
        }
    }

    // _handleBlockRenderers( block ) {

    //     return '<div class="' + this.props.typo[block.getType()].class + '">' + block.getText() + '</div>';
    // }

    handleChange( editorState ) {

        this.setState( { editorState } );

        let currentContentState = editorState.getCurrentContent();
        this.rawDraftContentState = convertToRaw(currentContentState);

        this.props.onChange( this.rawDraftContentState );
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
    
        const BlockStyleControls = (props) => {

            const selection = props.editorState.getSelection();
            const blockType = props.editorState
                .getCurrentContent()
                .getBlockForKey(selection.getStartKey())
                .getType();

            return (
                <div className="DraftEditor-controls">
                { this.blockTypes.map((type) =>
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

        const InlineStyleControls = (props) => {

            const currentStyle = props.editorState.getCurrentInlineStyle();
            
            return (
                <div className="DraftEditor-controls">
                { this.inlineStyles.map((type) =>
                    <StyleButton
                        key={type.label}
                        active={currentStyle.has(type.style)}
                        label={type.label}
                        onToggle={props.onToggle}
                        style={type.style}
                    />
                ) }
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




        // const blockRenderMap = Map({
        //     'lead': {
        //       element: 'section'
        //     }
        //   });

        // Include 'paragraph' as a valid block and updated the unstyled element but
        // keep support for other draft default block types
        // const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);


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