import { Component } from '@wordpress/element';

import {
    Button
} from '@wordpress/components';

import { DraftEditor } from './DraftEditor'

import { updateAttributes, removeEltRepeatable } from '../../attributes';

class WysiwygControl extends Component {

    constructor(props) {
        super(props);

        this.onChange = newContent => this.handleChange(newContent);
    }

    handleChange( newContent) {

        updateAttributes( this.props.keys, this.props.valueProp, newContent, false, this.props.componentInstance  );
    }

    getTypo() {

        let typo = {};
        
        if( this.props?.componentInstance?.props?.theme_spec?.typo && typeof this.props.componentInstance.props.theme_spec.typo == 'object') {

            for( const [key, val] of Object.entries(this.props.componentInstance.props.theme_spec.typo) ) {

                if( key == 'a' ) {
                    continue;
                }

                let isBlock = false;

                let editorCss = null;
                if( val?.style && typeof val.style == 'object' ) {
                    editorCss = {};
                    for( const [keyCss, valCss] of Object.entries(val.style) ) {
                        if( keyCss != 'display' ) {
                            editorCss[keyCss] = valCss;
                        }
                        else if( valCss == 'block' ) {
                            isBlock = true;
                        }
                    }
                }

                if( val?.editorStyle && typeof val.editorStyle == 'object' ) {
                    for( const [keyCss, valCss] of Object.entries(val.editorStyle) ) {
                        if( keyCss != 'display' ) {
                            editorCss[keyCss] = valCss;
                        }
                        else if( valCss == 'block' ) {
                            isBlock = true;
                        }
                    }
                }

                typo[key] = {
                    label: val.label,
                    isBlock: isBlock,
                    editor: editorCss,
                    group: ( val?.group ) ? val.group : null,
                    type: ( val?.type ) ? val.type : null,
                    isDefault: ( val?.default && !! val.default ) ? true : false
                };
            }
        }

        return typo;
    }

    getTools() {

        let tools = { 
            a: {
                style: {
                    textDecoration: 'underline'
                }
            }
        };

        if( this.props?.componentInstance?.props?.theme_spec?.typo && typeof this.props.componentInstance.props.theme_spec.typo == 'object') {

            for( const [key, val] of Object.entries(this.props.componentInstance.props.theme_spec.typo) ) {

                let editorCss = null;

                if( key == 'a' ) {

                    if( val?.style && typeof val.style == 'object' ) {
                        editorCss = {};
                        for( const [keyCss, valCss] of Object.entries(val.style) ) {
                            if( keyCss != 'display' ) {
                                editorCss[keyCss] = valCss;
                            }
                        }
                    }
    
                    if( val?.editorStyle && typeof val.editorStyle == 'object' ) {
                        for( const [keyCss, valCss] of Object.entries(val.editorStyle) ) {
                            if( keyCss != 'display' ) {
                                editorCss[keyCss] = valCss;
                            }
                        }
                    }
    
                    tools.a = {
                        style: editorCss
                    };   
                }
            }
        }

        return tools;
    }
        
    render() {

        var {
            id,
            label,
            keys,
            valueProp,
            objectValue,
            repeatable = false,
            required = false
        } = this.props;

        label = ( required ) ? label + '*' : label;

        if( repeatable ) {
            label = (
                <>
                    { label }
                    <Button
                        key={ id + "-repeatableRemoveElt" }
                        isLink={true}
                        className="removeRepeatable"
                        onClick={ () =>
                            removeEltRepeatable( keys, valueProp )
                        }
                    >
                        Remove
                    </Button>
                </>
            );
        }

        return (
            <div
                key={ id + "-WysiwygComponentsBaseControl" }
                className="components-base-control"
            >
                <div
                    key={ id + "-WysiwygComponentsBaseControlField" }
                    className="components-base-control__field"
                >
                    <div
                        key={ id + "-WysiwygContainer" }
                        className="wysiwyg-container"
                    >
                        <div className="components-base-control__label" key={ id + "-label" }>{ label }</div>
                        <DraftEditor id={ id } initialContent={ objectValue } onChange={ this.onChange } typo={ this.getTypo() } tools={ this.getTools() } />
                    </div>
                </div>
            </div>
        );
    }
}

export default WysiwygControl;