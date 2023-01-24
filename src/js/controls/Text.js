import {
    Button,
    TextControl
} from '@wordpress/components';

import { Attributes } from '../Static/Attributes';
import { Render } from '../Static/Render';
import { Devices } from '../Singleton/Devices';

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
                        Attributes.removeEltRepeatable( keys, valueProp )
                    }
                >
                    Remove
                </Button>
            </>
        );
    }

    if( responsive ) {

        let newInner = Render.tabPanelComponent(
                id,
                Object.keys( Devices.getInstance().getMediaQueries() ).map( ( layout ) => {
                    return {
                        name: layout,
                        title: layout.charAt(0).toUpperCase() + layout.slice(1),
                        className: 'tab-' + layout
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
            Attributes.updateAttributes( keysToUpdate, valueProp, newValue, isNumber, componentInstance )
        }
    />
}