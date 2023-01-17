import {
    Button,
    TextareaControl
} from '@wordpress/components';

import { updateAttributes, removeEltRepeatable } from '../attributes';

export function renderTextarea( componentInstance, id, label, keys, valueProp, objectValue, repeatable = false, required = false ) {

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
        <TextareaControl
            key={ id }
            label={ label }
            value={ objectValue }
            onChange={ ( newValue ) =>
                updateAttributes( keys, valueProp, newValue, false, componentInstance )
            }
        />
    );
}