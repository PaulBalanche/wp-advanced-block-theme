import {
    Button,
    TextControl
} from '@wordpress/components';

import { updateAttributes, removeEltRepeatable, renderTabPanelComponent } from '../attributes';

import { getLayouts, setBodyDevice, getBodyDevice } from '../devices';

export function renderText( id, label, keys, valueProp, objectValue, isNumber = false, repeatable = false, required = false, clientId, responsive = false ) {

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
                getLayouts().map( ( layout ) => {
                    return {
                        name: layout.value,
                        title: layout.label,
                        className: 'tab-' + layout.value,
                    };
                } ),
                function ( tab ) {

                    return renderTextControl(
                        id + "-" + tab.name,
                        label,
                        isNumber,
                        ( typeof objectValue[tab.name] == 'string' ) ? objectValue[tab.name] : '',
                        keys.concat(tab.name),
                        valueProp,
                        clientId
                    );
                },
                getBodyDevice()
            );
        
        return newInner;
    }

    return renderTextControl(
        id,
        label,
        isNumber,
        objectValue,
        keys,
        valueProp,
        clientId
    );
}

function renderTextControl( id, label, isNumber, value, keysToUpdate, valueProp, clientId ) {

    return <TextControl
        key={ id }
        label={ label }
        type={ !! isNumber ? "number" : "text" }
        value={ value }
        onChange={ ( newValue ) =>
            updateAttributes( keysToUpdate, valueProp, newValue, isNumber, clientId )
        }
    />
}