import { Component } from '@wordpress/element';

import {
    Button,
    ButtonGroup,
    Placeholder,
    Dashicon
} from '@wordpress/components';

import {
    renderControl,
    renderTabPanelComponent
} from './attributes';

import { getBlockType } from '@wordpress/blocks';

import { EditZone } from './EditZone';

export class WpeComponentBase extends Component {

	constructor() {
        super( ...arguments );

        this.state = {
            editZone: false,
            configMode: ( this?.props?.block_spec?.screenshot && this.props.block_spec.screenshot ) ? 1 : 2,
            needPreviewUpdate: false
        };

        this.tabEnabledMode = [];
        if( ! ( typeof this.props.disableButtonGroupMode != 'undefined' && this.props.disableButtonGroupMode ) ) {
            this.initEnabledMode();
        }

        this.title = getBlockType(this.props.name).title;
    }

    initEnabledMode () {

        if( typeof this.props.current_user_can_edit_posts == 'undefined' || parseInt(this.props.current_user_can_edit_posts) ) {

            if( this?.props?.block_spec?.screenshot && this.props.block_spec.screenshot ) {
                this.tabEnabledMode.push(1);
            }

            this.tabEnabledMode.push(2);

            if( this?.props?.block_spec?.props && typeof this.props.block_spec.props == 'object' && Object.keys(this.props.block_spec.props).length > 0 ) {
                this.tabEnabledMode.push(3);
            }
        }
    }

    getAttribute( key ) {
		return this.props.attributes[key];
    }

    setAttributes( attributes ) {
        this.props.setAttributes( attributes );
    }

    renderButtonGroupMode() {

        let modeDefinition = {
            1: 'Screenshot',
            2: 'Live',
            3: 'Edit'
        }

        if( typeof this.tabEnabledMode == 'object' && this.tabEnabledMode.length > 0 ) {

            let buttons = [];
            for( var i in modeDefinition ) {

                let index = parseInt(i);

                if( this.tabEnabledMode.includes(index) ) {
                    buttons.push(
                        <Button
                            key={ this.props.clientId + "-buttonConfigMode_" + index }
                            isPressed={ this.state.configMode == index }
                            onMouseDown={ () => {
                                this.setState( { configMode: index } )
                            } }
                        >{ modeDefinition[index] }</Button>
                    );
                }
            }

            return (
                <div
                    className="buttonGroupComponentModeContainer"
                    key={ this.props.clientId + "-buttonGroupComponentModeContainer" }
                >
                    <ButtonGroup
                        key={ this.props.clientId + "-buttonGroupComponentMode" }
                    >
                     { buttons }
                    </ButtonGroup>
                </div>
            );
        }
        
        return null;
    }

    propsExists() {

        return ( typeof this.props.block_spec.props == 'object' && Object.keys(this.props.block_spec.props).length > 0 );
    }

    renderEditMode() {

        if( this.propsExists() ) {

            let catReOrder = {
                default: { props: {} }
            };

            // 1. Loop Props Categories
            if( typeof this.props.block_spec.props_categories != 'undefined' && this.props.block_spec.props_categories != null ) {
                for (const [keyCatProps, valueCatProps] of Object.entries(this.props.block_spec.props_categories)) {

                    catReOrder[valueCatProps.id] = { name: valueCatProps.name, props: {} }
                }
            }

            // 2. Loop Props
            for (const [keyProp, valueProp] of Object.entries(this.props.block_spec.props)) {
        
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
                    currentEditCat.push( renderControl( prop, [ keyProp ], { [keyProp]: valueProp }, this ) );
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

            const inspectorContent = this.renderInspectorControls();
            if( inspectorContent != null ) {
                tabPanel.push( {
                    name: 'config',
                    title: "Config",
                    content: inspectorContent
                } );
            }

            if( tabPanel.length > 0 ) {

                const editZoneChild = 
                    <div key={ this.props.clientId + "-editZone" } className='edit-zone__inner'>
                        <div className='edit-zone__header'>
                            { this.title }
                        </div>
                        <div className='edit-zone__body'>
                            <Placeholder
                                key={ this.props.clientId + "-ConfigurationPlaceholder" }
                                isColumnLayout={ true }
                                className="wpe-component_edit_placeholder"
                            >
                                { ( tabPanel.length > 1 ) ? renderTabPanelComponent( this.props.clientId, tabPanel, function ( tabPanel ) { return tabPanel.content } ) : tabPanel[0].content }
                            </Placeholder>
                        </div>
                        <div className='edit-zone__footer'>
                            <Button
                                key={ this.props.clientId + "-buttonUpdatePreview" }
                                className="abtButtonUpdatePreview"
                                variant="primary"
                                onMouseDown={ () => {
                                    this.setState( { needPreviewUpdate: true } )
                                } }
                            ><Dashicon icon="saved" />Update preview</Button>
                            <Button
                                key={ this.props.clientId + "-buttonCloseEditZone" }
                                className="abtButtonCloseEditZone"
                                variant="primary"
                                onMouseDown={ () => {
                                    EditZone.getInstance().removeComponent(this);
                                } }
                            ><Dashicon icon="no-alt" />Close</Button>
                        </div>
                    </div>

                return editZoneChild;
            }
        }

        return null;
    }

    renderInspectorControls() {

        return null;
    }

    renderScreenshot () {

        if( this.props.block_spec.screenshot ) {
            return <img
                key={ this.props.clientId + "-screen" }
                src={ this.props.block_spec.screenshot }
            />
        }

        return null;
    }

    liveRendering() {
        return null;
    }

    renderEditZone( content = null ) {

        let  editZone = [];

        // Title
        editZone.push(<div className="title">{ this.title }</div>);
        
        // Separator
        editZone.push(<div className="separator"></div>);

        // Edit button
        editZone.push(<Button
            key={ this.props.clientId + "-buttonEditZone" }
            className="abtButtonEditZone"
            variant="primary"
            onMouseDown={ () => {
                if( EditZone.getInstance().hasComponent(this) ) {
                    EditZone.getInstance().removeComponent(this);
                }
                else {
                    EditZone.getInstance().addComponent(this);
                }
            } }
        ><Dashicon icon="edit" /> Edit content</Button>);

        // Additionnal content
        if( content != null ) {

            // Separator
            editZone.push(<div className="separator"></div>);
            
            // Additionnal content
            editZone.push(content);
        }

        if( EditZone.getInstance().hasComponent(this) ) {
            editZone.push( EditZone.getInstance().render() );
        }

        return <ButtonGroup
                key={ this.props.clientId + "-buttonGroupEditZone" }
                className="abtButtonGroupEditZone"
            >{ editZone }</ButtonGroup>
    }

    render() {
        return this.liveRendering()
    }



}