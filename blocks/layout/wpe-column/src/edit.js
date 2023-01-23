/**
 * WordPress dependencies
 */
import { WpeComponentBase } from '../../../../src/js/Models/WpeComponentBase';
import { compose } from '@wordpress/compose';
import {
    InnerBlocks,
    useBlockProps,
    useInnerBlocksProps,
    __experimentalBlockVariationPicker
} from '@wordpress/block-editor';

import {
    PanelBody,
    RangeControl
} from '@wordpress/components';

import { withSelect } from '@wordpress/data';

import { Devices } from '../../../../src/js/Singleton/Devices';

/**
 * registerBlockType edit function
 * 
 */
class WpeColumn extends WpeComponentBase {
 
    constructor() {
        super( ...arguments );
    }

    componentDidMount() {
        Devices.getInstance().addComponent(this);
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

        return <div
            key={ this.props.clientId + "-InspectorControls" }
        >
            <PanelBody title={ 'Layout (' + this.state.currentBodyDevice + ')' } initialOpen={ true }>
                <RangeControl
                    label="Column start"
                    value={ this.getLayout( 'columnStart', this.state.currentBodyDevice ) }
                    onChange={ ( value ) => this.setLayout( 'columnStart', Number.parseInt(value), this.state.currentBodyDevice ) }
                    min={ 1 }
                    max={ this.getLayout( 'columnStart', this.state.currentBodyDevice ) + 1 }
                />
                <RangeControl
                    label="Width"
                    value={ this.getLayout( 'width', this.state.currentBodyDevice ) }
                    onChange={ ( value ) => this.setLayout( 'width', Number.parseInt(value), this.state.currentBodyDevice ) }
                    min={ 1 }
                    max={ this.getLayout( 'width', this.state.currentBodyDevice ) + 1 }
                />
                <RangeControl
                    label="Row start"
                    value={ this.getLayout( 'rowStart', this.state.currentBodyDevice ) }
                    onChange={ ( value ) => this.setLayout( 'rowStart', Number.parseInt(value), this.state.currentBodyDevice ) }
                    min={ 1 }
                    max={ this.getLayout( 'rowStart', this.state.currentBodyDevice ) + 1 }
                />
                <RangeControl
                    label="Height"
                    value={ this.getLayout( 'height', this.state.currentBodyDevice ) }
                    onChange={ ( value ) => this.setLayout( 'height', Number.parseInt(value), this.state.currentBodyDevice ) }
                    min={ 1 }
                    max={ this.getLayout( 'height', this.state.currentBodyDevice ) + 1 }
                />
            </PanelBody>
        </div>;
    }

    liveRendering() {
        
        const { children, ...innerBlocksProps } = this.props.innerBlocksProps;

        innerBlocksProps.style = {
            gridColumnStart: this.getLayout( 'columnStart', this.state.currentBodyDevice ),
            gridColumnEnd: this.getLayout( 'columnStart', this.state.currentBodyDevice ) + this.getLayout( 'width', this.state.currentBodyDevice ),
            gridRowStart: this.getLayout( 'rowStart', this.state.currentBodyDevice ),
            gridRowEnd: this.getLayout( 'rowStart', this.state.currentBodyDevice ) + this.getLayout( 'height', this.state.currentBodyDevice )
        };

        innerBlocksProps.key = 'innerBlocksProps_' + this.props.clientId;
        return <div {...innerBlocksProps}>
            { this.renderEditZone() }
            { ( Devices.getInstance().isFirstComponent(this.props.clientId) ) ? Devices.getInstance().render() : null }
            { children }
        </div>
    }
}

export default ( block_spec, theme_spec ) => compose( [
    withSelect( () => {

        return {
            block_spec,
            theme_spec,
            innerBlocksProps: useInnerBlocksProps( useBlockProps( { className: '' } ), { renderAppender: InnerBlocks.ButtonBlockAppender } ),
            disableButtonGroupMode: true
        };
    } ),
] )( WpeColumn );