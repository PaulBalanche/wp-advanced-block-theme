/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { Component, useRef } from '@wordpress/element';
import { compose, withState } from '@wordpress/compose';
import {
    InnerBlocks,
    InspectorControls,
    BlockControls,
    useBlockProps,
    useInnerBlocksProps,
    __experimentalBlockVariationPicker,
    __experimentalBlock as Block,
    store as blockEditorStore
} from '@wordpress/block-editor';

import {
    Panel,
    PanelBody,
    PanelRow,
    Button,
    ButtonGroup,
    RangeControl,
    Dropdown,
    ToolbarGroup,
    MenuGroup,
    MenuItem,
    HorizontalRule,
    TabPanel
} from '@wordpress/components';

import { withSelect, dispatch } from '@wordpress/data';
import { get, map, times } from 'lodash';

import { MarginControls, generateMarginClassName } from '../../../component-block-master/src/_marginControls';

import { getLayouts, setBodyDevice, getBodyDevice } from '../../../../src/devices.js';

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
class WpeGrid extends Component {

	constructor() {
        super( ...arguments );

        this.state = {
            selectedDevice: null,
            defaultClassName: null
		};
    }

    getDeviceType() {
		return this.state.selectedDevice;
    }

    render() {

        var {
			attributes,
            setAttributes,
            clientId,
            inner_blocks,
            innerBlocksProps,
            countColumns,
            blockVariations,
            blockType,
            experimentalDeviceType,
            setState,
            isSelectedBlock,
            isParentOfSelectedBlock
        } = this.props;

        const { replaceInnerBlocks } = dispatch( blockEditorStore );

        if( this.state.defaultClassName === null )
            this.state.defaultClassName = innerBlocksProps.className;

        // Device
        // const deviceType = this.getDeviceType();
        // const deviceType = experimentalDeviceType.toLowerCase();
        // if( typeof deviceType != 'undefined' && deviceType != 'undefined' ) {
        //     // innerBlocksProps.className = this.state.defaultClassName + ' ' + deviceType;
        //     innerBlocksProps.className += ' ' + deviceType;
        // }
 
        /**
         * Define innerBlocks
         */
        if( typeof(inner_blocks ) != 'object' || ( typeof(inner_blocks ) == 'object' && countColumns == 0 ) ) {

            return (
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
                                dispatch('core/editor').updateBlockAttributes( clientId, nextVariation.attributes );
                            }
                        } }
                    />
                </div>
            );
        }
        else {

            /**
             * Add or remove columns
             * 
             */
            if( attributes.gridCountColumns > countColumns ) {

                let numberOfColumnsToAdd = attributes.gridCountColumns - countColumns;
                let inner_blocks_new = [
                    ...inner_blocks,
                    ...times( numberOfColumnsToAdd, () => {
                        return createBlock( 'custom/wpe-column')
                    } )
                ];
                replaceInnerBlocks(clientId, inner_blocks_new, false);
            }
            else if( attributes.gridCountColumns < countColumns ) {
            
                let inner_blocks_new = inner_blocks.slice(0, attributes.gridCountColumns);
                replaceInnerBlocks(clientId, inner_blocks_new, false);
            }


            


            let deviceButtonGroupClassName = ( isSelectedBlock || isParentOfSelectedBlock ) ? ' is-selected' : '';

            /**
             * Render edit
             */
            var editDisplay = (
                <>
                    <div className={ "deviceButtonGroup" + deviceButtonGroupClassName } >
                        <ButtonGroup>
                            { getLayouts().map( ( layout ) => {
                                return (
                                    <Button
                                        key={ "layoutButton_" + layout.value + "_" + clientId }
                                        isPressed={ getBodyDevice() == layout.value }
                                        onClick={ () => {
                                            setBodyDevice( layout.value );
                                            inner_blocks.forEach( ( elt ) => {
                                                dispatch('core/editor').updateBlockAttributes( elt.clientId, { updated: true } );
                                            });
                                        } }
                                    >
                                        { layout.value }
                                    </Button>
                                );
                            } ) }
                        </ButtonGroup>
                    </div>
                    <div { ...innerBlocksProps } />
                </>
            )
        }

        // InspectorControls
        let inspectorControls = '';
        if( ! attributes.gridLocked ) {

            inspectorControls = (
                <InspectorControls>
                    <PanelBody>
                        <RangeControl
                            label="Number of cells"
                            value={ attributes.gridCountColumns }
                            onChange={ ( value ) => setAttributes( { gridCountColumns: value } ) }
                            min={ 1 }
                            max={ attributes.gridCountColumns + 1 }
                        />
                    </PanelBody>
                    <MarginControls props={ this.props } deviceType={ experimentalDeviceType } />
                </InspectorControls>
            );
        }

        /**
         * Render
         * 
         */
        return (
            <>
                { inspectorControls }
                { editDisplay }
            </>
        );
    }
}

export default () => compose( [
	withSelect( ( select, props ) => {

        const { __experimentalGetPreviewDeviceType } = select( 'core/edit-post' );

        return {
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
] )( WpeGrid );