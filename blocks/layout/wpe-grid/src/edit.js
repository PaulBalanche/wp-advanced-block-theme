/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { WpeComponentBase } from '../../../../src/js/WpeComponentBase';
import {
    useState,
    Fragment
} from '@wordpress/element';
import { compose } from '@wordpress/compose';
import {
    useBlockProps,
    useInnerBlocksProps,
    InspectorControls,
    __experimentalBlockVariationPicker,
    __experimentalBlock as Block,
    store as blockEditorStore
} from '@wordpress/block-editor';

import {
    PanelBody,
    Button,
    ButtonGroup,
    RangeControl
} from '@wordpress/components';

import { withSelect, withDispatch, dispatch } from '@wordpress/data';
import { get, map, times } from 'lodash';


import { Devices } from '../../../../src/js/Devices';

/**
 * Add some columns in wpe-container based on variation selected
 *
 */
function createBlocksFromInnerBlocksTemplate ( innerBlocksTemplate ) {

    return map(
        innerBlocksTemplate,
        ( { name, attributes } ) =>
            createBlock(
                name,
                attributes
            )
    );
}

/**
 * registerBlockType edit function
 */
class WpeGrid extends WpeComponentBase {

	constructor() {
        super( ...arguments );
    }

    renderInspectorControls() {

        // InspectorControls
        if( ! this.getAttribute('gridLocked') ) {

            let gridCountColumns = parseInt( this.getAttribute('gridCountColumns') );

            return <div
                key={ this.props.clientId + "-InspectorControls" }
            >
                <PanelBody
                    key={ "inspectorControlsPanelBody_" + this.props.clientId }
                >
                    <RangeControl
                        label="Number of cells"
                        value={ gridCountColumns }
                        onChange={ ( value ) => this.setAttributes( { gridCountColumns: value } ) }
                        min={ 1 }
                        max={ gridCountColumns + 1 }
                    />
                </PanelBody>
            </div>;
        }

        return null;
    }

    liveRendering() {

        var {
            clientId,
            inner_blocks,
            countColumns,
            blockVariations,
            blockType,
            isSelectedBlock,
            isParentOfSelectedBlock,
            replaceInnerBlocks
        } = this.props;

        const { children, ...innerBlocksProps } = this.props.innerBlocksProps;

        /**
         * Define innerBlocks
         */
        if( typeof(inner_blocks ) != 'object' || ( typeof(inner_blocks ) == 'object' && countColumns == 0 ) ) {

            return <>
                <div { ...innerBlocksProps }>
                    <__experimentalBlockVariationPicker
                        icon={ get( blockType, [ 'icon', 'src' ] ) }
                        label={ get( blockType, [ 'title' ] ) }
                        variations={ blockVariations }
                        onSelect={ ( nextVariation ) => {
                            if ( nextVariation.innerBlocks ) {
                                replaceInnerBlocks(
                                    clientId,
                                    createBlocksFromInnerBlocksTemplate( nextVariation.innerBlocks ),
                                    false
                                );
                            }
                            if( nextVariation.attributes ) {
                                dispatch('core/block-editor').updateBlockAttributes( clientId, nextVariation.attributes );
                            }
                        } }
                    />
                </div>
            </>;
        }
        else {

            let gridCountColumns = parseInt( this.getAttribute('gridCountColumns') );

            /**
             * Add or remove columns
             * 
             */
            if( gridCountColumns > countColumns ) {

                // Define rowStart fo the new colums added

                let initLayout = {};
                Object.keys( Devices.getInstance().getMediaQueries() ).forEach( ( layout ) => {

                    initLayout[ layout ] = {
                        columnStart: 1,
                        width: 1,
                        rowStart: 2,
                        height: 1
                    };
                    inner_blocks.forEach(element => {
                        if( element.attributes.layout && element.attributes.layout[ layout ] ) {

                            let currentRowStart = ( element.attributes.layout[ layout ].rowStart && element.attributes.layout[ layout ].rowStart ) ? element.attributes.layout[ layout ].rowStart : 1
                            let currentHeight = ( element.attributes.layout[ layout ].height && element.attributes.layout[ layout ].height ) ? element.attributes.layout[ layout ].height : 1;
                            let currentRowEnd = currentRowStart + currentHeight;
                            if( currentRowEnd > initLayout[ layout ].rowStart ) {
                                initLayout[ layout ].rowStart = currentRowEnd;
                            }
                        }
                    });                    
                } );

                let numberOfColumnsToAdd = gridCountColumns - countColumns;
                let inner_blocks_new = [
                    ...inner_blocks,
                    ...times( numberOfColumnsToAdd, () => {
                        return createBlock( 'custom/wpe-column', {
                            layout: initLayout
                        } )
                    } )
                ];

                replaceInnerBlocks( clientId, inner_blocks_new, false );
            }
            else if( gridCountColumns < countColumns ) {
            
                let inner_blocks_new = inner_blocks.slice( 0, gridCountColumns );
                replaceInnerBlocks( clientId, inner_blocks_new, false );
            }

            return <div {...innerBlocksProps}>
                { this.renderEditZone() }
                <div className='gridContainer'>{ children }</div>
            </div>
        }
    }
}

export default ( block_spec, theme_spec ) => compose( [
	withSelect( ( select, props ) => {

        const { __experimentalGetPreviewDeviceType } = select( 'core/edit-post' );

        return {
            block_spec,
            theme_spec,
            backgroundData: ! props.attributes.backgroundFile ? null : select('core').getEntityRecord('postType', 'attachment', props.attributes.backgroundFile ),
            inner_blocks: select('core/block-editor').getBlocks(props.clientId),
            innerBlocksProps: useInnerBlocksProps( useBlockProps( { className: '' } ), { renderAppender: false } ),
            countColumns: select( 'core/block-editor' ).getBlockCount(props.clientId),
            blockVariations: select('core/blocks').getBlockVariations(props.name, 'block'),
            blockType: select('core/blocks').getBlockType(props.name),
            experimentalDeviceType: __experimentalGetPreviewDeviceType(),
            isSelectedBlock: select('core/block-editor').isBlockSelected(props.clientId),
            isParentOfSelectedBlock: select('core/block-editor').hasSelectedInnerBlock(props.clientId, true)
        };
    } ),
    withDispatch( ( dispatch ) => {
        
		const { replaceInnerBlocks } = dispatch( blockEditorStore );

		return {
			replaceInnerBlocks
		};
	} )
] )( WpeGrid );