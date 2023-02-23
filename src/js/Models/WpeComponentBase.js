import { Component } from '@wordpress/element';

import {
    Button,
    ButtonGroup,
    Placeholder,
    Dashicon,
    TextControl
} from '@wordpress/components';

import { Attributes } from '../Static/Attributes';
import { Render } from '../Static/Render';

import { getBlockType } from '@wordpress/blocks';

import { isReusableBlock } from '@wordpress/blocks'

import { EditZone } from '../Singleton/EditZone';
import { Devices } from '../Singleton/Devices';

export class WpeComponentBase extends Component {

	constructor() {
        super( ...arguments );

        this.state = {};

        this.title = getBlockType(this.props.name).title;
        this.isAReusableBlock = this.defineIfIsReusableBlock();
    }

    componentDidMount() {
        Devices.getInstance().addComponent(this);
    }

    getAttribute( key ) {
		return this.props.attributes[key];
    }

    setAttributes( attributes ) {
        this.props.setAttributes( attributes );
    }

    propsExists() {

        return ( typeof this.props.block_spec.props == 'object' && Object.keys(this.props.block_spec.props).length > 0 );
    }

    defineIfIsReusableBlock() {

        if( typeof this.props.parentsBlock == 'object' ) {

            for( var i in this.props.parentsBlock ) {
                if( isReusableBlock(this.props.parentsBlock[i]) ) {
                    return true;
                }
            }
        }

        return false;
    }

    isReusableBlock() {
        return !! this.isAReusableBlock;
    }

    renderEditMode() {

        const description = ( typeof this.description != 'undefined' ) ? <div className='description'><Dashicon icon="info-outline" />{ this.description }</div> : null;
        const alertReusableBlock = ( this.isReusableBlock() ) ? <div className='alert'><Dashicon icon="warning" /><p><b>Be careful !</b><br />This block is part of a reusable block composition.<br />Updating this block will apply the changes everywhere it is used.</p></div> : null;

        let tabPanel = [];

        let catReOrder = {
            default: { name: "Attributes", props: {} },
            block_settings: { name: "Settings", props: {
                anchor: { "type": "string", "label": "Anchor" }
            } },
            spacing: { name: "Spacing", props: {} }
        };
        
        if( this.propsExists() ) {
            
            // 1. Loop Props Categories
            if( typeof this.props.block_spec.props_categories != 'undefined' && this.props.block_spec.props_categories != null ) {
                for (const [keyCatProps, valueCatProps] of Object.entries(this.props.block_spec.props_categories)) {

                    catReOrder[valueCatProps.id] = { name: valueCatProps.name, props: {} }
                }
            }

            // 2. Loop Props
            for( const [keyProp, valueProp] of Object.entries(this.props.block_spec.props) ) {
        
                if( typeof valueProp != 'object' || valueProp == null )
                    continue;

                const currentCatToPush = ( typeof valueProp.category != 'undefined' && valueProp.category != null && valueProp.category in catReOrder ) ? valueProp.category : ( (  [ 'margin', 'padding', 'gap' ].includes(keyProp) ) ? 'spacing' : 'default' );
                catReOrder[currentCatToPush].props[keyProp] = valueProp;
            }
        }

        // 3. Remove empty category
        for(const [keyProp, valueProp] of Object.entries(catReOrder) ) {
    
            if( Object.keys(catReOrder[keyProp].props).length == 0 ) {
                delete catReOrder[keyProp];
            }
        }

        // 4. Render
        for( const [keyCat, valCat] of Object.entries(catReOrder) ) {
            
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
                currentEditCat.push( Attributes.renderProp( prop, [ keyProp ], { [keyProp]: valueProp }, this ) );
            }

            if( keyCat == "block_settings" ) {
                currentEditCat.push( this.renderInspectorControls() );
            }

            tabPanel.push( {
                name: keyCat,
                title: valCat.name,
                content: currentEditCat
            } );
        }

        return (
            <div key={ this.props.clientId + "-editZone" } className='edit-zone__inner'>
                <div className='edit-zone__header'>
                    { this.title }
                </div>
                <div className='edit-zone__body'>
                    { description }
                    { alertReusableBlock }
                    <Placeholder
                        key={ this.props.clientId + "-ConfigurationPlaceholder" }
                        isColumnLayout={ true }
                        className="wpe-component_edit_placeholder"
                    >
                        { Render.tabPanelComponent( this.props.clientId, tabPanel, function ( tabPanel ) { return tabPanel.content } ) }
                    </Placeholder>
                </div>
                <div className='edit-zone__footer'>
                    { typeof this.state.needPreviewUpdate != 'undefined' && 
                    <Button
                        key={ this.props.clientId + "-buttonUpdatePreview" }
                        className="abtButtonUpdatePreview"
                        variant="primary"
                        onMouseDown={ () => {
                            this.setState( { needPreviewUpdate: true } )
                        } }
                    ><Dashicon icon="saved" />Update preview</Button> }
                    <Button
                        key={ this.props.clientId + "-buttonCloseEditZone" }
                        className="abtButtonCloseEditZone"
                        variant="primary"
                        onMouseDown={ () => {
                            EditZone.getInstance().hide();
                        } }
                    ><Dashicon icon="no-alt" />Close</Button>
                </div>
            </div>
        )
    }

    renderInspectorControls() {

        return null;
    }

    liveRendering() {
        return null;
    }

    renderEditZone( content = null, titleOnly = false ) {

        let  editZone = [];

        // Title
        editZone.push(<div key={ this.props.clientId + "_EditZoneTitle" } className="title">{ this.title }</div>);
        
        if( ! titleOnly ) {

            // Separator
            editZone.push(<div key={ this.props.clientId + "_EditZoneSeparator1" } className="separator"></div>);

            // Edit button
            editZone.push( this.renderButtonEditZone() );

            // Additionnal content
            if( content != null ) {

                // Separator
                editZone.push(<div key={ this.props.clientId + "_EditZoneSeparator2" } className="separator"></div>);
                
                // Additionnal content
                editZone.push(content);
            }
        }

        return <div
                key={ this.props.clientId + "-EditZoneButtonGroup" }
                className="abtButtonGroupEditZoneContainer"
            >
                <div className='abtButtonGroupEditZone'>{ editZone }</div>
            </div>
    }

    renderButtonEditZone() {
        return <Button
            key={ this.props.clientId + "-EditZoneButtonEdition" }
            className="abtButtonEditZone"
            variant="primary"
            onMouseDown={ () => {
                EditZone.getInstance().show(this)
            } }
        ><Dashicon icon="edit" /> Edit</Button>
    }

    render() {

        var render = [];

        render.push( Devices.getInstance().render(this.props.clientId) );
        
        render.push( this.liveRendering() );
    
        if( typeof this.state.editZone != 'undefined' && this.state.editZone ) {
            render.push( EditZone.getInstance().render() );
        }

        return render;
    }



}