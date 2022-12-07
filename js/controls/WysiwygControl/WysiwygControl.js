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
        
    render() {

        var {
            id,
            label,
            keys,
            valueProp,
            objectValue,
            repeatable = false,
            required = false,
            clientId,
            themeSpec
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

        let typo = {};
        if( themeSpec?.typo && typeof themeSpec.typo == 'object') {
            for( const [key, val] of Object.entries(themeSpec.typo) ) {

                let editorCss = null;
                if( val?.style && typeof val.style == 'object' ) {
                    editorCss = {};
                    for( const [keyCss, valCss] of Object.entries(val.style) ) {
                        editorCss[keyCss] = valCss;
                    }
                }

                typo[key] = {
                    label: key,
                    type: ( val?.nestable && val.nestable ) ? 'inline' : 'block',
                    editor: editorCss
                };
            }
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
                        <DraftEditor initialContent={ objectValue } onChange={ this.onChange } typo={ typo } />
                    </div>
                </div>
            </div>
        );
    }
}

export default WysiwygControl;