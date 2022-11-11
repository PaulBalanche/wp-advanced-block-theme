import { registerBlockType } from '@wordpress/blocks';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import edit from './edit';

import { initDevice } from '../../../js/devices';
initDevice();

var current_user_can_edit_posts = global_localized.current_user_can_edit_posts;

Object.values(global_localized.components).forEach( ( element ) => {

    var initAttributes = {
        id_component: {
            type: 'string'
        },
        padding: {
            type: 'object'
        },
        margin: {
            type: 'object'
        }
    };

    for( const [ key, value ] of Object.entries(element.props) ) {
        
        if( typeof value != 'object' || value == null )
            continue;

        let currentType = ( typeof value.repeatable != 'undefined' && value.repeatable ) ? 'array' : value.type.toLowerCase();
        switch( currentType ) {
            case 'string':
                initAttributes[key] = {
                    type: 'string'
                };
                break;
            case 'text':
                initAttributes[key] = {
                    type: 'string'
                };
                break;
            case 'richText':
                initAttributes[key] = {
                    type: 'string'
                };
                break;
            case 'wysiwyg':
                initAttributes[key] = {
                    type: 'string'
                };
                break;
            case 'boolean':
                initAttributes[key] = {
                    type: 'boolean'
                };
                break;
            case 'select':
                initAttributes[key] = {
                    type: 'string'
                };
                break;
            case 'color':
                initAttributes[key] = {
                    type: 'string'
                };
                break;
            case 'radio':
                initAttributes[key] = {
                    type: 'string'
                };
                break;
            case 'relation':
                initAttributes[key] = {
                    type: 'string'
                };
                break;
            case 'array':
                initAttributes[key] = {
                    type: 'array'
                };
                break;
            case 'object':
                initAttributes[key] = {
                    type: 'object'
                };
                break;
            case 'link':
                initAttributes[key] = {
                    type: 'object'
                };
                break;
            case 'number':
                initAttributes[key] = {
                    type: 'number'
                };
                break;
            case 'image':
                initAttributes[key] = {
                    type: 'object'
                };
                break;
            case 'video':
                initAttributes[key] = {
                    type: 'object'
                };
                break;
            case 'file':
                initAttributes[key] = {
                    type: 'object'
                };
                break;
            case 'gallery':
                initAttributes[key] = {
                    type: 'array'
                };
                break;
            case 'date':
                initAttributes[key] = {
                    type: 'string'
                };
                break;
        }
    }

    registerBlockType( 'custom/wpe-component-' + element.id, {
        title: element.name,
        category: element.category.slug,
        supports: {
            anchor: true
        },
        parent: element.parent,
        attributes: initAttributes,
        description: element.description,
        edit: edit(element, current_user_can_edit_posts, global_localized.styles, theme_spec),
        save: () => {
            return (
                <div { ...useBlockProps.save() } >
                    <InnerBlocks.Content />
                </div>
            );
        }
    } );
})