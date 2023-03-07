import {
    Button,
    SelectControl
} from '@wordpress/components';

import { updateAttributes, removeEltRepeatable } from '../attributes';

export function renderRelation( id, label, entity, keys, valueProp, objectValue, repeatable = false, required = false, clientId ) {

    if( typeof entity == 'undefined' || typeof this.props.relations[entity] == 'undefined' || this.props.relations[entity] == null || Object.keys(this.props.relations[entity]).length == 0 )
        return null;

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
        <SelectControl
            key={ id }
            label={ label }
            value={ objectValue }
            options={ this.props.relations[entity].map( function(value) {
                    return { label: value.title.raw, value: value.id }
                } )
            }
            onChange={ ( newValue ) =>
                updateAttributes( keys, valueProp, newValue, false, clientId )
            }
        />
    );
}