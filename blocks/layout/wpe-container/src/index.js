/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import edit from './edit';

var align_supports = false;
if( global_localized.supports !== null && typeof global_localized.supports.align != 'undefined' ) {
    var align_supports = global_localized.supports.align;
}

registerBlockType( 'custom/wpe-container', {
    title: 'Container',
    category: 'wpe-layout',
    icon: <svg enableBackground="new 0 0 24 24" height="24px" id="Layer_1" version="1.1" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg"><g><g><g><g><path d="M12,10.9c-0.1,0-0.2,0-0.2-0.1L3.5,6.1C3.4,6,3.3,5.8,3.3,5.6c0-0.2,0.1-0.3,0.2-0.4l8.2-4.7c0.2-0.1,0.3-0.1,0.5,0      l8.2,4.7c0.2,0.1,0.2,0.3,0.2,0.4S20.6,6,20.5,6.1l-8.2,4.7C12.2,10.8,12.1,10.9,12,10.9z M4.8,5.6L12,9.8l7.2-4.2L12,1.5      L4.8,5.6z"/></g><g><path d="M10.4,23.6c-0.1,0-0.2,0-0.2-0.1l-8.2-4.7c-0.2-0.1-0.3-0.3-0.3-0.4V8.9c0-0.2,0.1-0.3,0.2-0.4c0.2-0.1,0.3-0.1,0.5,0      l8.2,4.7c0.2,0.1,0.2,0.3,0.2,0.4v9.5c0,0.2-0.1,0.3-0.2,0.4C10.5,23.6,10.5,23.6,10.4,23.6z M2.7,18.1l7.2,4.2v-8.3L2.7,9.8      V18.1z"/></g><g><path d="M13.6,23.6c-0.1,0-0.2,0-0.2-0.1c-0.2-0.1-0.2-0.3-0.2-0.4v-9.5c0-0.2,0.1-0.3,0.2-0.4l8.2-4.7c0.2-0.1,0.3-0.1,0.5,0      c0.2,0.1,0.2,0.3,0.2,0.4v9.5c0,0.2-0.1,0.3-0.3,0.4l-8.2,4.7C13.8,23.6,13.7,23.6,13.6,23.6z M14.1,13.9v8.3l7.2-4.2V9.8      L14.1,13.9z"/></g></g></g></g></svg>,
    supports: {
        align: align_supports,
        lightBlockWrapper: true,
        anchor: true
    },
    attributes: {
        style: {
            type: 'string',
            default: false
        },
        align: {
            type: 'string'
        },
        backgroundFile: {
            type: 'number'
        },
        backgroundType: {
            type: 'string'
        },
        padding: {
            type: 'object'
        },
        margin: {
            type: 'object'
        }
    },
    edit: edit(global_localized.container),
    save: () => {

        const blockProps = useBlockProps.save();
        const innerBlocksProps = useInnerBlocksProps.save( blockProps );
    
        return <div {...innerBlocksProps} />
    },
} )

/**
 * Used to filter the block settings.
 * It receives the block settings and the name of the registered block as arguments.
 * Since v6.1.0 this filter is also applied to each of a block’s deprecated settings.
 * 
 */
function updateSettingsParent( settings, name ) {

    if ( name == 'custom/wpe-container' || name == 'custom/wpe-grid' || name == 'custom/wpe-column' || typeof settings.parent != 'undefined' ) {
        return settings;
    }

    return lodash.assign( {}, settings, {
        parent: [ 'custom/wpe-container', 'custom/wpe-column' ]
    } );
}

if( global_localized?.container?.is_main ) {
    addFilter( 'blocks.registerBlockType', 'wpextend/updateSettingsParent', updateSettingsParent );
}