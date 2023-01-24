import {
    Button
} from '@wordpress/components';

import { Devices } from '../Singleton/Devices';
import { Controls } from './Controls'
import { Render } from './Render'

export class Attributes {

    static returnStringOrNumber( value, isNumber = false ) {
        return !! isNumber ? parseInt( value, 10 ) : value;
    }
    
    static addEltToRepeatable( arrayKey, currentValueProp, currentValueRepeatableField, isNumber = false, componentInstance ) {
        Attributes.updateAttributes( arrayKey, currentValueProp, currentValueRepeatableField.concat(""), isNumber, componentInstance );
    }
    
    static removeEltRepeatable( arrayKey, currentValueProp, componentInstance ) {
        Attributes.updateAttributes( arrayKey, currentValueProp, false, false, componentInstance );
    }
    
    static fileSizeFormat( filesizeInBytes ) {
    
        if( filesizeInBytes > 1000000 )
            return Math.round( filesizeInBytes / 10000 ) / 100 + " Mo";
        else
            return Math.round(filesizeInBytes / 1000) + " Ko";
    }
    
    static updateAttributes( arrayKey, currentValue, newValue, isNumber = false, componentInstance ) {
        let keyToUpdate = arrayKey[0];
        let newValueToUpdate = Attributes.recursiveUpdateObjectFromObject(arrayKey, currentValue, newValue, isNumber);
    
        componentInstance.setAttributes( { [keyToUpdate]: newValueToUpdate[keyToUpdate] } );
    }
    
