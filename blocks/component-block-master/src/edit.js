import { Component } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';
import { withSelect } from '@wordpress/data';
import { InspectorControls } from '@wordpress/block-editor';

import {
    Placeholder,
    TabPanel
} from '@wordpress/components';

import { MarginControls } from './_marginControls.js';
import { renderControl } from '../../../js/attributes.js';

class WpeComponent extends Component {

	constructor() {
        super( ...arguments );
    }

    getAttribute( key ) {
		return this.props.attributes[key];
    }

    setAttributes( attributes ) {
        this.props.setAttributes( attributes );
    }

    /**
     * Render
     */
    render() {

        const { attributes, isSelected, clientId, element, current_user_can_edit_posts, experimentalDeviceType, theme_spec } = this.props;

        // Because of ID will be not saved to the block’s comment delimiter default attribute, we manually set it.
        if( typeof attributes.id_component == 'undefined' )
            this.setAttributes( { id_component: element.id } );

        // Visual mode
        if( ! isSelected || ! parseInt(current_user_can_edit_posts) ) {

            return (
                <ServerSideRender
                    key={ clientId + "-serverSideRender" }
                    block={ "custom/wpe-component-" + element.id }
                    attributes={ Object.assign(attributes, { "editor": true } ) }
                    httpMethod={ "POST" }
                />
            );
        }

        var editPlaceHolder = '';
        
        if( typeof element.props == 'object' && Object.keys(element.props).length > 0 ) {

            // Edition mode
            let catReOrder = {
                default: { props: {} }
            };

            // 1. Loop Props Categories
            if( typeof element.props_categories != 'undefined' && element.props_categories != null ) {
                for (const [keyCatProps, valueCatProps] of Object.entries(element.props_categories)) {

                    catReOrder[valueCatProps.id] = { name: valueCatProps.name, props: {} }
                }
            }

            // 2. Loop Props
            for (const [keyProp, valueProp] of Object.entries(element.props)) {

                if( typeof valueProp != 'object' || valueProp == null )
                    continue;

                if( typeof valueProp.category != 'undefined' && valueProp.category != null && valueProp.category in catReOrder ) {
                    catReOrder[valueProp.category].props[keyProp] = valueProp;
                }
                else {
                    catReOrder.default.props[keyProp] = valueProp;
                }
            }

            // 3. Remove empty category
            for (const [keyProp, valueProp] of Object.entries(catReOrder)) {

                if( Object.keys(catReOrder[keyProp].props).length == 0 ) {
                    delete catReOrder[keyProp];
                }
            }

            // 4. Render
            var tabPanel = [];
            for (const [keyCat, valCat] of Object.entries(catReOrder)) {
                
                if( valCat.props.length == 0 )
                    continue;
                
                let currentEditCat = [];

                forEachCatProps: for (const [keyProp, prop] of Object.entries(valCat.props)) {

                    // Conditional treatment
                    if( typeof prop.conditional == 'object' ) {
                        for (const [index, conditionalField] of Object.entries(prop.conditional)) {
                            
                            let conditionalFieldKey = Object.keys(conditionalField)[0];
                            let conditionalFieldValue = conditionalField[conditionalFieldKey];
                            if( this.getAttribute( conditionalFieldKey ) != conditionalFieldValue )
                                continue forEachCatProps;
                        }
                    }

                    let valueProp = this.getAttribute( keyProp );
                    currentEditCat.push( renderControl( prop, [ keyProp ], { [keyProp]: valueProp }, clientId ) );
                }

                if( keyCat == "default" ) {

                    tabPanel.push( {
                        name: keyCat,
                        title: "Default",
                        content: currentEditCat
                    } );
                }
                else {

                    tabPanel.push( {
                        name: keyCat,
                        title: valCat.name,
                        content: currentEditCat
                    } );
                }
            }
        
            if( tabPanel.length > 1 ) {
                
                editPlaceHolder = (
                    <TabPanel
                        key={ clientId + "-tabPanel" }
                        className="tab-panel-wpe-component"
                        activeClass="active-tab"
                        tabs={ tabPanel }
                    >
                        { ( tabPanel ) => tabPanel.content }
                    </TabPanel>
                );
            }
            else {
                editPlaceHolder = tabPanel[0].content;
            }
        }

        return (
            <>
                <InspectorControls>
                    <MarginControls props={ this.props } deviceType={ experimentalDeviceType } margin={ ( theme_spec?.margin ) ? theme_spec?.margin : null } />
                </InspectorControls>
                <Placeholder
                    key={ clientId + "-placeholder" }
                    label={ element.name }
                    isColumnLayout={ true }
                    className="wpe-component_edit_placeholder"
                >
                    { editPlaceHolder }
                </Placeholder>
            </>
        );
    }
}

export default (element, current_user_can_edit_posts, frontspec_styles, theme_spec ) => withSelect( ( select, props ) => {

    const { getEntityRecords } = select( 'core' );
    const { __experimentalGetPreviewDeviceType } = select( 'core/edit-post' );
    let relations = [];

    if( props.name == "custom/wpe-component-" + element.id ) {

        // Loop Props
        for (const [keyProp, valueProp] of Object.entries(element.props)) {

            if( valueProp.type == 'relation' && typeof valueProp.entity != 'undefined' && relations[ valueProp.entity ] == null ) {
                relations[ valueProp.entity ] = getEntityRecords( 'postType', valueProp.entity, {
                    per_page: -1,
                    status: 'publish'
                } );
            }
        }
    }

    return {
        relations: relations,
        element,
        current_user_can_edit_posts: current_user_can_edit_posts,
        frontspec_styles: frontspec_styles,
        theme_spec,
        experimentalDeviceType: __experimentalGetPreviewDeviceType()
    };
} )( WpeComponent )