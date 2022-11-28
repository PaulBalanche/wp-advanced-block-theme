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
            clientId
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

        let heading_options = [ { model: 'paragraph', title: 'Paragraph' } ];
        if( this?.props?.frontspec_styles?.typo?.values && typeof this.props.frontspec_styles.typo.values == 'object') {
            for( const [key, val] of Object.entries(this.props.frontspec_styles.typo.values) ) {

                if( typeof val.type != 'undefined' && val.type == "block" && key != "paragraph") {
                    heading_options.push( {
                        model: key,
                        view: {
                            name: val.tag,
                            classes: val.class
                        },
                        title: val.name
                    } );
                }
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
                        <DraftEditor initialContent={ objectValue } onChange={ this.onChange } />
                    </div>
                </div>
            </div>
        );
    }
}

export default WysiwygControl;