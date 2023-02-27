/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { WpeComponentBase } from '../../../../src/js/Models/WpeComponentBase';
import { compose } from '@wordpress/compose';
import {
    useBlockProps,
    useInnerBlocksProps,
    __experimentalBlockVariationPicker,
    __experimentalBlock as Block,
    store as blockEditorStore
} from '@wordpress/block-editor';

import {
    MenuItem,
    Dashicon
} from '@wordpress/components';

import {
    plus
} from '@wordpress/icons';

import { withSelect, withDispatch, dispatch } from '@wordpress/data';
import { get, map, times } from 'lodash';


import { Devices } from '../../../../src/js/Singleton/Devices';

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

    addColumn() {

        // Define rowStart fo the new colums added
        let initLayout = {};
        Object.keys( Devices.getInstance().getMediaQueries() ).forEach( ( layout ) => {

            initLayout[ layout ] = {
                columnStart: 1,
                width: 1,
                rowStart: 2,
                height: 1
            };
            this.props.inner_blocks.forEach(element => {
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

        let inner_blocks_new = [
            ...this.props.inner_blocks,
            createBlock( 'custom/wpe-column', {
                layout: initLayout
            } )
        ];

        this.props.replaceInnerBlocks( this.props.clientId, inner_blocks_new, false );
    }

    renderSpecificTools() {
        
        return <MenuItem
            key={ this.props.clientId + "-toolsDropdownMenu-SpecificTools-addColumn" }
            icon={ plus }
            onClick={ () => this.addColumn() }
        >
            Add column
        </MenuItem>
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
        innerBlocksProps.key = 'innerBlocksProps_' + clientId;
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

            return <div {...innerBlocksProps}>
                { this.renderEditZone() }
                <div className='gridContainer'>
                    { children }
                </div>
                <div className='containerAddColumn' onClick={ () => this.addColumn() }>
                    <Dashicon icon="plus" />Add column
                </div>
            </div>
        }
    }
}

export default ( block_spec, theme_spec ) => compose( [
	withSelect( ( select, props ) => {

        const { __experimentalGetPreviewDeviceType } = select( 'core/edit-post' );

        // Detect if inside a reusable block
        const getBlockParents = select('core/block-editor').getBlockParents(props.clientId);
        const parentsBlock = [];
        for( var i in getBlockParents ) {

            parentsBlock.push( select('core/block-editor').getBlock( getBlockParents[i] ) );
        }

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
            isParentOfSelectedBlock: select('core/block-editor').hasSelectedInnerBlock(props.clientId, true),
            parentsBlock
        };
    } ),
    withDispatch( ( dispatch ) => {
        
		const {
            replaceInnerBlocks,
            removeBlock,
            duplicateBlocks,
            moveBlocksUp,
            moveBlocksDown
        } = dispatch( blockEditorStore );

		return {
			replaceInnerBlocks,
            removeBlock,
            duplicateBlocks,
            moveBlocksUp,
            moveBlocksDown
		};
	} )
] )( WpeGrid );