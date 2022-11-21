/**
 * WordPress dependencies
 */
import { WpeComponentBase } from '../../../../js/WpeComponentBase';
import { compose } from '@wordpress/compose';
import {
    InnerBlocks,
    InspectorControls,
    useBlockProps,
    useInnerBlocksProps,
    __experimentalBlockVariationPicker
} from '@wordpress/block-editor';

import {
    PanelBody,
    RangeControl
} from '@wordpress/components';

import { withSelect } from '@wordpress/data';

import { getBodyDevice } from '../../../../js/devices';

/**
 * registerBlockType edit function
 * 
 */
class WpeColumn extends WpeComponentBase {
 
    constructor() {
        super( ...arguments, { disableButtonGroupMode: true } );
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

    renderInspectorControls() {

        let currentBodyDevice = getBodyDevice();

        return <InspectorControls
            key={ this.props.clientId + "-InspectorControls" }
        >
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
        </InspectorControls>;
    }

    liveRendering() {

        var { innerBlocksProps } = this.props;

        let currentBodyDevice = getBodyDevice();
        
        innerBlocksProps.style = {
            gridColumnStart: this.getLayout( 'columnStart', currentBodyDevice ),
            gridColumnEnd: this.getLayout( 'columnStart', currentBodyDevice ) + this.getLayout( 'width', currentBodyDevice ),
            gridRowStart: this.getLayout( 'rowStart', currentBodyDevice ),
            gridRowEnd: this.getLayout( 'rowStart', currentBodyDevice ) + this.getLayout( 'height', currentBodyDevice )
        };
        
        innerBlocksProps.key = 'innerBlocksProps_' + this.props.clientId;
        return <div { ...innerBlocksProps } />;
    }
}

export default ( block_spec, theme_spec ) => compose( [
    withSelect( () => {

        return {
            block_spec,
            theme_spec,
            innerBlocksProps: useInnerBlocksProps( useBlockProps( { className: '' } ), { renderAppender: InnerBlocks.ButtonBlockAppender } ),
        };
    } ),
] )( WpeColumn );