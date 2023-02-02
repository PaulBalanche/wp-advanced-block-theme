import {
    Button,
    TextControl
} from '@wordpress/components';

import { Attributes } from '../Static/Attributes';
import { Render } from '../Static/Render';
import { Devices } from '../Singleton/Devices';

export function renderText( componentInstance, id, label, keys, valueProp, objectValue, isNumber = false, required = false ) {

    label = ( required && label != null ) ? label + '*' : label;

    var textControl = <TextControl
        key={ id }
        label={ label }
        // type={ !! isNumber ? "number" : "text" }
        type="text"
        value={ objectValue }
        onChange={ ( newValue ) =>
            Attributes.updateAttributes( keys, valueProp, newValue, isNumber, componentInstance )
        }
    />

    return textControl;
}