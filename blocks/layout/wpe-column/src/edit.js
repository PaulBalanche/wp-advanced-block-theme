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
    RangeControl
} from '@wordpress/components';

import { withSelect } from '@wordpress/data';

import { Devices } from '../../../../src/js/Singleton/Devices';
import { Render } from '../../../../src/js/Static/Render';

/**
 * registerBlockType edit function
 * 
 */
class WpeColumn extends WpeComponentBase {
 
    constructor() {
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

    renderInspectorControls() {

        return Render.fieldContainer(
            this.props.clientId + '_layout',
            Render.panelComponent(
                this.props.clientId + '_layout',
                'Layout',
                Render.tabPanelComponent(
                    this.props.clientId,
                    Object.keys( Devices.getInstance().getMediaQueries() ).map( ( layout ) => {
                        return {
                            name: layout,
                            title: layout.charAt(0).toUpperCase() + layout.slice(1),
                            className: 'tab-' + layout
                        };
                    } ),
                    ( tab ) => {
                        return <>
                            <div className='flex'>
                                { Render.fieldContainer( this.props.clientId + "_columnStart_" + tab.name,
                                    <RangeControl
                                        label="Column start"
                                        value={ this.getLayout( 'columnStart', tab.name ) }
                                        onChange={ ( value ) => this.setLayout( 'columnStart', Number.parseInt(value), tab.name ) }
                                        min={ 1 }
                                        max={ this.getLayout( 'columnStart', tab.name ) + 1 }
                                    />
                                ) }
                                { Render.fieldContainer( this.props.clientId + "_width_" + tab.name,
                                    <RangeControl
                                        label="Width"
                                        value={ this.getLayout( 'width', tab.name ) }
                                        onChange={ ( value ) => this.setLayout( 'width', Number.parseInt(value), tab.name ) }
                                        min={ 1 }
                                        max={ this.getLayout( 'width', tab.name ) + 1 }
                                    />
                                ) }
                            </div>
                            <div className='flex'>
                                { Render.fieldContainer( this.props.clientId + "_rowStart_" + tab.name,
                                    <RangeControl
                                        label="Row start"
                                        value={ this.getLayout( 'rowStart', tab.name ) }
                                        onChange={ ( value ) => this.setLayout( 'rowStart', Number.parseInt(value), tab.name ) }
                                        min={ 1 }
                                        max={ this.getLayout( 'rowStart', tab.name ) + 1 }
                                    />
                                ) }
                                { Render.fieldContainer( this.props.clientId + "_height_" + tab.name,
                                    <RangeControl
                                        label="Height"
                                        value={ this.getLayout( 'height', tab.name ) }
                                        onChange={ ( value ) => this.setLayout( 'height', Number.parseInt(value), tab.name ) }
                                        min={ 1 }
                                        max={ this.getLayout( 'height', tab.name ) + 1 }
                                    />
                                ) }
                            </div>
                        </>
                    },
                    this.state.currentBodyDevice,
                    ( tabName ) => {
                        Devices.getInstance().setCurrentDevice(tabName);
                    }
                )
            )
        );



        return Render.panelComponent( this.props.clientId, 'Layout',
        <>
            <div className='flex'>
                { Render.fieldContainer( this.props.clientId + "_columnStart",
                    <RangeControl
                        label="Column start"
                        value={ this.getLayout( 'columnStart', this.state.currentBodyDevice ) }
                        onChange={ ( value ) => this.setLayout( 'columnStart', Number.parseInt(value), this.state.currentBodyDevice ) }
                        min={ 1 }
                        max={ this.getLayout( 'columnStart', this.state.currentBodyDevice ) + 1 }
                    />
                ) }
                { Render.fieldContainer( this.props.clientId + "_width",
                    <RangeControl
                        label="Width"
                        value={ this.getLayout( 'width', this.state.currentBodyDevice ) }
                        onChange={ ( value ) => this.setLayout( 'width', Number.parseInt(value), this.state.currentBodyDevice ) }
                        min={ 1 }
                        max={ this.getLayout( 'width', this.state.currentBodyDevice ) + 1 }
                    />
                ) }
            </div>
            <div className='flex'>
                { Render.fieldContainer( this.props.clientId + "_rowStart",
                    <RangeControl
                        label="Row start"
                        value={ this.getLayout( 'rowStart', this.state.currentBodyDevice ) }
                        onChange={ ( value ) => this.setLayout( 'rowStart', Number.parseInt(value), this.state.currentBodyDevice ) }
                        min={ 1 }
                        max={ this.getLayout( 'rowStart', this.state.currentBodyDevice ) + 1 }
                    />
                ) }
                { Render.fieldContainer( this.props.clientId + "_height",
                    <RangeControl
                        label="Height"
                        value={ this.getLayout( 'height', this.state.currentBodyDevice ) }
                        onChange={ ( value ) => this.setLayout( 'height', Number.parseInt(value), this.state.currentBodyDevice ) }
                        min={ 1 }
                        max={ this.getLayout( 'height', this.state.currentBodyDevice ) + 1 }
                    />
                ) }
            </div>
        </>, true );
    }

    liveRendering() {
        
        const { children, ...innerBlocksProps } = this.props.innerBlocksProps;
        innerBlocksProps.key = 'innerBlocksProps_' + this.props.clientId;

        if( this.props.countColumns == 0 ) {
            innerBlocksProps.className += ' is-empty'
        }

        innerBlocksProps.style = {
            gridColumnStart: this.getLayout( 'columnStart', this.state.currentBodyDevice ),
            gridColumnEnd: this.getLayout( 'columnStart', this.state.currentBodyDevice ) + this.getLayout( 'width', this.state.currentBodyDevice ),
            gridRowStart: this.getLayout( 'rowStart', this.state.currentBodyDevice ),
            gridRowEnd: this.getLayout( 'rowStart', this.state.currentBodyDevice ) + this.getLayout( 'height', this.state.currentBodyDevice )
        };

        return <div {...innerBlocksProps}>
            { this.renderEditZone() }
            { children }
        </div>
    }
}

export default ( block_spec, theme_spec ) => compose( [
    withSelect( ( select, props ) => {

        return {
            block_spec,
            theme_spec,
            innerBlocksProps: useInnerBlocksProps( useBlockProps( { className: '' } ), { renderAppender: InnerBlocks.ButtonBlockAppender } ),
            disableButtonGroupMode: true,
            countColumns: select( 'core/block-editor' ).getBlockCount(props.clientId)
        };
    } ),
] )( WpeColumn );