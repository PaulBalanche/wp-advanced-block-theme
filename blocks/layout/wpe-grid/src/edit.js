/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { Component, useState } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import {
    InspectorControls,
    useBlockProps,
    useInnerBlocksProps,
    __experimentalBlockVariationPicker,
    __experimentalBlock as Block,
    store as blockEditorStore
} from '@wordpress/block-editor';

import {
    Panel,
    PanelBody,
    Button,
    ButtonGroup,
    RangeControl,
    Placeholder,
    ToggleControl
} from '@wordpress/components';

import { withSelect, withDispatch, dispatch } from '@wordpress/data';
import { get, map, times } from 'lodash';

import { MarginControls } from '../../../component-block-master/src/_marginControls.js';

import { getLayouts, setBodyDevice, getBodyDevice, initContainer } from '../../../../js/devices';
import { renderControl } from '../../../../js/attributes';

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
            configMode: false
        };
    }

    componentDidUpdate() {
        initContainer();
    }

    render() {

        var {
            block_spec,
            theme_spec,
			attributes,
            setAttributes,
            clientId,
            inner_blocks,
            innerBlocksProps,
            countColumns,
            blockVariations,
            blockType,
            experimentalDeviceType,
            isSelectedBlock,
            isParentOfSelectedBlock,
            replaceInnerBlocks
        } = this.props;

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
                                dispatch('core/block-editor').updateBlockAttributes( clientId, nextVariation.attributes );
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

                // Define rowStart fo the new colums added

                let initLayout = {};
                getLayouts().forEach( ( layout ) => {

                    initLayout[ layout.value ] = {
                        columnStart: 1,
                        width: 1,
                        rowStart: 2,
                        height: 1
                    };
                    inner_blocks.forEach(element => {
                        if( element.attributes.layout && element.attributes.layout[ layout.value ] ) {

                            let currentRowStart = ( element.attributes.layout[ layout.value ].rowStart && element.attributes.layout[ layout.value ].rowStart ) ? element.attributes.layout[ layout.value ].rowStart : 1
                            let currentHeight = ( element.attributes.layout[ layout.value ].height && element.attributes.layout[ layout.value ].height ) ? element.attributes.layout[ layout.value ].height : 1;
                            let currentRowEnd = currentRowStart + currentHeight;
                            if( currentRowEnd > initLayout[ layout.value ].rowStart ) {
                                initLayout[ layout.value ].rowStart = currentRowEnd;
                            }
                        }
                    });                    
                } );

                let numberOfColumnsToAdd = attributes.gridCountColumns - countColumns;
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
            else if( attributes.gridCountColumns < countColumns ) {
            
                let inner_blocks_new = inner_blocks.slice(0, attributes.gridCountColumns);
                replaceInnerBlocks( clientId, inner_blocks_new, false );
            }


            


            let deviceButtonGroupClassName = ( isSelectedBlock || isParentOfSelectedBlock ) ? ' is-selected' : '';







            /**
             * Custom layout props
             * 
             */
            let InspectorControlsCustomProps = [];
            if( typeof block_spec.props == 'object' ) {

                for( const [key, value] of Object.entries(block_spec.props) ) {

                    if( typeof value != 'object' || value == null )
                        continue;

                    InspectorControlsCustomProps.push( renderControl( value, [ key ], { [key]: attributes[key] }, clientId ) );

                    // let InspectorControlsCustomPropsTemp = '';
                    // switch( value.type ) {

                    //     case 'string':
                    //         InspectorControlsCustomPropsTemp = renderTextControl( key + "_" + clientId, value.label, [ key ], attributes[key], attributes[key], false, false, clientId );
                    //         break;

                    //     case 'select':
                    //         InspectorControlsCustomPropsTemp = renderSelectControl( key + "_" + clientId, value.label, value.options, [ key ], attributes[key], attributes[key], false, false, clientId );
                    //         break;
                    // };

                    // InspectorControlsCustomProps.push(
                    //     <div
                    //         key={ key + "_" + clientId + "-basicContainer"}
                    //         className="basicField"
                    //     >
                    //         { value.label }
                    //         { InspectorControlsCustomPropsTemp }
                    //     </div>
                    // );
                }

                // Remove last HorizontalRule
                InspectorControlsCustomProps.pop();

                if( InspectorControlsCustomProps.length > 0 ) {
                    InspectorControlsCustomProps = (
                        <Panel
                            key={ clientId + "-panel" }
                        >
                            <PanelBody
                                key={ clientId + "-PanelBody" }
                                title={ 'Custom props' }
                                initialOpen={ false }
                            >
                                <div
                                    key={ clientId + "-panelBodyDivObject" }
                                    className="objectField components-base-control"
                                >
                                    <div
                                        key={ clientId + "-panelBodySubDivObject" }
                                        className="objectField-content"
                                    > 
                                        { InspectorControlsCustomProps }
                                    </div>
                                </div>
                            </PanelBody>
                        </Panel>
                    );
                }
            }






            const MyToggleControl = <div className="toggleControlComponentMode">
                <ToggleControl
                    key={ clientId + "-ToggleControlComponentMode" }
                    label="Mode"
                    help={
                        this.state.configMode
                            ? 'Configuration'
                            : 'Live'
                    }
                    checked={ this.state.configMode }
                    onChange={ () => {
                        this.setState( { configMode: ! this.state.configMode } )
                    } }
                />
            </div>;

            const EditDisplay = ( this.state.configMode ) ?
                <Placeholder
                    key={ clientId + "-placeholder" }
                    label={ "Grid" }
                    isColumnLayout={ true }
                    className="wpe-component_edit_placeholder"
                >
                    <MarginControls props={ this.props } deviceType={ experimentalDeviceType } margin={ ( theme_spec?.margin ) ? theme_spec?.margin : null } />
                    { InspectorControlsCustomProps }
                </Placeholder>
            :
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
                                                dispatch('core/block-editor').updateBlockAttributes( elt.clientId, { updated: true } );
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
            ;
            
            /**
             * Render edit
             */
            var editDisplay = (
                <>
                    { MyToggleControl }
                    { EditDisplay }
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