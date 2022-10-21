/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import {
    InnerBlocks,
    InspectorControls,
    MediaPlaceholder,
    useBlockProps,
    useInnerBlocksProps,
    __experimentalBlockVariationPicker
} from '@wordpress/block-editor';

import {
    PanelBody,
    SelectControl,
    Button
} from '@wordpress/components';

import { withSelect } from '@wordpress/data';

import { MarginControls, generateMarginClassName } from '../../../component-block-master/src/_marginControls.js';


/**
 * registerBlockType edit function
 */
class WpeContainer extends Component {

	constructor() {
        super( ...arguments );
    }

    render() {

        var {
			attributes,
			setAttributes,
            containerConfig,
            backgroundData,
            innerBlocksProps,
            experimentalDeviceType,
            theme_spec
        } = this.props;

        // Padding & Margin
        // const className = generateMarginClassName(this.props);
        // if( className ) {
        //     innerBlocksProps.className += className;
        // }
        const className = '';
        
        // Section background
        const titleMediaPlaceholder = ( backgroundData !== null && typeof backgroundData != 'undefined' ) ? backgroundData.media_type == 'image' ? 'Edit image' : backgroundData.title.raw + ' (' + backgroundData.mime_type + ')' : 'Image/Video';
        const mediaPreview = !! backgroundData && (
            <img
                alt={ titleMediaPlaceholder }
                title={ titleMediaPlaceholder }
                className={ 'edit-image-preview' }
                src={ backgroundData.media_type == 'image' ? backgroundData.media_details.sizes.thumbnail.source_url : '/wp/wp-includes/images/media/video.png' }
            />
        );
        const removeButton = !! backgroundData && (
            <Button isLarge onClick={ () => { setAttributes( { backgroundFile: null, backgroundType: null } ); } }>
                { 'Remove' }
            </Button>
        );
        const mediaPlaceholder = (
            <MediaPlaceholder
                onSelect={
                    ( el ) => {
                        setAttributes( { backgroundFile: el.id, backgroundType: el.type } );
                    }
                }
                allowedTypes= { [ 'image', 'video' ] }
                multiple= { false }
                labels={ { title: titleMediaPlaceholder } }
                mediaPreview = { mediaPreview }
                value={ { id: attributes.backgroundFile } }
                disableMediaButtons={ false }>
                { removeButton }
            </MediaPlaceholder>
        );



        /**
         * Container Style
         * 
         */
        var containerStyleSelect = '';
        if( containerConfig && containerConfig.style && typeof containerConfig.style != 'undefined' ) {

            var styleContainer = containerConfig.style.map( function(value) {
                return { label: value.label, value: value.value }
            } );
            containerStyleSelect = (
                <PanelBody title={ 'Style' } initialOpen={ false }>
                    <SelectControl
                        label="Style"
                        value={ attributes.style }
                        options={ [ { label: 'Default', value: 'null' } ].concat(styleContainer) }
                        onChange={ ( value ) => 
                            setAttributes( { style: ( value == 'null' ) ? false : value } )
                        }
                    />
                </PanelBody>
            );

            if( typeof attributes.style != 'undefined' && attributes.style != '' )
                innerBlocksProps.className += ' st-' + attributes.style;
        }

        /**
         * Render
         */
        return (
            <>
                <InspectorControls>
                    { containerStyleSelect }
                    <PanelBody title={ 'Background' } initialOpen={ false }>
                        { mediaPlaceholder }
                    </PanelBody>
                    <MarginControls props={ this.props } deviceType={ experimentalDeviceType } margin={ ( theme_spec?.margin ) ? theme_spec?.margin : null } />
                </InspectorControls>
                <div { ...innerBlocksProps } />
            </>
        );
    }
}

export default ( containerConfig, theme_spec ) => compose( [
	withSelect( ( select, props ) => {

        const { __experimentalGetPreviewDeviceType } = select( 'core/edit-post' );

        return {
            containerConfig: containerConfig,
            theme_spec,
            innerBlocksProps: useInnerBlocksProps( useBlockProps( { className: '' } ), { renderAppender: InnerBlocks.ButtonBlockAppender } ),
            backgroundData: ! props.attributes.backgroundFile ? null : select('core').getEntityRecord('postType', 'attachment', props.attributes.backgroundFile ),
            experimentalDeviceType: __experimentalGetPreviewDeviceType()
        };
    } ),
] )( WpeContainer );