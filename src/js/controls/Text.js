import {
    Button,
    TextControl
} from '@wordpress/components';

import { updateAttributes, removeEltRepeatable, renderTabPanelComponent } from '../attributes';

import { Devices } from '../Devices';

export function renderText( componentInstance, id, label, keys, valueProp, objectValue, isNumber = false, repeatable = false, required = false, responsive = false ) {

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

    if( responsive ) {

        let newInner = renderTabPanelComponent(
                id,
                Devices.getInstance().getLayouts().map( ( layout ) => {
                    return {
                        name: layout.value,
                        title: layout.label,
                        className: 'tab-' + layout.value,
                    };
                } ),
                function ( tab ) {

                    return renderTextControl(
                        componentInstance,
                        id + "-" + tab.name,
                        label,
                        isNumber,
                        ( typeof objectValue[tab.name] == 'string' ) ? objectValue[tab.name] : '',
                        keys.concat(tab.name),
                        valueProp
                    );
                },
                Devices.getInstance().getCurrentDevice()
            );
        
        return newInner;
    }

    return renderTextControl(
        componentInstance,
        id,
        label,
        isNumber,
        objectValue,
        keys,
        valueProp
    );
}

function renderTextControl( componentInstance, id, label, isNumber, value, keysToUpdate, valueProp ) {

    return <TextControl
        key={ id }
        label={ label }
        type={ !! isNumber ? "number" : "text" }
        value={ value }
        onChange={ ( newValue ) =>
            updateAttributes( keysToUpdate, valueProp, newValue, isNumber, componentInstance )
        }
    />
}