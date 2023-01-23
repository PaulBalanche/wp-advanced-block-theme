import {
    Button,
    RadioControl
} from '@wordpress/components';

import { Attributes } from '../Static/Attributes';

import { withState } from '@wordpress/compose';

export function renderRadio( componentInstance, id, label, options, keys, valueProp, objectValue, repeatable = false, required = false ) {

    if( typeof options == 'undefined' )
        return null;

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
                Attributes.updateAttributes( keys, valueProp, newValue, false, componentInstance );
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