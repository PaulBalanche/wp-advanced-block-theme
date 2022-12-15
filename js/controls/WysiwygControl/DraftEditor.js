import { Component, Fragment } from '@wordpress/element';

import {
    SelectControl
} from '@wordpress/components';

import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
  DefaultDraftBlockRenderMap,
  getDefaultKeyBinding
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
        this.toggleColorStyle = this._toggleColorStyle.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);

        this.defineBlocks();
        this.defineInlineStyles();
    }

    defineBlocks() {

        this.blockTypes = {};
        this.blockRenderMap = {};
        for( const [key, val] of Object.entries(this.props.typo) ) {
            
            if( ! val.isBlock ) {
                continue;
            }

            let style = [];
            if( val?.editor && typeof val.editor == 'object' ) {
                for( const [keyCss, valCss] of Object.entries(val.editor) ) {
                    style[keyCss] = valCss;
                }
            }

            if( val.isDefault ) {

                this.blockRenderMap.unstyled = {
                    element: 'div',
                    wrapper: <WrapperBlockRendering style={style} />
                };
            }
            else {

                let groupToAdd = ( val.group == 'null' ) ? 'default' : val.group;
                if( typeof this.blockTypes[groupToAdd] != 'object' ) {
                    this.blockTypes[groupToAdd] = [];
                }

                this.blockTypes[groupToAdd].push( {
                    label: val.label,
                    style: key
                } );

                this.blockRenderMap[key] = {
                    wrapper: <WrapperBlockRendering style={style} />
                };
            }
        }

        this.blockRenderMap = Map( this.blockRenderMap );
        this.blockRenderMap = DefaultDraftBlockRenderMap.merge( this.blockRenderMap );
    }

    defineInlineStyles() {

        this.inlineStyles = {};
        this.colorOptions = [];
        this.styleMap = {};
        for( const [key, val] of Object.entries(this.props.typo) ) {

            if( val.isBlock ) {
                continue;
            }

            let inlineCss = [];
            if( val?.editor && typeof val.editor == 'object' ) {
                for( const [keyCss, valCss] of Object.entries(val.editor) ) {
                    inlineCss[keyCss] = valCss;
                }
                this.styleMap[key] = inlineCss
            }

            if( val.type != 'color' ) {
                let groupToAdd = ( val.group == 'null' ) ? 'default' : val.group;
                if( typeof this.inlineStyles[groupToAdd] != 'object' ) {
                    this.inlineStyles[groupToAdd] = [];
                }

                this.inlineStyles[groupToAdd].push( {
                    label: val.label,
                    style: key,
                    buttonStyle: inlineCss
                } );
            }
            else {
                this.colorOptions.push( {
                    label: val.label,
                    style: key,
                    buttonStyle: inlineCss
                } );
            }
        }

    }

    handleSoftNewLine(e) {
        return ( e.keyCode === 13 && e.shiftKey ) ? 'soft-new-line' : getDefaultKeyBinding(e);
    }

    handleChange( editorState ) {

        this.setState( { editorState } );

        let currentContentState = editorState.getCurrentContent();
        this.rawDraftContentState = convertToRaw(currentContentState);

        this.props.onChange( this.rawDraftContentState );
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

    _toggleColorStyle(inlineStyle) {

        let curentEditorState = this.state.editorState;
        const currentInlineStyle = curentEditorState.getCurrentInlineStyle();

        for( const [key, val] of Object.entries(this.props.typo) ) {

            if( val.isBlock || val.type != 'color' || key == inlineStyle ) {
                continue;
            }

            if( currentInlineStyle.has(key) ) {

                curentEditorState = RichUtils.toggleInlineStyle(
                    curentEditorState,
                    key
                );
            }
        }

        const newEditorState = RichUtils.toggleInlineStyle(
            curentEditorState,
            inlineStyle
        );

        this.onChange(newEditorState);
    }

    handleKeyCommand(command, editorState) {

        if (command === 'soft-new-line') {
            this.handleChange( RichUtils.insertSoftNewline(editorState) );
            return 'handled';
        }

        return 'not-handled';
      }

    render() {
    
        const BlockStyleControls = (props) => {

            const selection = props.editorState.getSelection();
            const blockType = props.editorState
                .getCurrentContent()
                .getBlockForKey(selection.getStartKey())
                .getType();

            let optgroup = [];
            for( const [key, val] of Object.entries(this.blockTypes) ) {

                let options = [];
                val.forEach( type => options.push(<option value={ type.style }>{ type.label }</option>) );
                optgroup.push(<optgroup
                        label={ key }
                    >
                        { options }
                    </optgroup>
                );
            }

            return <SelectControl
                key={ this.props.id +'-selectControl-blockTypes' }
                label={ 'Paragraph style' }
                value={ blockType }
                onChange={ ( newValue ) =>
                    this._toggleBlockType(newValue) 
                }
            >
                <option value="">Default</option>
                { optgroup }
            </SelectControl>
        }

        const InlineStyleControls = (props) => {

            const currentStyle = props.editorState.getCurrentInlineStyle();

            let groupControls = [];
            for( const [key, val] of Object.entries(this.inlineStyles) ) {

                groupControls.push(
                    <div className="DraftEditor-controls">
                        { val.map((type) =>
                            <StyleButton
                                key={ this.props.id +'-StyleButton-inlineStyles-' + type.style }
                                active={currentStyle.has(type.style)}
                                label={type.label}
                                onToggle={props.onToggle}
                                style={type.style}
                                buttonStyle={type.buttonStyle}
                            />
                        ) }
                        </div>
                );
            };
            
            return groupControls
        }

        const ColorStyleControls = (props) => {

            const currentStyle = props.editorState.getCurrentInlineStyle();

            let currentColor = 'Choose color...'
            let colorButtons = [];
            this.colorOptions.forEach( function(type) {

                currentColor = ( currentStyle.has(type.style) ) ? type.label : currentColor;

                colorButtons.push(
                    <StyleButton
                        key={ 'StyleButton-inlineStyles-' + type.style }
                        active={currentStyle.has(type.style)}
                        label={type.label}
                        onToggle={props.onToggle}
                        style={type.style}
                        buttonStyle={type.buttonStyle}
                    />
                );
            });

            return (
                <div className="DraftEditor-controls colors-container">
                    <span className="currentColor">{ currentColor }</span>
                    <div className="colors-innerContainer">{ colorButtons }</div>
                </div>
            );
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
                <ColorStyleControls
                    editorState={this.state.editorState}
                    onToggle={this.toggleColorStyle}
                />
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    blockRenderMap={this.blockRenderMap}
                    customStyleMap={this.styleMap}
                    handleKeyCommand={this.handleKeyCommand}
                    keyBindingFn={this.handleSoftNewLine}
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
            <span className={className} onMouseDown={this.onToggle} style={this.props.buttonStyle} >
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
            <div style={this.props.style} >
                {this.props.children}
            </div>
        );
    }
}