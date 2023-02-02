import {
    Button,
    TextareaControl
} from '@wordpress/components';

import { Attributes } from '../Static/Attributes';
import { Render } from '../Static/Render';

export function renderTextarea( componentInstance, id, label, keys, valueProp, objectValue, required = false ) {

    label = ( required ) ? label + '*' : label;

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