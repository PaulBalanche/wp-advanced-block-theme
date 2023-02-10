import {
    Button,
    Panel
} from '@wordpress/components';

import { Devices } from '../Singleton/Devices';
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

        const currentArrayKey = Object.assign([], arrayKey);       
        const firstElement = currentArrayKey.shift();

        if( typeof fromObject != 'object' || ( Array.isArray(fromObject) && isNaN(firstElement) ) || ( ! Array.isArray(fromObject) && typeof firstElement == 'number' ) )
            fromObject = ( isNaN(firstElement) ) ? {} : [];

        let objectReturned = ( Array.isArray(fromObject) ) ? [] : {};
    
        for( const [key, val] of Object.entries(fromObject) ) {
            if( key == firstElement ) {
                if( currentArrayKey.length > 0 )
                    objectReturned[key] = Attributes.recursiveUpdateObjectFromObject(currentArrayKey, val, newValue, isNumber);
                else if( !! newValue )
                    objectReturned[key] = Attributes.returnStringOrNumber(newValue, isNumber);
            }
            else
                objectReturned[key] = val;
        }
    
        if( typeof objectReturned[firstElement] == 'undefined' ) {
    
            if( currentArrayKey.length > 0 )
                objectReturned[firstElement] = Attributes.recursiveUpdateObjectFromObject(currentArrayKey, undefined, newValue, isNumber);
            else if( !! newValue )
                objectReturned[firstElement] = Attributes.returnStringOrNumber(newValue, isNumber);
        }
    
        // Re-index in case of element suppression
        if( currentArrayKey.length == 0 && ! newValue ) {
            for (let index = 0; index < objectReturned.length; index++) {
                if( typeof objectReturned[index] == 'undefined' )
                    objectReturned.splice(index, 1);
            }
        }
        
        return objectReturned;
    }










    static renderProp( prop, keys, valueProp, componentInstance ) {
       
        const type = prop.type.toLowerCase();
        const blockKey = componentInstance.props.clientId + "-" + keys.join("-");
        const repeatable = ( typeof prop.repeatable != "undefined" && !! prop.repeatable ) ? true : false;
        const label = ( typeof prop.label != "undefined" ) ? prop.label : ( ( typeof prop.title != "undefined" ) ? prop.title : keys.slice(-1) );
        const required_field = ( typeof prop.required != "undefined" && prop.required ) ? true : false;
        
        let currentValueAttribute = valueProp;
        keys.forEach( element => { currentValueAttribute = ( currentValueAttribute != null && typeof currentValueAttribute == 'object' && currentValueAttribute.hasOwnProperty(element) && typeof currentValueAttribute[element] != "undefined" ) ? currentValueAttribute[element] : ""; } );

        var args = {};
        switch( type ) {
            case 'string':
                args = { isNumber: false };
                break;
            case 'number':
                args = { isNumber: true };
                break;
            case 'boolean':
                args = { help: prop.help };
                break;
            case 'select':
            case 'color':
                args = { options: prop.options, default: ( typeof prop.default != "undefined" ) ? prop.default : null };
                break;
            case 'radio':
                args = { options: prop.options };
                break;
            case 'relation':
                args = { entity: prop.entity };
                break;
            case 'image':
                args = { type: type, args: ( prop.image && typeof prop.image == 'object' ) ? prop.image : {} };
                break;
            case 'video':
                args = { type: type, args: ( prop.video && typeof prop.video == 'object' ) ? prop.video : {} };
                break;
            case 'file':
            case 'gallery':
                args = { type: type };
                break;
            case 'object':
                if( typeof prop.props != "object" ) { return }
                args = { props: prop.props };
                break;
        }

        if( typeof prop.responsive != "undefined" && !! prop.responsive ) {

            if( typeof currentValueAttribute != "object" ) {
                currentValueAttribute = {};
            }

            return Render.fieldContainer( blockKey,
                Render.panelComponent( blockKey,
                    ( required_field && label != null ) ? label + '*' : label,
                    Render.tabPanelComponent(
                        blockKey,
                        Object.keys( Devices.getInstance().getMediaQueries() ).map( ( layout ) => {
                            return {
                                name: layout,
                                title: layout.charAt(0).toUpperCase() + layout.slice(1),
                                className: 'tab-' + layout
                            }
                        } ),
                        ( tab ) => {
                            return Render.control( type, componentInstance, blockKey + "-" + tab.name, null, keys.concat(tab.name), valueProp, currentValueAttribute[tab.name], repeatable, required_field, args );
                        },
                        Devices.getInstance().getCurrentDevice(),
                        null,
                        'tabPanelResponsiveProp'
                    ),
                    ( type == 'object' ) ? false : true,
                    'responsive'
                )
            )
        }

        return Render.control( type, componentInstance, blockKey, label, keys, valueProp, currentValueAttribute, repeatable, required_field, args );
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
                        type: 'string'
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