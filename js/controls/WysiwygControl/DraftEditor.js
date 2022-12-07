import { Component, Fragment } from '@wordpress/element';

import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
  DefaultDraftBlockRenderMap
} from 'draft-js';

import { Map } from 'Immutable';

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
    }

    defineBlocks() {

        this.blockTypes = [];
        this.blockRenderMap = {};
        for( const [key, val] of Object.entries(this.props.typo) ) {
            if( val.type == 'block' ) {
                this.blockTypes.push( {
                    label: val.label,
                    style: key
                } );

                this.blockRenderMap[key] = {
                    wrapper: <WrapperBlockRendering type={key} />
                };
            }
        }

        this.blockRenderMap = Map( this.blockRenderMap );
        this.blockRenderMap = DefaultDraftBlockRenderMap.merge( this.blockRenderMap );
        
    }

    defineInlineStyles() {

        this.inlineStyles = [];
        this.styleMap = {};
        for( const [key, val] of Object.entries(this.props.typo) ) {
            if( val.type == 'inline' ) {
                this.inlineStyles.push( {
                    label: val.label,
                    style: key
                } );

                if( val?.editor && typeof val.editor == 'object' ) {
                    this.styleMap[key] = {};
                    for( const [keyCss, valCss] of Object.entries(val.editor) ) {
                        this.styleMap[key][keyCss] = valCss;
                    }
                }
                
            }
        }
    }

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
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    blockRenderMap={this.blockRenderMap}
                    customStyleMap={this.styleMap}
                />
            </div>
        </Fragment>
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

class WrapperBlockRendering extends Component {

    constructor(props) {
      super(props);
    }
  
    render() {
        return (
            <div className='WrapperBlockRendering' type={this.props.type} >
                {this.props.children}
            </div>
        );
    }
}