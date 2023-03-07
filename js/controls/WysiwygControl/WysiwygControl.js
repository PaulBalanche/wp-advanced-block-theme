import { Component, useRef } from '@wordpress/element';

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

        updateAttributes( this.props.keys, this.props.valueProp, newContent, false, this.props.clientId  );
    }

    getToolbox() {

        let toolbox = {};

        if( this.props?.themeSpec?.typo && typeof this.props.themeSpec.typo == 'object') {

            for( const [key, val] of Object.entries(this.props.themeSpec.typo) ) {

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

                toolbox[key] = {
                    label: val.label,
                    isBlock: isBlock,
                    editor: editorCss,
                    group: ( val?.group ) ? val.group : null,
                    type: ( val?.type ) ? val.type : null,
                    isDefault: ( val?.default && !! val.default ) ? true : false
                };
            }
        }

        return toolbox;
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

        label = ( required ) ? label + '<span class="o-required">*</span>' : label;

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
                        <DraftEditor id={ id } initialContent={ objectValue } onChange={ this.onChange } typo={ this.getToolbox() } />
                    </div>
                </div>
            </div>
        );
    }
}

export default WysiwygControl;