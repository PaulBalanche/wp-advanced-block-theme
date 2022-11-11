import {
    Button,
    TabPanel,
    Panel,
    PanelBody
} from '@wordpress/components';

import { getLayouts, setBodyDevice, getBodyDevice } from './devices';

import {
    renderDateTimeControl,
    renderFileControl,
    renderImageVideoControl,
    renderLinkControl,
    renderRadioControl,
    renderRelationControl,
    renderSelectControl,
    renderTextControl,
    renderTextareaControl,
    renderToggleControl,
    // renderWysiwygControl
} from './controls';

import { dispatch } from '@wordpress/data';

export function returnStringOrNumber( value, isNumber = false ) {
    return !! isNumber ? parseInt( value, 10 ) : value;
}

function addEltToRepeatable( arrayKey, currentValueProp, currentValueRepeatableField, isNumber = false, clientId ) {
    updateAttributes( arrayKey, currentValueProp, currentValueRepeatableField.concat(""), isNumber, clientId );
}

export function removeEltRepeatable( arrayKey, currentValueProp ) {
    updateAttributes( arrayKey, currentValueProp, false, false, clientId );
}

export function fileSizeFormat( filesizeInBytes ) {

    if( filesizeInBytes > 1000000 )
        return Math.round( filesizeInBytes / 10000 ) / 100 + " Mo";
    else
        return Math.round(filesizeInBytes / 1000) + " Ko";
}

export function setAttributes( attributes, clientId ) {
    dispatch('core/block-editor').updateBlockAttributes( clientId, attributes );
}

export function updateAttributes( arrayKey, currentValue, newValue, isNumber = false, clientId ) {
    let keyToUpdate = arrayKey[0];
    let newValueToUpdate = recursiveUpdateObjectFromObject(arrayKey, currentValue, newValue, isNumber);

    setAttributes( { [keyToUpdate]: newValueToUpdate[keyToUpdate] }, clientId );
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

export function renderControl( prop, keys, valueProp, clientId ) {

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
                blocReturned.push( renderTextControl( fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], false, repeatable, required_field, clientId ) );
                break;

            case 'number':
                blocReturned.push( renderTextControl( fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], true, repeatable, required_field, clientId ) );
                break;

            case 'text':
                blocReturned.push( renderTextareaControl( fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId ) );
                break;
            
            // case 'richText':
            // case 'wysiwyg':
            //     blocReturned.push( renderWysiwygControl( fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId ) );
            //     break;

            case 'boolean':
                blocReturned.push( renderToggleControl( fieldId, label, prop.help, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId ) );
                break;

            case 'select':
            case 'color':
                blocReturned.push( renderSelectControl( fieldId, label, prop.options, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId ) );
                break;
            
            case 'radio':
                blocReturned.push( renderRadioControl( fieldId, label, prop.options, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId ) );
                break;

            case 'link':
                blocReturned.push( renderLinkControl( fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId ) );
                break;

            case 'relation':
                blocReturned.push( renderRelationControl( fieldId, label, prop.entity, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId ) );
                break;
            
            case 'date':
                blocReturned.push( renderDateTimeControl( fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId ) );
                break;

            case 'image':
                blocReturned.push( renderImageVideoControl( prop.type, ( prop.image && typeof prop.image == 'object' ) ? prop.image : {}, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId ) );
                break;

            case 'video':
                blocReturned.push( renderImageVideoControl( prop.type, ( prop.video && typeof prop.video == 'object' ) ? prop.video : {}, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId ) );
                break;
            
            case 'file':
            case 'gallery':
                blocReturned.push( renderFileControl( prop.type, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, clientId ) );
                break;

            case 'object':

                if( typeof prop.props == "object" ) {
                    
                    let tempKeyObject = repeatable ? keys.concat(keyLoop) : keys;
                    let fieldsetObject = [];

                    if( responsive ) {

                        fieldsetObject.push( <TabPanel
                            key={ fieldId + "-TabPanel" }
                            className="tab-panel-wpe-component"
                            activeClass="active-tab"
                            initialTabName={ getBodyDevice() }
                            tabs={ getLayouts().map( ( layout ) => {
                                return {
                                    name: layout.value,
                                    title: layout.label,
                                    className: 'tab-' + layout.value,
                                };
                            } ) }
                        >
                            { ( tab ) => {
                                let tempKeyObjectReponsive = keys.concat(tab.name);
                                let fieldsetObjectResponsive = [];
                                for( const [ keySubProp, valueSubProp ] of Object.entries(prop.props) ) {
                                    fieldsetObjectResponsive.push( renderControl( valueSubProp, tempKeyObjectReponsive.concat(keySubProp), valueProp, clientId ) );
                                }
                                return fieldsetObjectResponsive;
                            } }
                        </TabPanel> );
                    }
                    else {
                        for (const [keySubProp, valueSubProp] of Object.entries(prop.props)) {
                            fieldsetObject.push( renderControl( valueSubProp, tempKeyObject.concat(keySubProp), valueProp, clientId ) );
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
                                        removeEltRepeatable(tempKeyObject, valueProp)
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
                key={ clientId + "-" + keys.join("-") + "-repeatableAddElt"}
                isSecondary
                isSmall
                onClick={ () => 
                    addEltToRepeatable( keys, valueProp, currentValueAttribute, false, clientId )
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