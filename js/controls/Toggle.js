import {
    Button,
    ToggleControl
} from '@wordpress/components';

import { updateAttributes, removeEltRepeatable } from '../attributes';

export function renderToggle( id, label, help, keys, valueProp, objectValue, repeatable = false, required = false, clientId ) {

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
        <ToggleControl
            key={ id }
            label={ label }
            help={ ( typeof help == 'object' && Array.isArray(help) && help.length == 2 ) ? ( !! objectValue ? help[1] : help[0] ) : false }
            checked={ objectValue }
            onChange={ ( newValue ) =>
                updateAttributes( keys, valueProp, newValue, false, clientId )
            }
        />
    );
}