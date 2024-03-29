import { Component, createPortal } from '@wordpress/element';

import {
    Button,
    Dashicon,
    DropdownMenu,
    MenuGroup,
    MenuItem,
    Placeholder,
} from '@wordpress/components';

import {
    chevronDown,
    chevronUp,
    cog,
    external,
    pages,
    trash,
} from '@wordpress/icons';

import { Attributes } from '../Static/Attributes';
import { Render } from '../Static/Render';

import { getBlockType, isReusableBlock } from '@wordpress/blocks';

import { WpeModal } from './WpeModal';

import __OEditorApp from './OEditorApp';
import __OModal from './OModal';
import __OUserPreferences from './OUserPreferences';

import { Fragment } from 'react';
import globalData from '../global';

export class WpeComponentBase extends Component {
    constructor() {
        super(...arguments);

        this.state = {
            modal: {
                removeSubmitted: false,
            },
        };

        this.title =
            typeof this.props.name != 'undefined'
                ? getBlockType(this.props.name).title
                : 'Undefined...';
        this.reusableBlock = this.isReusableBlock();

        globalData.componentInstances[this.props.clientId] = this;
        if (this.getAttribute('anchor') != null) {
            this.setAttributes({ anchor: this.props.clientId });
        }
    }

    getAttribute(key) {
        return typeof this.props.attributes[key] != 'undefined'
            ? this.props.attributes[key]
            : null;
    }

    setAttributes(attributes) {
        this.props.setAttributes(attributes);
    }

    propsExists() {
        return (
            typeof this.props == 'object' &&
            typeof this.props.block_spec != 'undefined' &&
            typeof this.props.block_spec == 'object' &&
            typeof this.props.block_spec.props != 'undefined' &&
            typeof this.props.block_spec.props == 'object' &&
            Object.keys(this.props.block_spec.props).length > 0
        );
    }

    getCurrentEditedProp() {
        return typeof this.state.currentEditedProp != 'undefined'
            ? this.state.currentEditedProp
            : null;
    }

    isReusableBlock() {
        if (typeof this.props.parentsBlock == 'object') {
            for (var i in this.props.parentsBlock) {
                if (isReusableBlock(this.props.parentsBlock[i])) {
                    return this.props.parentsBlock[i].attributes.ref;
                }
            }
        }

        return null;
    }

    isEditable() {
        return true;
    }

    getReusableBlock() {
        return this.reusableBlock;
    }

    descriptionMessage() {
        const messages = [];

        if (typeof this.description != 'undefined') {
            messages.push(
                <div
                    key={this.props.clientId + '-descriptionMessage-info'}
                    className="row"
                >
                    {this.description}
                </div>,
            );
        }

        return messages.length > 0 ? (
            <div
                key={this.props.clientId + '-descriptionMessage'}
                className="description"
            >
                {messages}
            </div>
        ) : null;
    }

    renderSpecificTools() {
        return null;
    }

    getNavParent() {
        const navParent = [];
        if (
            this.props.parentsBlock != null &&
            typeof this.props.parentsBlock == 'object' &&
            this.props.parentsBlock.length > 0
        ) {
            this.props.parentsBlock.forEach((element) => {
                navParent.push(element);
            });
        }

        return navParent;
    }

