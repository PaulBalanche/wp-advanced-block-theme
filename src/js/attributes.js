import {
    Button,
    TabPanel,
    Panel,
    PanelBody
} from '@wordpress/components';

import { Devices } from './Devices';

import WysiwygControl from './controls/WysiwygControl/WysiwygControl';
import {
    renderTextControl,
    renderDateTimeControl,
    renderFileControl,
    renderImageVideoControl,
    renderLinkControl,
    renderRadioControl,
    renderRelationControl,
    renderSelectControl,
    renderTextareaControl,
    renderToggleControl
} from './controls'

import { dispatch } from '@wordpress/data';

export function returnStringOrNumber( value, isNumber = false ) {
    return !! isNumber ? parseInt( value, 10 ) : value;
}

function addEltToRepeatable( arrayKey, currentValueProp, currentValueRepeatableField, isNumber = false, componentInstance ) {
    updateAttributes( arrayKey, currentValueProp, currentValueRepeatableField.concat(""), isNumber, componentInstance );
}

export function removeEltRepeatable( arrayKey, currentValueProp, componentInstance ) {
    updateAttributes( arrayKey, currentValueProp, false, false, componentInstance );
}

export function fileSizeFormat( filesizeInBytes ) {

    if( filesizeInBytes > 1000000 )
        return Math.round( filesizeInBytes / 10000 ) / 100 + " Mo";
    else
        return Math.round(filesizeInBytes / 1000) + " Ko";
}

// export function setAttributes( attributes, clientId ) {
//     dispatch('core/block-editor').updateBlockAttributes( clientId, attributes );
// }

export function updateAttributes( arrayKey, currentValue, newValue, isNumber = false, componentInstance ) {
    let keyToUpdate = arrayKey[0];
    let newValueToUpdate = recursiveUpdateObjectFromObject(arrayKey, currentValue, newValue, isNumber);

    componentInstance.setAttributes( { [keyToUpdate]: newValueToUpdate[keyToUpdate] } );
}

export function recursiveUpdateObjectFromObject( arrayKey, fromObject, newValue, isNumber = false ) {

    const firstElement = arrayKey.shift();

    if( typeof fromObject != 'object' || ( Array.isArray(fromObject) && typeof firstElement == 'string' ) || ( ! Array.isArray(fromObject) && typeof firstElement == 'number' ) )
        fromObject = ( typeof firstElement == 'string' ) ? {} : [];

    let objectReturned = ( Array.isArray(fromObject) ) ? [] : {};

    for( const [key, val] of Object.entries(fromObject) ) {
        if( key == firstElement ) {
            if( arrayKey.length > 0 )
                objectReturned[key] = recursiveUpdateObjectFromObject(arrayKey, val, newValue, isNumber);
            else if( !! newValue )
                objectReturned[key] = returnStringOrNumber(newValue, isNumber);
        }
        else
            objectReturned[key] = val;
    }

    if( typeof objectReturned[firstElement] == 'undefined' ) {

        if( arrayKey.length > 0 )
            objectReturned[firstElement] = recursiveUpdateObjectFromObject(arrayKey, undefined, newValue, isNumber);
        else if( !! newValue )
            objectReturned[firstElement] = returnStringOrNumber(newValue, isNumber);
    }

    // Re-index in case of element suppression
    if( arrayKey.length == 0 && ! newValue ) {
        for (let index = 0; index < objectReturned.length; index++) {
            if( typeof objectReturned[index] == 'undefined' )
                objectReturned.splice(index, 1);
        }
    }
    
    return objectReturned;
}