    static recursiveUpdateObjectFromObject( arrayKey, fromObject, newValue, isNumber = false ) {
    
        const firstElement = arrayKey.shift();
    
        if( typeof fromObject != 'object' || ( Array.isArray(fromObject) && typeof firstElement == 'string' ) || ( ! Array.isArray(fromObject) && typeof firstElement == 'number' ) )
            fromObject = ( typeof firstElement == 'string' ) ? {} : [];
    
        let objectReturned = ( Array.isArray(fromObject) ) ? [] : {};
    
        for( const [key, val] of Object.entries(fromObject) ) {
            if( key == firstElement ) {
                if( arrayKey.length > 0 )
                    objectReturned[key] = Attributes.recursiveUpdateObjectFromObject(arrayKey, val, newValue, isNumber);
                else if( !! newValue )
                    objectReturned[key] = Attributes.returnStringOrNumber(newValue, isNumber);
            }
            else
                objectReturned[key] = val;
        }
    
        if( typeof objectReturned[firstElement] == 'undefined' ) {
    
            if( arrayKey.length > 0 )
                objectReturned[firstElement] = Attributes.recursiveUpdateObjectFromObject(arrayKey, undefined, newValue, isNumber);
            else if( !! newValue )
                objectReturned[firstElement] = Attributes.returnStringOrNumber(newValue, isNumber);
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
    
    static renderControl( prop, keys, valueProp, componentInstance ) {
    
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
    
            keyLoop = Attributes.returnStringOrNumber(keyLoop, true);
    
            let label = ( typeof prop.label != "undefined" ) ? prop.label : ( ( typeof prop.title != "undefined" ) ? prop.title : keys.slice(-1) );
    
            if( repeatable ) {
                let index = keyLoop + 1;
                label = label + " " + index + "/" + currentValueAttribute.length;
            }
    
            let required_field = ( typeof prop.required != "undefined" && prop.required ) ? true : false;
    
            let fieldId = clientId + "-" + keys.join("-") + "-" + keyLoop;
            switch( prop.type ) {
    
                case 'string':
                    blocReturned.push( Controls.render( 'Text', componentInstance, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, responsive, { isNumber: false } ) );
                    break;
    
                case 'number':
                    blocReturned.push( Controls.render( 'Text', componentInstance, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, responsive, { isNumber: true } ) );
                    break;
    
                case 'text':
                    blocReturned.push( Controls.render( 'Textarea', componentInstance, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, responsive ) );
                    break;
                
                case 'richText':
                case 'wysiwyg':
                    blocReturned.push( Controls.render( 'Wysiwyg', componentInstance, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, responsive ) );
                    break;
    
                case 'boolean':
                    blocReturned.push( Controls.render( 'Toggle', componentInstance, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, responsive, { help: prop.help } ) );
                    break;
    
                case 'select':
                case 'color':
                    blocReturned.push( Controls.render( 'Select', componentInstance, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, responsive, { options: prop.options, } ) );
                    break;
                
                case 'radio':
                    blocReturned.push( Controls.render( 'Radio', componentInstance, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, responsive, { options: prop.options } ) );
                    break;
    
                case 'link':
                    blocReturned.push( Controls.render( 'Link', componentInstance, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field ) );
                    break;
    
                case 'relation':
                    blocReturned.push( Controls.render( 'Relation', componentInstance, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, responsive, { entity: prop.entity } ) );
                    break;
                
                case 'date':
                    blocReturned.push( Controls.render( 'DateTime', componentInstance, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field ) );
                    break;
    
                case 'image':
                    blocReturned.push( Controls.render( 'ImageVideo', componentInstance, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, responsive, { type: prop.type, args: ( prop.image && typeof prop.image == 'object' ) ? prop.image : {} } ) );
                    break;
    
                case 'video':
                    blocReturned.push( Controls.render( 'ImageVideo', componentInstance, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, responsive, { type: prop.type, args: ( prop.video && typeof prop.video == 'object' ) ? prop.video : {} } ) );
                    break;
                
                case 'file':
                case 'gallery':
                    blocReturned.push( Controls.render( 'File', componentInstance, fieldId, label, repeatable ? keys.concat(keyLoop) : keys, valueProp, currentValueAttribute[keyLoop], repeatable, required_field, responsive, { type: prop.type } ) );
                    break;
    
                case 'object':
    
                    if( typeof prop.props == "object" ) {
                        
                        let tempKeyObject = repeatable ? keys.concat(keyLoop) : keys;
                        let fieldsetObject = [];
    
                        if( responsive ) {
    
                            fieldsetObject.push(
                                Render.tabPanelComponent(
                                    fieldId,
                                    Object.keys( Devices.getInstance().getMediaQueries() ).map( ( layout ) => {
                                        return {
                                            name: layout,
                                            title: layout.charAt(0).toUpperCase() + layout.slice(1),
                                            className: 'tab-' + layout
                                        };
                                    } ),
                                    function ( tab ) {
                                        let tempKeyObjectReponsive = keys.concat(tab.name);
                                        let fieldsetObjectResponsive = [];
                                        for( const [ keySubProp, valueSubProp ] of Object.entries(prop.props) ) {
                                            fieldsetObjectResponsive.push( Attributes.renderControl( valueSubProp, tempKeyObjectReponsive.concat(keySubProp), valueProp, componentInstance ) );
                                        }
                                        return fieldsetObjectResponsive;
                                    },
                                    Devices.getInstance().getCurrentDevice()
                                )
                            );
                        }
                        else {
                            for (const [keySubProp, valueSubProp] of Object.entries(prop.props)) {
                                fieldsetObject.push( Attributes.renderControl( valueSubProp, tempKeyObject.concat(keySubProp), valueProp, componentInstance ) );
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
                                            Attributes.removeEltRepeatable( tempKeyObject, valueProp, componentInstance )
                                        }
                                    >
                                        Remove
                                    </Button>
                                </>
                            );
                        }
    
                        blocReturned.push(
                            Render.panelComponent( fieldId, label, fieldsetObject, false )
                        );
                    }
                    else {
                        return;
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
                        Attributes.addEltToRepeatable( keys, valueProp, currentValueAttribute, false, componentInstance )
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
            blocReturned = Render.fieldContainer( clientId + "-" + keys.join("-"), blocReturned );
        }
    
        // Return
        return blocReturned;
    }

    static initComponentAttributes( attributes, props ) {
    
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
}