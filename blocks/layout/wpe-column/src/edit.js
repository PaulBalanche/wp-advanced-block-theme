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

        let currentBodyDevice = getBodyDevice();
        
        innerBlocksProps.style = {
            gridColumnStart: this.getLayout( 'columnStart', currentBodyDevice ),
            gridColumnEnd: this.getLayout( 'columnStart', currentBodyDevice ) + this.getLayout( 'width', currentBodyDevice ),
            gridRowStart: this.getLayout( 'rowStart', currentBodyDevice ),
            gridRowEnd: this.getLayout( 'rowStart', currentBodyDevice ) + this.getLayout( 'height', currentBodyDevice )
        };
        
        let panelDeviceLayout = (
            <PanelBody title={ 'Layout (' + currentBodyDevice + ')' } initialOpen={ true }>
                <RangeControl
                    label="Column start"
                    value={ this.getLayout( 'columnStart', currentBodyDevice ) }
                    onChange={ ( value ) => this.setLayout( 'columnStart', Number.parseInt(value), currentBodyDevice ) }
                    min={ 1 }
                    max={ this.getLayout( 'columnStart', currentBodyDevice ) + 1 }
                />
                <RangeControl
                    label="Width"
                    value={ this.getLayout( 'width', currentBodyDevice ) }
                    onChange={ ( value ) => this.setLayout( 'width', Number.parseInt(value), currentBodyDevice ) }
                    min={ 1 }
                    max={ this.getLayout( 'width', currentBodyDevice ) + 1 }
                />
                <RangeControl
                    label="Row start"
                    value={ this.getLayout( 'rowStart', currentBodyDevice ) }
                    onChange={ ( value ) => this.setLayout( 'rowStart', Number.parseInt(value), currentBodyDevice ) }
                    min={ 1 }
                    max={ this.getLayout( 'rowStart', currentBodyDevice ) + 1 }
                />
                <RangeControl
                    label="Height"
                    value={ this.getLayout( 'height', currentBodyDevice ) }
                    onChange={ ( value ) => this.setLayout( 'height', Number.parseInt(value), currentBodyDevice ) }
                    min={ 1 }
                    max={ this.getLayout( 'height', currentBodyDevice ) + 1 }
                />
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