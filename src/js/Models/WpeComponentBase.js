import { Component } from '@wordpress/element';

import {
    Button,
    ButtonGroup,
    Placeholder,
    Dashicon,
    TextControl,
    DropdownMenu,
    Modal,
    MenuGroup,
    MenuItem
} from '@wordpress/components';

import {
    pages, cog, trash, chevronUp, chevronDown
} from '@wordpress/icons';

import { Attributes } from '../Static/Attributes';
import { Render } from '../Static/Render';

import { getBlockType } from '@wordpress/blocks';

import { isReusableBlock } from '@wordpress/blocks'

import { EditZone } from '../Singleton/EditZone';
import { Devices } from '../Singleton/Devices';
import { WpeModal } from './Modal';

export class WpeComponentBase extends Component {

	constructor() {
        super( ...arguments );

        this.state = {
            alertReusableBlockMessage: null,
            alertUpdateAttributesMessage: null,
            removeSubmitted: false
        };

        this.title = getBlockType(this.props.name).title;
        this.reusableBlock = this.isReusableBlock();
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

    isReusableBlock() {

        if( typeof this.props.parentsBlock == 'object' ) {

            for( var i in this.props.parentsBlock ) {
                if( isReusableBlock(this.props.parentsBlock[i]) ) {
                    return this.props.parentsBlock[i];
                }
            }
        }

        return null;
    }

    getReusableBlock() {
        return this.reusableBlock;
    }

    descriptionMessage() {

        return ( typeof this.description != 'undefined' ) ?
            <div className='description'>
                <Dashicon icon="info-outline" />
                { this.description }
            </div>
            : null;
    }

    reusableBlockMessage() {

        return ( this.getReusableBlock() != null ) ?
            <div key={ this.props.clientId + "-reusableBlockMessage" } className='reusableBlockMessage'>
                <Dashicon icon="warning" />
                <h3>Reusable block</h3>
                <Button
                        href={ js_const.admin_url + "post.php?post=" + this.getReusableBlock().attributes.ref + "&action=edit" }
                        target='_blank'
                    ><Dashicon icon="edit" />Edit reusable block</Button>
            </div>
        : null;
    }

    alertReusableBlockMessage() {
        
        return ( this.getReusableBlock() != null && this.state.alertReusableBlockMessage != null && ! this.state.alertReusableBlockMessage ) ?
            <WpeModal
                key={ this.props.clientId + "-alertReusableBlockMessageWpeModal" }
                id={ this.props.clientId + "-alertReusableBlockMessageWpeModal" }
                title={ "Reusable block" }
                onClose={ () => this.setState( { alertUpdateAttributesMessage: true } ) }
                hasFooter={false}
                type="warning"
                icon="warning"
            >
                <p className='center'>
                    <h3>Be careful !</h3>
                    This block is part of a <b>reusable block</b> composition.<br />
                    Updating this block will <b>apply the changes everywhere it is used.</b>
                </p>
                <div className="bouttonGroup">
                    <Button
                            key={ this.props.clientId + "alertReusableBlockMessageButton" }
                            variant="primary"
                            onMouseDown={ () => {
                                this.setState( { alertReusableBlockMessage: true } )
                            } }
                        ><Dashicon icon="yes" />All right!</Button>
                </div>
            </WpeModal>
            : null;
    }

    alertUpdateAttributesMessage() {

        return ( this.state.alertUpdateAttributesMessage != null && ! this.state.alertUpdateAttributesMessage ) ?
            <WpeModal
                key={ this.props.clientId + "-alertUpdateAttributesMessageWpeModal" }
                id={ this.props.clientId + "-alertUpdateAttributesMessageWpeModal" }
                title={ "Updating preview..." }
                onClose={ () => this.setState( { alertUpdateAttributesMessage: true } ) }
                hasFooter={false}
                type="warning"
                icon="update"
            >
                <p className='center'>  
                    This preview update does not save the post.<br />
                    <b>Don't forget to save your changes!</b>
                </p>
                <div className="bouttonGroup">
                    <Button
                            key={ this.props.clientId + "alertUpdateAttributesMessageButton" }
                            variant="primary"
                            onMouseDown={ () => {
                                this.setState( { alertUpdateAttributesMessage: true } )
                            } }
                        ><Dashicon icon="yes" />All right!</Button>
                </div>
            </WpeModal>
            : null;
    }

    renderSpecificTools() {
         return null;
    }

    renderTools() {
        
        const menuGroup = [];

        if( typeof this.props.moveBlocksUp != 'undefined' || typeof this.props.moveBlocksDown != 'undefined' ) {

            const groupMoveBlock = [];

            if( typeof this.props.moveBlocksUp != 'undefined' ) {

                groupMoveBlock.push(
                    <MenuItem
                        key={ this.props.clientId + "-toolsDropdownMenu-move-up" }
                        icon={ chevronUp }
                        onClick={ () => this.props.moveBlocksUp( [ this.props.clientId ] ) }
                    >
                        Move up
                    </MenuItem>
                );
            }

            if( typeof this.props.moveBlocksDown != 'undefined' ) {

                groupMoveBlock.push(
                    <MenuItem
                        key={ this.props.clientId + "-toolsDropdownMenu-move-down" }
                        icon={ chevronDown }
                        onClick={ () => this.props.moveBlocksDown( [ this.props.clientId ] ) }
                    >
                        Move down
                    </MenuItem>
                );
            }

            menuGroup.push(
                <MenuGroup
                    key={ this.props.clientId + "-toolsDropdownMenu-move" }
                >
                    { groupMoveBlock }
                </MenuGroup>
            );
        }

        if( typeof this.props.duplicateBlocks != 'undefined' ) {

            const groupSpecificTools = [];

            groupSpecificTools.push( this.renderSpecificTools() );

            groupSpecificTools.push(
                <MenuItem
                    key={ this.props.clientId + "-toolsDropdownMenu-SpecificTools-duplicate" }
                    icon={ pages }
                    onClick={ () => {
                        EditZone.getInstance().hide();
                        this.props.duplicateBlocks( [ this.props.clientId ] )
                    } }
                >
                    Duplicate
                </MenuItem>
            );

            menuGroup.push(
                <MenuGroup
                    key={ this.props.clientId + "-toolsDropdownMenu-SpecificTools" }
                >
                    { groupSpecificTools }
                </MenuGroup>
            );
        }

        if( typeof this.props.removeBlock != 'undefined' ) {

            menuGroup.push(
                <MenuGroup
                    key={ this.props.clientId + "-toolsDropdownMenu-remove" }
                >
                    <MenuItem
                        key={ this.props.clientId + "-toolsDropdownMenu-remove-trash" }
                        icon={ trash }
                        onClick={ () => this.setState( { removeSubmitted: true } ) }
                    >
                        Remove { this.title }
                    </MenuItem>
                </MenuGroup>
            );
        }

        return ( menuGroup.length > 0 ) ? 
            <DropdownMenu
                key={ this.props.clientId + "-toolsDropdownMenu" }
                icon={ cog }
                label="Advanced"
            >
                { () => { return menuGroup } }
            </DropdownMenu>
        : null;
    }

    renderEditMode() {

        if( this.getReusableBlock() != null && this.state.alertReusableBlockMessage == null ) {
            this.setState( { alertReusableBlockMessage: false } );
        }

        const catReOrder = {
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
        const tabPanel = [];
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

        const classNameEditZone = ( this.getReusableBlock() ) ? 'edit-zone__inner is-reusable-block' : 'edit-zone__inner';

        return (
            <div key={ this.props.clientId + "-editZone" } className={classNameEditZone}>
                <div className='edit-zone__header'>
                    <h2 className='title'>{ this.title }</h2>
                    <div className='tools'>
                        { this.renderTools() }
                    </div>
                </div>
                <div className='edit-zone__body'>
                    { this.reusableBlockMessage() }
                    { this.descriptionMessage() }
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
                            this.setState( { needPreviewUpdate: true } );
                            if( this.state.alertUpdateAttributesMessage == null ) {
                                this.setState( { alertUpdateAttributesMessage: false } );
                            }
                        } }
                    ><Dashicon icon="update" />Update preview</Button> }
                    {
                        typeof this.previewUrl != 'undefined' && 
                    <Button
                        key={ this.props.clientId + "-buttonPreviewUrl" }
                        className="abtButtonPreviewUrl"
                        variant="primary"
                        href={ this.previewUrl }
                        target="_blank"
                    ><Dashicon icon="external" />Open preview</Button> }
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

            editZone.push( this.renderTools() );
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

    renderRemoveModal() {

        return ( this.state.removeSubmitted && typeof this.props.removeBlock != 'undefined' ) ?
            <WpeModal
                key={ this.props.clientId + "-removeBlockWpeModal" }
                id={ this.props.clientId + "-removeBlockWpeModal" }
                title={ "Confirm \"" + this.title + "\" suppression" }
                onClose={ () => this.setState( { removeSubmitted: false } ) }
                type="error"
                icon="trash"
            >
                <p className='center'>Are you sure you want to remove this block ?</p>
                <div className="bouttonGroup">
                    <Button
                        variant="primary"
                        isDestructive={true}
                        onMouseDown={ () => {
                            this.setState( { removeSubmitted: false } );
                            EditZone.getInstance().hide();
                            this.props.removeBlock(this.props.clientId);
                        } }
                    >Yes !</Button>
                    <Button
                        variant="tertiary"
                        onMouseDown={ () => this.setState( { removeSubmitted: false } ) }
                    >Cancel</Button>
                </div>
            </WpeModal>
        : null;
    }

    render() {

        var render = [];

        render.push( Devices.getInstance().render(this.props.clientId) );
        
        render.push( this.liveRendering() );
    
        if( typeof this.state.editZone != 'undefined' && this.state.editZone ) {
            render.push( EditZone.getInstance().render() );
        }

        render.push( this.alertUpdateAttributesMessage() );
        render.push( this.alertReusableBlockMessage() );
        render.push( this.renderRemoveModal() );

        return render;
    }

}