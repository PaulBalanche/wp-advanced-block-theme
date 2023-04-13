/**
 * WordPress Dependencies
 */
import { SelectControl } from '@wordpress/components';

const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody } = wp.components;

function addAttributesCoreGallery( settings, name ) {
            
    if ( name !== 'core/gallery' ) {
        return settings;
    }

    return lodash.assign( {}, settings, {
        attributes: lodash.assign( {}, settings.attributes, {
            galleryType:{ 
                type: 'string'
            }
        } )
    } );
}
addFilter(
    'blocks.registerBlockType',
    'core/gallery',
    addAttributesCoreGallery
);

var galleryTypeOptions = [ { label: 'Default', value: 'default' } ];

if( global_localized.galleryType && global_localized.galleryType != 'undefined' )
    galleryTypeOptions = galleryTypeOptions.concat( global_localized.galleryType );

const addAttributesCoreGallerywithInspectorControls =  createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {

        if( props.name == 'core/gallery' ) {

            const {
                attributes,
                setAttributes
            } = props;
    
            return (
                <Fragment>
                    <BlockEdit { ...props } />
                    <InspectorControls>
                        <PanelBody>
                            <SelectControl
                                label="Type"
                                value={ attributes.galleryType }
                                options={ galleryTypeOptions }
                                onChange={ ( value ) => {
                                    setAttributes( { galleryType: value } )
                                } }
                            />
                        </PanelBody>
                    </InspectorControls>
                </Fragment>
            );
        }

        return <BlockEdit { ...props } />;
    };
}, "withInspectorControl" )

addFilter(
    'editor.BlockEdit',
    'core/gallery',
    addAttributesCoreGallerywithInspectorControls
)