    renderTitle() {
        const anchor = this.getAttribute('anchor');
        const displayAnchor =
            typeof anchor != 'undefined' &&
            anchor != null &&
            anchor.match(
                /^[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+$/,
            ) == null;

        const path = [];
        this.getNavParent().forEach((element) => {
            path.push(
                <li
                    key={'breadcrumb-parent-block-' + element.clientId}
                    className="breadcrumb-parent-block"
                >
                    <Button
                        key={'path-button-' + element.clientId}
                        className="path-element"
                        onMouseDown={() =>
                            this.props.selectBlock(element.clientId)
                        }
                    >
                        <Dashicon icon="arrow-right-alt2" />
                        {getBlockType(element.name).title}
                    </Button>
                </li>,
            );
        });

        return (
            <>
                {path}
                <li className="breadcrumb-current">
                    <h2>
                        {this.title ?? this.title ?? 'Editor'}
                        {displayAnchor && (
                            <span className="subtitle">#{anchor}</span>
                        )}
                    </h2>
                </li>
            </>
        );
    }

    renderFooter() {
        const path = [];
        this.getNavParent().forEach((element, index) => {
            path.push(
                <Fragment
                    key={
                        'footer-breadcrumb-' + index + '-' + this.props.clientId
                    }
                >
                    <li className="separator">/</li>
                    <li className="breadcrumb-parent-block">
                        <Button
                            key={'path-button-footer-' + element.clientId}
                            variant="link"
                            onMouseDown={() =>
                                this.props.selectBlock(element.clientId)
                            }
                        >
                            {getBlockType(element.name).title}
                        </Button>
                    </li>
                </Fragment>,
            );
        });

        return (
            <>
                {path}
                {this.title && (
                    <>
                        <li
                            key={
                                'footer-breadcrumb-parent-block-separator-current'
                            }
                            className="separator"
                        >
                            /
                        </li>
                        <li key={'footer-breadcrumb-parent-block-current'}>
                            {this.title}
                        </li>
                    </>
                )}
            </>
        );
    }

    renderTools() {
        const menuGroup = [];

        if (typeof this.previewUrl != 'undefined') {
            menuGroup.push(
                <MenuGroup key={this.props.clientId + '-toolsDropdownMenu-top'}>
                    <MenuItem
                        key={
                            this.props.clientId +
                            '-toolsDropdownMenu-top-Preview'
                        }
                        icon={external}
                        onClick={() => window.open(this.previewUrl, '_blank')}
                    >
                        Open preview
                    </MenuItem>
                </MenuGroup>,
            );
        }

        if (
            typeof this.props.moveBlocksUp != 'undefined' ||
            typeof this.props.moveBlocksDown != 'undefined'
        ) {
            const rootClientId =
                this.props.parentsBlock != null &&
                typeof this.props.parentsBlock == 'object' &&
                this.props.parentsBlock.length > 0
                    ? this.props.parentsBlock[
                          this.props.parentsBlock.length - 1
                      ].clientId
                    : undefined;

            const groupMoveBlock = [];

            if (
                typeof this.props.moveBlocksUp != 'undefined' &&
                this.getReusableBlock() == null
            ) {
                groupMoveBlock.push(
                    <MenuItem
                        key={this.props.clientId + '-toolsDropdownMenu-move-up'}
                        icon={chevronUp}
                        onClick={() =>
                            this.props.moveBlocksUp(
                                [this.props.clientId],
                                rootClientId,
                            )
                        }
                    >
                        Move up
                    </MenuItem>,
                );
            }

            if (
                typeof this.props.moveBlocksDown != 'undefined' &&
                this.getReusableBlock() == null
            ) {
                groupMoveBlock.push(
                    <MenuItem
                        key={
                            this.props.clientId + '-toolsDropdownMenu-move-down'
                        }
                        icon={chevronDown}
                        onClick={() =>
                            this.props.moveBlocksDown(
                                [this.props.clientId],
                                rootClientId,
                            )
                        }
                    >
                        Move down
                    </MenuItem>,
                );
            }

            menuGroup.push(
                <MenuGroup
                    key={this.props.clientId + '-toolsDropdownMenu-move'}
                >
                    {groupMoveBlock}
                </MenuGroup>,
            );
        }

        if (typeof this.props.duplicateBlocks != 'undefined') {
            const groupSpecificTools = [];

            groupSpecificTools.push(this.renderSpecificTools());

            groupSpecificTools.push(
                <MenuItem
                    key={
                        this.props.clientId +
                        '-toolsDropdownMenu-SpecificTools-duplicate'
                    }
                    icon={pages}
                    onClick={() => {
                        this.props.duplicateBlocks([this.props.clientId]);
                    }}
                >
                    Duplicate
                </MenuItem>,
            );

            menuGroup.push(
                <MenuGroup
                    key={
                        this.props.clientId + '-toolsDropdownMenu-SpecificTools'
                    }
                >
                    {groupSpecificTools}
                </MenuGroup>,
            );
        }

        if (this.getReusableBlock() != null) {
            menuGroup.push(
                <MenuGroup
                    key={this.props.clientId + '-toolsDropdownMenu-reusable'}
                >
                    <MenuItem
                        key={
                            this.props.clientId +
                            '-toolsDropdownMenu-reusable-manage-all'
                        }
                        onClick={() =>
                            window.open(
                                GLOBAL_LOCALIZED.admin_url +
                                    'edit.php?post_type=wp_block',
                                '_blank',
                            )
                        }
                    >
                        Manage all reusable blocks
                    </MenuItem>
                    <MenuItem
                        key={
                            this.props.clientId +
                            '-toolsDropdownMenu-reusable-convert-to-regular'
                        }
                        onClick={() =>
                            window.open(
                                GLOBAL_LOCALIZED.admin_url +
                                    'post.php?post=' +
                                    this.getReusableBlock() +
                                    '&action=edit',
                                '_blank',
                            )
                        }
                    >
                        Convert to regular blocks
                    </MenuItem>
                    <MenuItem
                        key={
                            this.props.clientId +
                            '-toolsDropdownMenu-reusable-manage'
                        }
                        onClick={() =>
                            window.open(
                                GLOBAL_LOCALIZED.admin_url +
                                    'post.php?post=' +
                                    this.getReusableBlock() +
                                    '&action=edit',
                                '_blank',
                            )
                        }
                    >
                        Manage this reusable block
                    </MenuItem>
                </MenuGroup>,
            );
        }

        if (typeof this.props.removeBlock != 'undefined') {
            menuGroup.push(
                <MenuGroup
                    key={this.props.clientId + '-toolsDropdownMenu-remove'}
                >
                    <MenuItem
                        key={
                            this.props.clientId +
                            '-toolsDropdownMenu-remove-trash'
                        }
                        icon={trash}
                        onClick={() => this.showModal('removeSubmitted')}
                    >
                        Remove {this.title}
                    </MenuItem>
                </MenuGroup>,
            );
        }

        return menuGroup.length > 0 ? (
            <li className="breadcrumb-tools">
                <DropdownMenu
                    key={this.props.clientId + '-toolsDropdownMenu'}
                    icon={cog}
                    label="Advanced"
                >
                    {() => {
                        return menuGroup;
                    }}
                </DropdownMenu>
            </li>
        ) : null;
    }

    /**
     * Allows to check if the current component is reusable or not
     */
    isReusable(): boolean {
        return this.getReusableBlock() !== null;
    }

    /**
     * Get the internal component id
     */
    getId(): string {
        return this.getAttribute('anchor');
    }

    renderPropsEdition() {
        if (
            !__OEditorApp.exists() ||
            !__OEditorApp.getInstance().isBlockEdited(this.props.clientId)
        ) {
            return null;
        }

        let catReOrder = {};
        const defaultCat = {
            default: { name: 'General', props: {} },
            block_settings: {
                name: 'Settings',
                props: {
                    anchor: { type: 'string', label: 'ID (anchor)' },
                },
            },
        };

        if (this.propsExists()) {
            // 1. Loop Props Categories
            if (
                typeof GLOBAL_LOCALIZED.props_categories != 'undefined' &&
                GLOBAL_LOCALIZED.props_categories != null
            ) {
                for (const [keyCatProps, valueCatProps] of Object.entries(
                    GLOBAL_LOCALIZED.props_categories,
                )) {
                    catReOrder[keyCatProps] = {
                        name: valueCatProps.title,
                        props: {},
                    };
                }
            }
            if (
                typeof this.props.block_spec.props_categories != 'undefined' &&
                this.props.block_spec.props_categories != null
            ) {
                for (const [keyCatProps, valueCatProps] of Object.entries(
                    this.props.block_spec.props_categories,
                )) {
                    catReOrder[valueCatProps.id] = {
                        name: valueCatProps.name,
                        props: {},
                    };
                }
            }

            catReOrder = {
                ...catReOrder,
                ...defaultCat,
            };

            // 2. Loop Props
            for (const [keyProp, valueProp] of Object.entries(
                this.props.block_spec.props,
            )) {
                if (typeof valueProp != 'object' || valueProp == null) continue;

                const currentCatToPush =
                    typeof valueProp.category != 'undefined' &&
                    valueProp.category != null &&
                    valueProp.category in catReOrder
                        ? valueProp.category
                        : ['margin', 'padding', 'gap', 'spaces'].includes(
                              keyProp,
                          )
                        ? 'spacing'
                        : 'default';
                catReOrder[currentCatToPush].props[keyProp] = valueProp;
            }
        }

        // 3. Remove empty category
        for (const [keyProp, valueProp] of Object.entries(catReOrder)) {
            if (Object.keys(catReOrder[keyProp].props).length == 0) {
                delete catReOrder[keyProp];
            }
        }

        // 4. Render
        const tabPanel = [];
        for (const [keyCat, valCat] of Object.entries(catReOrder)) {
            if (valCat.props.length == 0) continue;

            let currentEditCat = [];
            let errorAttributes = 0;
            let warningAttributes = 0;

            forEachCatProps: for (const [keyProp, prop] of Object.entries(
                valCat.props,
            )) {
                // Conditional treatment
                if (typeof prop.conditional == 'object') {
                    for (const [index, conditionalField] of Object.entries(
                        prop.conditional,
                    )) {
                        let conditionalFieldKey =
                            Object.keys(conditionalField)[0];
                        let conditionalFieldValue =
                            conditionalField[conditionalFieldKey];
                        if (
                            this.getAttribute(conditionalFieldKey) !=
                            conditionalFieldValue
                        )
                            continue forEachCatProps;
                    }
                }

                let currentAttributeError = false;

                if (
                    typeof this.state.error == 'object' &&
                    this.state.error != null &&
                    typeof this.state.error[keyProp] == 'object'
                ) {
                    currentAttributeError = this.state.error[keyProp];

                    if (typeof this.state.error[keyProp].error != 'undefined') {
                        errorAttributes++;
                    }
                    if (
                        typeof this.state.error[keyProp].warning != 'undefined'
                    ) {
                        warningAttributes++;
                    }
                }

                let valueProp = this.getAttribute(keyProp);
                currentEditCat.push(
                    Attributes.renderProp(
                        prop,
                        [keyProp],
                        { [keyProp]: valueProp },
                        this,
                        currentAttributeError,
                    ),
                );
            }

            if (keyCat == 'block_settings') {
                currentEditCat.push(this.renderInspectorControls());
            }

            let titleTab = valCat.name;
            if (errorAttributes > 0) {
                titleTab = (
                    <>
                        {titleTab}
                        <span className="error-attributes">
                            {errorAttributes}
                        </span>
                    </>
                );
            }
            // else if (warningAttributes > 0) {
            //     titleTab = (
            //         <>
            //             {titleTab}
            //             <span className="warning-attributes">
            //                 {warningAttributes}
            //             </span>
            //         </>
            //     );
            // }

            tabPanel.push({
                name: keyCat,
                title: titleTab + ' ' + this.state.needPreviewUpdate,
                content: currentEditCat,
            });
        }

        const portalContainer = document.querySelector(
            '.o-editor-app.block .o-editor-app_body',
        );
        if (!portalContainer) return null;

        return createPortal(
            <Placeholder
                key={this.props.clientId + '-ConfigurationPlaceholder'}
                isColumnLayout={true}
                className="wpe-component_edit_placeholder"
            >
                {Render.tabPanelComponent(
                    this.props.clientId,
                    tabPanel,
                    function (tabPanel) {
                        return tabPanel.content;
                    },
                )}
            </Placeholder>,
            portalContainer,
        );
    }

    showModal(modal, once = false) {
        if (once && this.state.modal[modal] != null) {
            return;
        }

        if (
            __OUserPreferences.getInstance().getUserPreferences(modal) !=
                null &&
            !__OUserPreferences.getInstance().getUserPreferences(modal)
        ) {
            return;
        }

        const newModalState = this.state.modal;
        newModalState[modal] = true;
        this.setState({ modal: newModalState });
    }

    hideModal(modal) {
        const newModalState = this.state.modal;
        newModalState[modal] = false;
        this.setState({ modal: newModalState });
    }

    displayModal(modal) {
        return this.state.modal[modal];
    }

    updatePreview() {
        if (
            typeof this.state.needPreviewUpdate != 'undefined' &&
            this.state.needPreviewUpdate
        ) {
            this.apiFetch();
        }
    }

    renderInspectorControls() {
        return null;
    }

    liveRendering() {
        return null;
    }

    renderEditFormZone(content = null, titleOnly = true) {
        let editZone = [];

        // Title
        editZone.push(
            <div key={this.props.clientId + '_EditZoneTitle'} className="title">
                {this.title}
            </div>,
        );

        if (!titleOnly) {
            // Separator
            // editZone.push(<div key={ this.props.clientId + "_EditZoneSeparator1" } className="separator"></div>);

            // Edit button
            // editZone.push(this.renderButtonEditZone());

            // Additionnal content
            if (content != null) {
                // Separator
                editZone.push(
                    <div
                        key={this.props.clientId + '_EditZoneSeparator2'}
                        className="separator"
                    ></div>,
                );

                // Additionnal content
                editZone.push(content);
            }

            // editZone.push(this.renderTools());
        }

        return (
            <div
                key={this.props.clientId + '-EditZoneButtonGroup'}
                className="o-toolbar-container"
                // onDoubleClick={(e) => {
                //     __OEditorApp.getInstance().open( this );
                //     if( this.getReusableBlock() != null ) {
                //         __OModal.getInstance().showModal('alertReusableBlock', true);
                //     }
                // }}
            >
                <div className="o-toolbar">{editZone}</div>
            </div>
        );
    }

    renderButtonEditZone() {
        return (
            <Button
                key={this.props.clientId + '-EditZoneButtonEdition'}
                className="abtButtonEditZone"
                variant="primary"
                onMouseDown={() => {
                    __OEditorApp.getInstance().open(this);
                    if (this.getReusableBlock() != null) {
                        __OModal
                            .getInstance()
                            .showModal('alertReusableBlock', true);
                    }
                }}
            >
                <Dashicon icon="edit" /> Edit
            </Button>
        );
    }

    renderRemoveModal() {
        return this.displayModal('removeSubmitted') &&
            typeof this.props.removeBlock != 'undefined' ? (
            <WpeModal
                key={this.props.clientId + '-removeBlockWpeModal'}
                id={this.props.clientId + '-removeBlockWpeModal'}
                title={'Confirm "' + this.title + '" suppression'}
                onClose={() => this.hideModal('removeSubmitted')}
                type="warning"
            >
                <p>Are you sure you want to remove this block ?</p>
                <div className="bouttonGroup">
                    <div className="row">
                        <Button
                            variant="primary"
                            onMouseDown={() => {
                                this.hideModal('removeSubmitted');
                                this.props.removeBlock(this.props.clientId);
                            }}
                        >
                            <Dashicon icon="trash" />
                            Yes, remove it.
                        </Button>
                    </div>
                    <div className="row">
                        <Button
                            variant="link"
                            onMouseDown={() =>
                                this.hideModal('removeSubmitted')
                            }
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </WpeModal>
        ) : null;
    }

    render() {
        const render = [];

        render.push(this.renderPropsEdition());
        render.push(this.liveRendering());
        render.push(this.renderRemoveModal());

        return render;
    }
}
