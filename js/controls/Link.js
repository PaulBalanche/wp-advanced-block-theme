import {
    Button,
    TextControl,
    LinkControl
} from '@wordpress/components';

import { updateAttributes, removeEltRepeatable, renderPanelComponent } from '../attributes';

export function renderLink( id, label, keys, valueProp, objectValue, repeatable = false, required = false, clientId ) {
        
    if( typeof objectValue == 'undefined' ) {
        objectValue = {};
    }

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

    let inner = (
        <div
            key={ id + "-LinkControlBasicContainer"}
            className="basicField"
        >
            <div
                key={ id + "-LinkControlComponentsBaseControl" }
                className="components-base-control"
            >
                <div
                    key={ id + "-LinkControlComponentsBaseControlField" }
                    className="components-base-control__field"
                >
                    <div
                        key={ id + "-LinkControlContainer" }
                        className="link-control-container"
                    >
                        <TextControl
                            key={ id + "-text" }
                            label={ "Text" }
                            type={ "text" }
                            value={ objectValue.text }
                            onChange={ ( newValue ) => {
                                updateAttributes( keys.concat('text'), valueProp, newValue, false, clientId );
                            } }
                        />
                        <LinkControl
                            key={ id + "-LinkControl" }
                            className="wp-block-navigation-link__inline-link-input"
                            value={ objectValue }
                            settings={ [
                                {
                                    id: 'url',
                                    title: 'URL ...',
                                },
                                {
                                    id: 'opensInNewTab',
                                    title: 'Open in new tab',
                                }                        
                            ] }
                            onChange={ ( {
                                url: newURL,
                                opensInNewTab: newOpensInNewTab,
                            } ) => {
                                let newObjectValue = ( typeof newURL == 'string' ) ? { text: objectValue.text, url: newURL, opensInNewTab: newOpensInNewTab } : { text: objectValue.text };
                                updateAttributes( keys, valueProp, newObjectValue, false, clientId );
                            } }
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    return renderPanelComponent( id, label, inner, false );
}