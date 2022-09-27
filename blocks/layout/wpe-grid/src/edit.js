/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { Component, useRef } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import {
    InnerBlocks,
    InspectorControls,
    BlockControls,
    useBlockProps,
    useInnerBlocksProps,
    __experimentalBlockVariationPicker,
    __experimentalBlock as Block
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

import { getLayouts, setBodyDevice } from '../../../../src/devices.js';

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
            selectedDevice: getLayouts()[0].value,
            defaultClassName: null
		};
    }

    getDeviceType() {
		return this.state.selectedDevice;
    }

    setDeviceType(deviceType) {
        this.setState( { selectedDevice: deviceType } );
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
            experimentalDeviceType
        } = this.props;

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
                                dispatch( 'core/block-editor' ).replaceInnerBlocks(
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
                        return createBlock('custom/wpe-column')
                    } )
                ];
                dispatch( 'core/block-editor' ).replaceInnerBlocks(clientId, inner_blocks_new, false);
                inner_blocks = inner_blocks_new;
            }
            else if( attributes.gridCountColumns < countColumns ) {
            
                let inner_blocks_new = inner_blocks.slice(0, attributes.gridCountColumns);
                dispatch( 'core/block-editor' ).replaceInnerBlocks(clientId, inner_blocks_new, false);
            }










            


            /**
             * Layout panel
             * 
             */
            var deviceLayout = {};

            getLayouts().forEach( ( layout ) => {

                deviceLayout[ layout.value ] = [];

                inner_blocks.forEach( ( element, index ) => {
                    deviceLayout[ layout.value ].push(
                        <PanelBody
                            title={ "Cell " + ( index + 1 ) }
                            initialOpen={ false }
                            key={ layout.value + "-" + index }
                        >
                            <RangeControl
                                label="Column start"
                                value={ element.attributes['columnStart' + layout.attributeName] }
                                onChange={ ( value ) => updateColumnAttribute(index, 'columnStart' + layout.attributeName, Number.parseInt(value)) }
                                min={ 1 }
                                max={ element.attributes['columnStart' + layout.attributeName] + 1 }
                            />
                            <RangeControl
                                label="Width"
                                value={ element.attributes['width' + layout.attributeName] }
                                onChange={ ( value ) => updateColumnAttribute(index, 'width' + layout.attributeName, Number.parseInt(value)) }
                                min={ 1 }
                                max={ element.attributes['width' + layout.attributeName] + 1 }
                            />
                            <RangeControl
                                label="Row start"
                                value={ element.attributes['rowStart' + layout.attributeName] }
                                onChange={ ( value ) => updateColumnAttribute(index, 'rowStart' + layout.attributeName, Number.parseInt(value)) }
                                min={ 1 }
                                max={ element.attributes['rowStart' + layout.attributeName] + 1 }
                            />
                            <RangeControl
                                label="Height"
                                value={ element.attributes['height' + layout.attributeName] }
                                onChange={ ( value ) => updateColumnAttribute(index, 'height' + layout.attributeName, Number.parseInt(value)) }
                                min={ 1 }
                                max={ element.attributes['height' + layout.attributeName] + 1 }
                            />
                        </PanelBody>
                    );
                });
            });

            var panelDeviceLayout = (
                <PanelBody title={ 'Layout' } initialOpen={ false }>
                    <TabPanel
                        className="padding-tab-panel"
                        activeClass="active-tab"
                        // onSelect={ (tabName) => wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType( tabName.charAt(0).toUpperCase() + tabName.slice(1) ) }
                        onSelect={ (tabName) => setBodyDevice(tabName) }
                        tabs={ getLayouts().map( (layout) => ({
                            name: layout.value,
                            title: layout.label,
                            className: 'tab-' + layout.value,
                        }) ) }
                    >
                        { ( tab ) => <>{ deviceLayout[tab.name] }</> }
                    </TabPanel>
                </PanelBody>
            );








            

            /**
             * Render edit
             */
            var editDisplay = (
                <div { ...innerBlocksProps } />
            )
        }

        function updateColumnAttribute(indexFunction, attributeName, newValue ) {

            inner_blocks.forEach( ( element, index ) => {

                if( index == indexFunction ) {

                    // Update the child block's attributes
                    if( element.attributes[attributeName] != newValue )
                        dispatch('core/editor').updateBlockAttributes(element.clientId, { [attributeName]: newValue });
                }
            });
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
                    { panelDeviceLayout }
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
            experimentalDeviceType: __experimentalGetPreviewDeviceType()
        };
    } ),
] )( WpeGrid );