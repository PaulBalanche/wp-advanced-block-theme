import {
    Button,
    RadioControl
} from '@wordpress/components';

import { updateAttributes, removeEltRepeatable } from '../attributes';

import { withState } from '@wordpress/compose';

export function renderRadio( id, label, options, keys, valueProp, objectValue, repeatable = false, required = false, clientId ) {

    if( typeof options == 'undefined' )
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

    const MyRadioControl = withState( {
        option: objectValue,
    } )( ( { option, setState } ) => (
        <RadioControl
            key={ id }
            label={ label }
            selected={ option }
            options={ options.map( function(value) {
                return { label: value.name, value: value.value }
            } ) }
            onChange={ ( newValue ) => {
                setState( { newValue } );
                updateAttributes( keys, valueProp, newValue, false, clientId );
            } }
        />
    ) );

    return(
        <div
            key={ id + "-RadioControlComponentsBaseControl" }
            className="components-base-control"
        >
            <div
                key={ id + "-RadioControlComponentsBaseControlField" }
                className="components-base-control__field"
            >
                <div
                    key={ id + "-RadioControlContainer" }
                    className="radio-control-container"
                >
                    <MyRadioControl />
                </div>
            </div>
        </div>
    );
}