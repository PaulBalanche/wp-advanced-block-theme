import {
    Button
} from '@wordpress/components';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@paulbalanche/ckeditor5-build-classic-with-alignment';

import { updateAttributes, removeEltRepeatable } from '../attributes';

export function renderWysiwyg( id, label, keys, valueProp, objectValue, repeatable = false, required = false, clientId ) {

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
                    <CKEditor
                        editor={ ClassicEditor }
                        data={ objectValue }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            updateAttributes( keys, valueProp, data, false, clientId )
                        } }
                        config={ {
                            heading: {
                                options: heading_options
                            }
                        } }
                    />
                </div>
            </div>
        </div>
    );
}