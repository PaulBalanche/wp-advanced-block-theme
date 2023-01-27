import {
    Button,
    TextareaControl
} from '@wordpress/components';

import { Attributes } from '../Static/Attributes';
import { Render } from '../Static/Render';

export function renderTextarea( componentInstance, id, label, keys, valueProp, objectValue, repeatable = false, required = false ) {

    label = ( required ) ? label + '*' : label;

    if( repeatable ) {
        label = (
            <>
                { label }
                { Render.buttonRemoveRepeatableElt( id, () => { Attributes.removeEltRepeatable( keys, valueProp, componentInstance ) } ) }
            </>
        );
    }

    return (
        <TextareaControl
            key={ id }
            label={ label }
            value={ objectValue }
            onChange={ ( newValue ) =>
                Attributes.updateAttributes( keys, valueProp, newValue, false, componentInstance )
            }
        />
    );
}