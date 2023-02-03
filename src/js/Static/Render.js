import {
    Panel,
    PanelBody,
    TabPanel,
    Button,
    Dashicon
} from '@wordpress/components';

import { Controls } from './Controls'
import { Attributes } from './Attributes'

export class Render {

    static tabPanelComponent( id, tabs, inner, initialTabName = null, onSelect = null, extraClass = '' ) {

        return <TabPanel
            key={ id + "-tabPanel" }
            className={ "tab-panel-wpe-component " + extraClass }
            activeClass="active-tab"
            initialTabName={ initialTabName }
            tabs={ tabs }
            onSelect={ onSelect }
        >{ inner }</TabPanel>;
    }

    static panelComponent( id, label, inner, initialOpen = false, extraClass = '' ) {
        
        var className = [];   
        if( extraClass != ''  )
            className.push(extraClass);

        return <Panel
            key={ id + "-panel" }
            className={ className.join(' ') }
        >
            { this.panelBodyComponent(id, label, inner, initialOpen, null, extraClass ) }
        </Panel>
    }

    static panelBodyComponent( id, label, inner, initialOpen = false, removeButton = null, extraClassContent = '' ) {

        var className = [];        
        if( removeButton != null  )
            className.push('repeatableItem');

        return <PanelBody
            key={ id + "-PanelBody" }
            title={ label }
            initialOpen={ ( label != null ) ? initialOpen : true }
            className={ className.join(' ') }
        >
            <div className="components-panel__body-content">
                { inner }
                { removeButton }
            </div>
        </PanelBody>
    }

    static fieldContainer( id, inner, extraClass = '' ) {

        const className = "basicField" + ( extraClass != '' ? " " + extraClass : "");
        return <div
            key={ id + "-basicContainer"}
            className={ className }
        >
            { inner }
        </div>
    }

    static label( id, inner, extraClass = '' ) {

        const className = "components-base-control__label" + ( extraClass != '' ? " " + extraClass : "");
        return <div
            key={ id + "-label" }
            className={ className }
        >
            { inner }
        </div>
    }

    static buttonAddRepeatableElt( id, onclick ) {
        
        return <Button
            key={ id + "-repeatableAddElt" }
            className="repeatableAddElt"
            onMouseDown={onclick}
            variant="secondary"
        ><Dashicon icon="insert" /> Add</Button>
    }

    static buttonRemoveRepeatableElt( id, onclick ) {
        
        return <Button
            key={ id + "-repeatableRemoveElt" }
            className="repeatableRemoveElt"
            onMouseDown={onclick}
            variant="secondary"
            isSmall
        >
            <Dashicon icon="no-alt" /> Remove
        </Button>
    }

    static control( type, componentInstance, blockKey, label, keys, valueProp, controllerValue, repeatable, required_field, args ) {
        
        var control = [];
        var extraClassfieldContainer = '';

        if( repeatable ) {

            extraClassfieldContainer = 'repeatableContainer';

            if( typeof controllerValue != "object" || controllerValue.length == 0 ) {
                controllerValue = [ "" ];
            }
            
            for( var keyLoop in controllerValue ) {

                keyLoop = Attributes.returnStringOrNumber(keyLoop, true);

                control.push( <div className='repeatableItem'>
                    { Controls.render( type, componentInstance, blockKey + "-" + keyLoop, label, keys.concat(keyLoop), valueProp, controllerValue[keyLoop], required_field, args ) }
                    { Render.buttonRemoveRepeatableElt( blockKey + "-" + keyLoop, () => { Attributes.removeEltRepeatable( keys.concat(keyLoop), valueProp, componentInstance ) } ) }
                    </div>
                );
            }

            control.push( Render.buttonAddRepeatableElt( blockKey, () => { Attributes.addEltToRepeatable( keys, valueProp, controllerValue, false, componentInstance ) } ) );

            control = Render.panelComponent(
                blockKey,
                ( required_field && label != null ) ? label + '*' : label,
                control,
                true
            )
        }
        else {
            control.push( Controls.render( type, componentInstance, blockKey, label, keys, valueProp, ( typeof controllerValue != 'undefined' ) ? controllerValue : '', required_field, args ) );
        }

        if( label == null )
            return control;

        return Render.fieldContainer(
            blockKey,
            control,
            extraClassfieldContainer
        )
    }

}