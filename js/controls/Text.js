import {
    Button,
    TextControl
} from '@wordpress/components';

import { updateAttributes, removeEltRepeatable } from '../attributes';

export function renderText( id, label, keys, valueProp, objectValue, isNumber = false, repeatable = false, required = false, clientId ) {

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
        <TextControl
            key={ id }
            label={ label }
            type={ !! isNumber ? "number" : "text" }
            value={ objectValue }
            onChange={ ( newValue ) =>
                updateAttributes( keys, valueProp, newValue, isNumber, clientId )
            }
        />
    );
}