import {
    Button,
    SelectControl
} from '@wordpress/components';

import { updateAttributes, removeEltRepeatable } from '../attributes';

export function renderSelect( id, label, options, keys, valueProp, attributeValue, repeatable = false, required = false, clientId ) {

    if( typeof options == 'undefined' )
        return null;

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
        <SelectControl
            key={ id }
            label={ label }
            value={ attributeValue }
            options={
               [ { label: 'Choose...', value: '' } ].concat( options.map( function(value) {
                    return { label: value.name, value: value.value }
                } ) )
            }
            onChange={ ( newValue ) =>
                updateAttributes( keys, valueProp, newValue, false, clientId )
            }
        />
    );
}