export function renderControl( prop, keys, valueProp, componentInstance ) {

    const clientId = componentInstance.props.clientId;

    prop.type = prop.type.toLowerCase();

    let blocReturned = [];

    let repeatable = ( typeof prop.repeatable != "undefined" && !! prop.repeatable ) ? true : false;
    
    let currentValueAttribute = valueProp;
    keys.forEach(element => {

        if( typeof currentValueAttribute == 'object' ) {

            if ( currentValueAttribute.hasOwnProperty(element) && typeof currentValueAttribute[element] != "undefined" )
                currentValueAttribute = currentValueAttribute[element];
            else
                currentValueAttribute = "";
        }
    });

    if( ! repeatable )
        currentValueAttribute = [ currentValueAttribute ];
    else if( typeof currentValueAttribute != "object" || currentValueAttribute.length == 0 )
        currentValueAttribute = [ "" ];

    let responsive = ( typeof prop.responsive != "undefined" && !! prop.responsive ) ? true : false;

    for (var keyLoop in currentValueAttribute) {

        keyLoop = returnStringOrNumber(keyLoop, true);

        let label = ( typeof prop.label != "undefined" ) ? prop.label : ( ( typeof prop.title != "undefined" ) ? prop.title : keys.slice(-1) );

        if( repeatable ) {
            let index = keyLoop + 1;
            label = label + " " + index + "/" + currentValueAttribute.length;
        }

        let required_field = ( typeof prop.required != "undefined" && prop.required ) ? true : false;

        let fieldId = clientId + "-" + keys.join("-") + "-" + keyLoop;
        switch( prop.type ) {

            case 'string':
                blocReturned.push( renderTextControl( componentInstance, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], false, repeatable, required_field, responsive ) );
                break;

            case 'number':
                blocReturned.push( renderTextControl( componentInstance, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], true, repeatable, required_field ) );
                break;

            case 'text':
                blocReturned.push( renderTextareaControl( componentInstance, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field ) );
                break;
            
            case 'richText':
            case 'wysiwyg':
                blocReturned.push( <WysiwygControl
                    key={ fieldId + "-WysiwygControl" }
                    id={ fieldId }
                    label={ label }
                    keys={ repeatable ? keys.concat(keyLoop) : keys }
                    valueProp={ valueProp }
                    objectValue={ currentValueAttribute[keyLoop] }
                    repeatable={ repeatable }
                    required={ required_field }
                    componentInstance={ componentInstance }
                /> );
                break;

            case 'boolean':
                blocReturned.push( renderToggleControl( componentInstance, fieldId, label, prop.help, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field ) );
                break;

            case 'select':
            case 'color':
                blocReturned.push( renderSelectControl( componentInstance, fieldId, label, prop.options, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field ) );
                break;
            
            case 'radio':
                blocReturned.push( renderRadioControl( componentInstance, fieldId, label, prop.options, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field ) );
                break;

            case 'link':
                blocReturned.push( renderLinkControl( componentInstance, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field ) );
                break;

            case 'relation':
                blocReturned.push( renderRelationControl( componentInstance, fieldId, label, prop.entity, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field ) );
                break;
            
            case 'date':
                blocReturned.push( renderDateTimeControl( componentInstance, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field ) );
                break;

            case 'image':
                blocReturned.push( renderImageVideoControl( componentInstance, prop.type, ( prop.image && typeof prop.image == 'object' ) ? prop.image : {}, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, responsive ) );
                break;

            case 'video':
                blocReturned.push( renderImageVideoControl( componentInstance, prop.type, ( prop.video && typeof prop.video == 'object' ) ? prop.video : {}, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field ) );
                break;
            
            case 'file':
            case 'gallery':
                blocReturned.push( renderFileControl( componentInstance, prop.type, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, responsive ) );
                break;

            case 'object':

                if( typeof prop.props == "object" ) {
                    
                    let tempKeyObject = repeatable ? keys.concat(keyLoop) : keys;
                    let fieldsetObject = [];

                    if( responsive ) {

                        fieldsetObject.push(
                            renderTabPanelComponent(
                                fieldId,
                                Devices.getInstance().getLayouts().map( ( layout ) => {
                                    return {
                                        name: layout.value,
                                        title: layout.label,
                                        className: 'tab-' + layout.value,
                                    };
                                } ),
                                function ( tab ) {
                                    let tempKeyObjectReponsive = keys.concat(tab.name);
                                    let fieldsetObjectResponsive = [];
                                    for( const [ keySubProp, valueSubProp ] of Object.entries(prop.props) ) {
                                        fieldsetObjectResponsive.push( renderControl( valueSubProp, tempKeyObjectReponsive.concat(keySubProp), valueProp, componentInstance ) );
                                    }
                                    return fieldsetObjectResponsive;
                                },
                                Devices.getInstance().getCurrentDevice()
                            )
                        );
                    }
                    else {
                        for (const [keySubProp, valueSubProp] of Object.entries(prop.props)) {
                            fieldsetObject.push( renderControl( valueSubProp, tempKeyObject.concat(keySubProp), valueProp, componentInstance ) );
                        }
                    }
                    
                    if( repeatable ) {
                        label = (
                            <>
                                { label }
                                <Button
                                    key={ fieldId + "-repeatableRemoveElt" }
                                    isLink={true}
                                    className="removeRepeatable"
                                    onClick={ () =>
                                        removeEltRepeatable( tempKeyObject, valueProp, componentInstance )
                                    }
                                >
                                    Remove
                                </Button>
                            </>
                        );
                    }

                    blocReturned.push(
                        renderPanelComponent( fieldId, label, fieldsetObject, false )
                    );
                }
                break;
        }
    }

    // Add repeatable button
    if( !! repeatable ) {
        blocReturned.push(
            <Button
                key={ clientId + "-" + keys.join("-") + "-repeatableAddElt" }
                isSecondary
                isSmall
                onClick={ () => 
                    addEltToRepeatable( keys, valueProp, currentValueAttribute, false, componentInstance )
                }
            >Add</Button>
        );

        blocReturned = (
            <div
                key={ clientId + "-" + keys.join("-") + "-repeatableContainer"}
                className="repeatableField components-base-control"
            >   
                { blocReturned }
            </div>
        );
    }
    else {
        blocReturned = (
            <div
                key={ clientId + "-" + keys.join("-") + "-basicContainer"}
                className="basicField"
            >
                { blocReturned }
            </div>
        );
    }

    // Return
    return blocReturned;
}

