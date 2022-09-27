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
 
 const getLayouts = () => ( [
     { value: 'desktop', label: 'Desktop', attributeName: 'Desktop' },
     { value: 'tablet', label: 'Tablet', attributeName: 'Tablet' },
     { value: 'mobile', label: 'Mobile', attributeName: 'Mobile' },
 ] );


function setBodyDevice( device ) {

    getLayouts().forEach( ( layout ) => {
        document.body.classList.remove(layout.value);
    });

    document.body.classList.add(device);
}
 
 /**
  * registerBlockType edit function
  */
 class WpeColumn extends Component {
 
     constructor() {
         super( ...arguments );
 
         this.state = {
             selectedDevice: getLayouts()[0].value,
             defaultClassName: null
         };
     }
 
     render() {
 
        var {
            attributes,
            setAttributes,
            innerBlocksProps
        } = this.props;

        let newClassName = '';

        if( Number.isInteger(attributes.columnStartDesktop) && attributes.columnStartDesktop > 0 &&
            Number.isInteger(attributes.widthDesktop) && attributes.widthDesktop > 0 ) {

            let ColumnEndDesktop = attributes.columnStartDesktop + attributes.widthDesktop;
            newClassName += "gridColumnStartDesktop-" + attributes.columnStartDesktop + " gridColumnEndDesktop-" + ColumnEndDesktop + " ";
        }

        if( Number.isInteger(attributes.columnStartTablet) && attributes.columnStartTablet > 0 &&
            Number.isInteger(attributes.widthTablet) && attributes.widthTablet > 0 ) {

            let ColumnEndTablet = attributes.columnStartTablet + attributes.widthTablet;
            newClassName += "gridColumnStartTablet-" + attributes.columnStartTablet + " gridColumnEndTablet-" + ColumnEndTablet + " ";
        }

        if( Number.isInteger(attributes.columnStartMobile) && attributes.columnStartMobile > 0 &&
            Number.isInteger(attributes.widthMobile) && attributes.widthMobile > 0 ) {

            let ColumnEndMobile= attributes.columnStartMobile + attributes.widthMobile;
            newClassName += "gridColumnStartMobile-" + attributes.columnStartMobile + " gridColumnEndMobile-" + ColumnEndMobile + " ";
        }

        if( Number.isInteger(attributes.rowStartDesktop) && attributes.rowStartDesktop > 0 &&
            Number.isInteger(attributes.heightDesktop) && attributes.heightDesktop > 0 ) {

            let RowEndDesktop = attributes.rowStartDesktop + attributes.heightDesktop;
            newClassName += "gridRowStartDesktop-" + attributes.rowStartDesktop + " gridRowEndDesktop-" + RowEndDesktop + " ";
        }

        if( Number.isInteger(attributes.rowStartTablet) && attributes.rowStartTablet > 0 &&
            Number.isInteger(attributes.heightTablet) && attributes.heightTablet > 0 ) {

            let RowEndTablet = attributes.rowStartTablet + attributes.heightTablet;
            newClassName += "gridRowStartTablet-" + attributes.rowStartTablet + " gridRowEndTablet-" + RowEndTablet + " ";
        }

        if( Number.isInteger(attributes.rowStartMobile) && attributes.rowStartMobile > 0 &&
            Number.isInteger(attributes.heightMobile) && attributes.heightMobile > 0 ) {

            let RowEndMobile= attributes.rowStartMobile + attributes.heightMobile;
            newClassName += "gridRowStartMobile-" + attributes.rowStartMobile + " gridRowEndMobile-" + RowEndMobile + " ";
        }

        innerBlocksProps.className += ' ' + newClassName;
 
 
        /**
         * Layout panel
         * 
         */
        var deviceLayout = {};

        getLayouts().forEach( ( layout ) => {

            deviceLayout[ layout.value ] = (
                <>
                    <RangeControl
                        label="Column start"
                        value={ attributes['columnStart' + layout.attributeName] }
                        onChange={ ( value ) => setAttributes( { ['columnStart' + layout.attributeName]: Number.parseInt(value) } ) }
                        min={ 1 }
                        max={ attributes['columnStart' + layout.attributeName] + 1 }
                    />
                    <RangeControl
                        label="Width"
                        value={ attributes['width' + layout.attributeName] }
                        onChange={ ( value ) => setAttributes( { ['width' + layout.attributeName]: Number.parseInt(value) } ) }
                        min={ 1 }
                        max={ attributes['width' + layout.attributeName] + 1 }
                    />
                    <RangeControl
                        label="Row start"
                        value={ attributes['rowStart' + layout.attributeName] }
                        onChange={ ( value ) => setAttributes( { ['rowStart' + layout.attributeName]: Number.parseInt(value) } ) }
                        min={ 1 }
                        max={ attributes['rowStart' + layout.attributeName] + 1 }
                    />
                    <RangeControl
                        label="Height"
                        value={ attributes['height' + layout.attributeName] }
                        onChange={ ( value ) => setAttributes( { ['height' + layout.attributeName]: Number.parseInt(value) } ) }
                        min={ 1 }
                        max={ attributes['height' + layout.attributeName] + 1 }
                    />
                </>
            );
        });

        var panelDeviceLayout = (
            <PanelBody title={ 'Layout' } initialOpen={ true }>
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
     withSelect( ( select, props ) => {
 
         return {
            innerBlocksProps: useInnerBlocksProps( useBlockProps( { className: '' } ), { renderAppender: InnerBlocks.ButtonBlockAppender } ),
         };
     } ),
 ] )( WpeColumn );