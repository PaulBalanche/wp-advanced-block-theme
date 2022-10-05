/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import {
    InnerBlocks,
    InspectorControls,
    useBlockProps,
    useInnerBlocksProps,
    __experimentalBlockVariationPicker,
    __experimentalBlock as Block
} from '@wordpress/block-editor';

import {
    PanelBody,
    RangeControl,
    TabPanel
} from '@wordpress/components';

import { select, withSelect } from '@wordpress/data';

import { getLayouts, setBodyDevice, getBodyDevice } from '../../../../src/devices.js';

/**
 * registerBlockType edit function
 * 
 */
class WpeColumn extends Component {
 
    constructor( attr ) {
        super( ...arguments );
    }

    getLayout( key, device ) {
       
        if( typeof this.props.attributes.layout == 'undefined' ) { return 1; }
        if( typeof this.props.attributes.layout[device] == 'undefined' ) { return 1; }
        if( typeof this.props.attributes.layout[device][key] == 'undefined' ) { return 1; }

        return this.props.attributes.layout[device][key];
    }

    setLayout( key, value, device ) {
       
        let curentLayout = ( typeof this.props.attributes.layout == 'undefined' ) ? {} : this.props.attributes.layout;
        if( typeof curentLayout[device] == 'undefined' ) { curentLayout[device] = {}; }
        curentLayout[device][key] = value;

        this.setAttributes( { layout: null} );
        this.setAttributes( { layout: curentLayout} );
    }

    setAttributes( attributes ) {
        this.props.setAttributes( attributes );
    }

    render() {

        var { innerBlocksProps } = this.props;
        
        innerBlocksProps.style = {
            gridColumnStart: this.getLayout( 'columnStart', getBodyDevice() ),
            gridColumnEnd: this.getLayout( 'columnStart', getBodyDevice() ) + this.getLayout( 'width', getBodyDevice() ),
            gridRowStart: this.getLayout( 'rowStart', getBodyDevice() ),
            gridRowEnd: this.getLayout( 'rowStart', getBodyDevice() ) + this.getLayout( 'height', getBodyDevice() )
        };

        /**
         * Layout panel
         * 
         */
        let deviceLayout = {};

        getLayouts().forEach( ( layout ) => {

            deviceLayout[ layout.value ] = (
                <>
                    <RangeControl
                        label="Column start"
                        value={ this.getLayout( 'columnStart', layout.value ) }
                        onChange={ ( value ) => this.setLayout( 'columnStart', Number.parseInt(value), layout.value ) }
                        min={ 1 }
                        max={ this.getLayout( 'columnStart', layout.value ) + 1 }
                    />
                    <RangeControl
                        label="Width"
                        value={ this.getLayout( 'width', layout.value ) }
                        onChange={ ( value ) => this.setLayout( 'width', Number.parseInt(value), layout.value ) }
                        min={ 1 }
                        max={ this.getLayout( 'width', layout.value ) + 1 }
                    />
                    <RangeControl
                        label="Row start"
                        value={ this.getLayout( 'rowStart', layout.value ) }
                        onChange={ ( value ) => this.setLayout( 'rowStart', Number.parseInt(value), layout.value ) }
                        min={ 1 }
                        max={ this.getLayout( 'rowStart', layout.value ) + 1 }
                    />
                    <RangeControl
                        label="Height"
                        value={ this.getLayout( 'height', layout.value ) }
                        onChange={ ( value ) => this.setLayout( 'height', Number.parseInt(value), layout.value ) }
                        min={ 1 }
                        max={ this.getLayout( 'height', layout.value ) + 1 }
                    />
                </>
            );
        });

        let panelDeviceLayout = (
            <PanelBody title={ 'Layout' } initialOpen={ true }>
                <TabPanel
                    className="padding-tab-panel"
                    activeClass="active-tab"
                    // onSelect={ (tabName) => wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType( tabName.charAt(0).toUpperCase() + tabName.slice(1) ) }
                    onSelect={ (tabName) => setBodyDevice( tabName, this ) }
                    tabs={ getLayouts().map( (layout) => ( {
                        name: layout.value,
                        title: layout.label,
                        className: 'tab-' + layout.value,
                    } ) ) }
                    initialTabName={ getBodyDevice() }
                >
                    { ( tab ) => <>{ deviceLayout[tab.name] }</> }
                </TabPanel>
            </PanelBody>
        );

        let inspectorControls = (
            <InspectorControls>
                { panelDeviceLayout }
            </InspectorControls>
        );

        // Render
        return (
            <>
                { inspectorControls }
                <div { ...innerBlocksProps } />
            </>
        );
    }
}

export default () => compose( [
    withSelect( () => {

        return {
            innerBlocksProps: useInnerBlocksProps( useBlockProps( { className: '' } ), { renderAppender: InnerBlocks.ButtonBlockAppender } ),
        };
    } ),
] )( WpeColumn );