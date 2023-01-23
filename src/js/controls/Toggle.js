import {
    Button,
    ToggleControl
} from '@wordpress/components';

import { Attributes } from '../Static/Attributes';

export function renderToggle( componentInstance, id, label, help, keys, valueProp, objectValue, repeatable = false, required = false ) {

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
                        Attributes.removeEltRepeatable( keys, valueProp )
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
                Attributes.updateAttributes( keys, valueProp, newValue, false, componentInstance )
            }
        />
    );
}