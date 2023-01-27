import {
    Button,
    SelectControl
} from '@wordpress/components';

import { Attributes } from '../Static/Attributes';
import { Render } from '../Static/Render';

export function renderRelation( componentInstance, id, label, entity, keys, valueProp, objectValue, repeatable = false, required = false ) {

    if( typeof entity == 'undefined' || typeof this.props.relations[entity] == 'undefined' || this.props.relations[entity] == null || Object.keys(this.props.relations[entity]).length == 0 )
        return null;

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
        <SelectControl
            key={ id }
            label={ label }
            value={ objectValue }
            options={ this.props.relations[entity].map( function(value) {
                    return { label: value.title.raw, value: value.id }
                } )
            }
            onChange={ ( newValue ) =>
                Attributes.updateAttributes( keys, valueProp, newValue, false, componentInstance )
            }
        />
    );
}