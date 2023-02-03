import {
    Panel,
    PanelBody,
    PanelRow,
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
            <PanelRow>
                { inner }
                { removeButton }
            </PanelRow>
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

    static buttonAddRepeatableElt( id, keys, valueProp, controllerValue, componentInstance ) {
        
        return <Button
            key={ id + "-repeatableAddElt" }
            className="repeatableAddElt"
            onMouseDown={ () => { Attributes.addEltToRepeatable( keys, valueProp, controllerValue, false, componentInstance ) } }
            variant="secondary"
        ><Dashicon icon="insert" /> Add</Button>
    }

    static buttonRemoveRepeatableElt( id, keys, valueProp, componentInstance ) {
        
        return <Button
            key={ id + "-repeatableRemoveElt" }
            className="repeatableRemoveElt"
            onMouseDown={ () => { Attributes.removeEltRepeatable( keys, valueProp, componentInstance ) } }
            variant="secondary"
            isSmall
        >
            <Dashicon icon="no-alt" /> Remove
        </Button>
    }

    static control( type, componentInstance, blockKey, label, keys, valueProp, controllerValue, repeatable, required_field, args ) {
        
        var control = [];

        if( repeatable ) {

            if( typeof controllerValue != "object" || controllerValue.length == 0 ) {
                controllerValue = [ "" ];
            }
            
            for( var keyLoop in controllerValue ) {

                keyLoop = Attributes.returnStringOrNumber(keyLoop, true);

                const labelRepeatableItem = ( type == 'object' ) ? Render.repeatableObjectLabelFormatting( blockKey + "-" + keyLoop, controllerValue, keyLoop ) : null;

                control.push( <div key={ blockKey + "-" + keyLoop + "_repeatableItem" } className={ 'repeatableItem ' + type }>
                    { Controls.render( type, componentInstance, blockKey + "-" + keyLoop, labelRepeatableItem, keys.concat(keyLoop), valueProp, controllerValue[keyLoop], required_field, args ) }
                    { Render.buttonRemoveRepeatableElt( blockKey + "-" + keyLoop, keys.concat(keyLoop), valueProp, componentInstance ) }
                </div>
                );
            }

            control.push( Render.buttonAddRepeatableElt( blockKey, keys, valueProp, controllerValue, componentInstance ) );

            control = ( label != null ) ?
                Render.panelComponent(
                    blockKey,
                    ( required_field ) ? label + '*' : label,
                    control,
                    true
                ) :
                control;
        }
        else {
            control.push( Controls.render( type, componentInstance, blockKey, label, keys, valueProp, ( typeof controllerValue != 'undefined' ) ? controllerValue : '', required_field, args ) );
        }

        if( label == null )
            return control;

        return Render.fieldContainer(
            blockKey,
            control
        )
    }

    static repeatableObjectLabelFormatting( blockKey, valueProp, keyLoop ) {
        
        var labelKey = keyLoop + 1;
        labelKey = ( labelKey < 10 ) ? '0' + labelKey : labelKey;
        labelKey = '#' + labelKey + '.'

        var itemsProp = null;

        var valueProp = valueProp[keyLoop];
        if( typeof valueProp == 'object' && Object.keys(valueProp).length > 0 ) {

            itemsProp = [];

            if( typeof valueProp.title != 'undefined' ) {
                itemsProp.push( <li key={ blockKey + "-repeatableObjectLabel-key" } ><span className="value">{ valueProp.title }</span></li> );
            }
            else if( typeof valueProp.name != 'undefined' ) {
                itemsProp.push( <li key={ blockKey + "-repeatableObjectLabel-key" }><span className="value">{ valueProp.name }</span></li> );
            }
            else if( typeof valueProp.id != 'undefined' ) {
                itemsProp.push( <li key={ blockKey + "-repeatableObjectLabel-key" }><span className="value">{ valueProp.id }</span></li> );
            }
            else {
                for( var i in valueProp ) {
                    itemsProp.push( <li key={ blockKey + "-repeatableObjectLabel-key-" + i }><span className="key">{ i + ": " }</span><span className="value">{ valueProp[i] } </span></li> );
                }
            }

            itemsProp = <ul key={ blockKey + "-repeatableObjectLabel-ul" } className='props'>{ itemsProp }</ul>
        }

        return <div key={ blockKey + "-repeatableObjectLabel" } className='repeatableObjectLabel'>
            <div key={ blockKey + "-repeatableObjectLabel-id" } className='id'>{ labelKey }</div>
            { itemsProp }
        </div>
    }

}