export function renderPanelComponent( id, label, inner, initialOpen = false ) {

    return (
        <Panel
            key={ id + "-panel" }
        >
            <PanelBody
                key={ id + "-PanelBody" }
                title={ label }
                initialOpen={ initialOpen }
            >
                <div
                    key={ id + "-panelBodyDivObject" }
                    className="objectField components-base-control"
                >
                    <div
                        key={ id + "-panelBodySubDivObject" }
                        className="objectField-content"
                    > 
                        { inner }
                    </div>
                </div>
            </PanelBody>
        </Panel>
    );
}

export function renderTabPanelComponent( id, tabs, inner, initialTabName = null  ) {

    return <TabPanel
        key={ id + "-tabPanel" }
        className="tab-panel-wpe-component"
        activeClass="active-tab"
        initialTabName={ initialTabName }
        tabs={ tabs }
    >{ inner }</TabPanel>;
}

export function initComponentAttributes( attributes, props ) {

    for( const [key, value] of Object.entries(props) ) {       

        if( typeof value != 'object' || value == null )
            continue;

        let currentType = ( typeof value.repeatable != 'undefined' && value.repeatable ) ? 'array' : value.type.toLowerCase();
        currentType = ( typeof value.responsive != 'undefined' && value.responsive ) ? 'object' : currentType;
        
        switch( currentType ) {
            case 'string':
                attributes[key] = {
                    type: 'string'
                };
                break;
            case 'text':
                attributes[key] = {
                    type: 'string'
                };
                break;
            case 'richText':
                attributes[key] = {
                    type: 'string'
                };
                break;
            case 'wysiwyg':
                attributes[key] = {
                    type: 'object'
                };
                break;
            case 'boolean':
                attributes[key] = {
                    type: 'boolean'
                };
                break;
            case 'select':
                attributes[key] = {
                    type: 'string'
                };
                break;
            case 'color':
                attributes[key] = {
                    type: 'string'
                };
                break;
            case 'radio':
                attributes[key] = {
                    type: 'string'
                };
                break;
            case 'relation':
                attributes[key] = {
                    type: 'string'
                };
                break;
            case 'array':
                attributes[key] = {
                    type: 'array'
                };
                break;
            case 'object':
                attributes[key] = {
                    type: 'object'
                };
                break;
            case 'link':
                attributes[key] = {
                    type: 'object'
                };
                break;
            case 'number':
                attributes[key] = {
                    type: 'number'
                };
                break;
            case 'image':
                attributes[key] = {
                    type: 'object'
                };
                break;
            case 'video':
                attributes[key] = {
                    type: 'object'
                };
                break;
            case 'file':
                attributes[key] = {
                    type: 'object'
                };
                break;
            case 'gallery':
                attributes[key] = {
                    type: 'array'
                };
                break;
            case 'date':
                attributes[key] = {
                    type: 'string'
                };
                break;
        }
    }
}