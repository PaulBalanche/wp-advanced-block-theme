import { Component, createPortal } from "@wordpress/element";

import {
    Button,
    Dashicon,
    DropdownMenu,
    MenuGroup,
    MenuItem,
    Placeholder,
} from "@wordpress/components";

import { chevronDown, chevronUp, cog, pages, trash } from "@wordpress/icons";

import { Attributes } from "../Static/Attributes";
import { Render } from "../Static/Render";

import { getBlockType } from "@wordpress/blocks";

import { isReusableBlock } from "@wordpress/blocks";

import { WpeModal } from "./Modal";

import __OEditorApp from "./OEditorApp";
import __OModal from "./OModal";
import __OUserPreferences from "./OUserPreferences";

import globalData from "../global";

export class WpeComponentBase extends Component {
    constructor() {
        super(...arguments);

        this.state = {
            modal: {
                removeSubmitted: false,
            },
        };

        this.title = getBlockType(this.props.name).title;
        this.reusableBlock = this.isReusableBlock();

        globalData.componentInstances[this.props.clientId] = this;
        if (typeof this.getAttribute("anchor") == "undefined") {
            this.setAttributes({ anchor: this.props.clientId });
        }
    }

    getAttribute(key) {
        return this.props.attributes[key];
    }

    setAttributes(attributes) {
        this.props.setAttributes(attributes);
    }

    propsExists() {
        return (
            typeof this.props == "object" && typeof this.props.block_spec != 'undefined' && typeof this.props.block_spec == 'object' && typeof this.props.block_spec.props != 'undefined' && typeof this.props.block_spec.props == "object" &&
            Object.keys(this.props.block_spec.props).length > 0
        );
    }
    
    getCurrentEditedProp() {
        return ( typeof this.state.currentEditedProp != 'undefined' ) ? this.state.currentEditedProp : null;
    }

    isReusableBlock() {
        if (typeof this.props.parentsBlock == "object") {
            for (var i in this.props.parentsBlock) {
                if (isReusableBlock(this.props.parentsBlock[i])) {
                    return this.props.parentsBlock[i].attributes.ref;
                }
            }
        }

        return null;
    }

    getReusableBlock() {
        return this.reusableBlock;
    }

    descriptionMessage() {
        const messages = [];

        if (typeof this.description != "undefined") {
            messages.push(
                <div
                    key={this.props.clientId + "-descriptionMessage-info"}
                    className="row"
                >
                    {this.description}
                </div>
            );
        }

        return messages.length > 0 ? (
            <div
                key={this.props.clientId + "-descriptionMessage"}
                className="description"
            >
                {messages}
            </div>
        ) : null;
    }

    renderSpecificTools() {
        return null;
    }

    renderTitle() {
        const anchor = this.getAttribute("anchor");
        const displayAnchor =
            typeof anchor != "undefined" &&
            anchor.match(
                /^[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+$/
            ) == null;

        return (
            <>
                <h2>
                    {this.props.title ?? this.title ?? "Editor"}
                    {displayAnchor && (
                        <span className="subtitle">#{anchor}</span>
                    )}
                </h2>
            </>
        );
    }

    renderTools() {
        const menuGroup = [];

        if (
            typeof this.props.moveBlocksUp != "undefined" ||
            typeof this.props.moveBlocksDown != "undefined"
        ) {
            const groupMoveBlock = [];

            if (
                typeof this.props.moveBlocksUp != "undefined" &&
                this.getReusableBlock() == null
            ) {
                groupMoveBlock.push(
                    <MenuItem
                        key={this.props.clientId + "-toolsDropdownMenu-move-up"}
                        icon={chevronUp}
                        onClick={() =>
                            this.props.moveBlocksUp([this.props.clientId])
                        }
                    >
                        Move up
                    </MenuItem>
                );
            }

            if (
                typeof this.props.moveBlocksDown != "undefined" &&
                this.getReusableBlock() == null
            ) {
                groupMoveBlock.push(
                    <MenuItem
                        key={
                            this.props.clientId + "-toolsDropdownMenu-move-down"
                        }
                        icon={chevronDown}
                        onClick={() =>
                            this.props.moveBlocksDown([this.props.clientId])
                        }
                    >
                        Move down
                    </MenuItem>
                );
            }

            menuGroup.push(
                <MenuGroup
                    key={this.props.clientId + "-toolsDropdownMenu-move"}
                >
                    {groupMoveBlock}
                </MenuGroup>
            );
        }

        if (typeof this.props.duplicateBlocks != "undefined") {
            const groupSpecificTools = [];

            groupSpecificTools.push(this.renderSpecificTools());

            groupSpecificTools.push(
                <MenuItem
                    key={
                        this.props.clientId +
                        "-toolsDropdownMenu-SpecificTools-duplicate"
                    }
                    icon={pages}
                    onClick={() => {
                        __OEditorApp.getInstance().hide();
                        this.props.duplicateBlocks([this.props.clientId]);
                    }}
                >
                    Duplicate
                </MenuItem>
            );

            menuGroup.push(
                <MenuGroup
                    key={
                        this.props.clientId + "-toolsDropdownMenu-SpecificTools"
                    }
                >
                    {groupSpecificTools}
                </MenuGroup>
            );
        }

        if ( this.getReusableBlock() != null ) {
            menuGroup.push(
                <MenuGroup
                    key={this.props.clientId + "-toolsDropdownMenu-reusable"}
                >
                    <MenuItem
                        key={
                            this.props.clientId +
                            "-toolsDropdownMenu-reusable-manage-all"
                        }
                        onClick={() => window.open(js_const.admin_url + 'edit.php?post_type=wp_block', "_blank")}
                    >
                        Manage all reusable blocks
                    </MenuItem>
                    <MenuItem
                        key={
                            this.props.clientId +
                            "-toolsDropdownMenu-reusable-convert-to-regular"
                        }
                        onClick={() => window.open(js_const.admin_url + 'post.php?post=' + this.getReusableBlock() + '&action=edit', "_blank")}
                    >
                        Convert to regular blocks
                    </MenuItem>
                    <MenuItem
                        key={
                            this.props.clientId +
                            "-toolsDropdownMenu-reusable-manage"
                        }
                        onClick={() => window.open(js_const.admin_url + 'post.php?post=' + this.getReusableBlock() + '&action=edit', "_blank")}
                    >
                        Manage this reusable block
                    </MenuItem>
                </MenuGroup>
            );
        }

        if (typeof this.props.removeBlock != "undefined") {
            menuGroup.push(
                <MenuGroup
                    key={this.props.clientId + "-toolsDropdownMenu-remove"}
                >
                    <MenuItem
                        key={
                            this.props.clientId +
                            "-toolsDropdownMenu-remove-trash"
                        }
                        icon={trash}
                        onClick={() => this.showModal("removeSubmitted")}
                    >
                        Remove {this.title}
                    </MenuItem>
                </MenuGroup>
            );
        }

        return menuGroup.length > 0 ? (
            <DropdownMenu
                key={this.props.clientId + "-toolsDropdownMenu"}
                icon={cog}
                label="Advanced"
            >
                {() => {
                    return menuGroup;
                }}
            </DropdownMenu>
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
        return this.getAttribute("anchor");
    }

    renderPropsEdition() {
        if (
            !__OEditorApp.exists() ||
            !__OEditorApp.getInstance().isBlockEdited(this.props.clientId)
        ) {
            return null;
        }

        const catReOrder = {
            default: { name: "Attributes", props: {} },
            block_settings: {
                name: "Settings",
                props: {
                    anchor: { type: "string", label: "Anchor" },
                },
            },
            spacing: { name: "Spacing", props: {} },
        };

        if (this.propsExists()) {
            // 1. Loop Props Categories
            if (
                typeof this.props.block_spec.props_categories != "undefined" &&
                this.props.block_spec.props_categories != null
            ) {
                for (const [keyCatProps, valueCatProps] of Object.entries(
                    this.props.block_spec.props_categories
                )) {
                    catReOrder[valueCatProps.id] = {
                        name: valueCatProps.name,
                        props: {},
                    };
                }
            }

            // 2. Loop Props
            for (const [keyProp, valueProp] of Object.entries(
                this.props.block_spec.props
            )) {
                if (typeof valueProp != "object" || valueProp == null) continue;

                const currentCatToPush =
                    typeof valueProp.category != "undefined" &&
                    valueProp.category != null &&
                    valueProp.category in catReOrder
                        ? valueProp.category
                        : ["margin", "padding", "gap"].includes(keyProp)
                        ? "spacing"
                        : "default";
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

            forEachCatProps: for (const [keyProp, prop] of Object.entries(
                valCat.props
            )) {
                // Conditional treatment
                if (typeof prop.conditional == "object") {
                    for (const [index, conditionalField] of Object.entries(
                        prop.conditional
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

                if( typeof this.state.error == 'object' && this.state.error != null && typeof this.state.error[keyProp] != 'undefined' ) {
                    errorAttributes++;
                    currentAttributeError = this.state.error[keyProp];
                }

                let valueProp = this.getAttribute(keyProp);
                currentEditCat.push(
                    Attributes.renderProp(
                        prop,
                        [keyProp],
                        { [keyProp]: valueProp },
                        this,
                        currentAttributeError
                    )
                );
            }

            if (keyCat == "block_settings") {
                currentEditCat.push(this.renderInspectorControls());
            }

            const titleTab = ( errorAttributes > 0 ) ? <>{valCat.name}<span className="missing-attributes">{errorAttributes}</span></> : valCat.name;

            tabPanel.push({
                name: keyCat,
                title: titleTab,
                content: currentEditCat
            });
        }

        const portalContainer = document.querySelector(".o-editor-app.block .o-editor-app_body")
        if ( ! portalContainer)
            return null;

        return createPortal(
            <Placeholder
                key={this.props.clientId + "-ConfigurationPlaceholder"}
                isColumnLayout={true}
                className="wpe-component_edit_placeholder"
            >
                {Render.tabPanelComponent(
                    this.props.clientId,
                    tabPanel,
                    function (tabPanel) {
                        return tabPanel.content;
                    }
                )}
            </Placeholder>,
            portalContainer
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
        if( typeof this.state.needPreviewUpdate != "undefined" ) {
            this.setState({ needPreviewUpdate: true });
        }
    }

    renderFooter() {
        return (
            <>
                {/* {typeof this.state.needPreviewUpdate != "undefined" && (
                    <Button
                        key={this.props.clientId + "-buttonUpdatePreview"}
                        className="abtButtonUpdatePreview"
                        variant="primary"
                        onMouseDown={() => {
                            this.setState({ needPreviewUpdate: true });
                            __OModal
                                .getInstance()
                                .showModal("alertUpdateAttributes", true);
                        }}
                    >
                        <Dashicon icon="update" />
                        Update preview
                    </Button>
                )} */}
                {typeof this.previewUrl != "undefined" && (
                    <Button
                        key={this.props.clientId + "-buttonPreviewUrl"}
                        className="abtButtonPreviewUrl"
                        variant="primary"
                        href={this.previewUrl}
                        target="_blank"
                    >
                        <Dashicon icon="external" />
                        Open preview
                    </Button>
                )}
                <div className="o-flex-grow"></div>
                <Button
                    key={this.props.clientId + "-buttonCloseEditZone"}
                    className="abtButtonCloseEditZone"
                    variant="secondary"
                    onMouseDown={() => __OEditorApp.getInstance().clean()}
                >
                    <Dashicon icon="no-alt" />
                    Close
                </Button>
            </>
        );
    }

    renderInspectorControls() {
        return null;
    }

    liveRendering() {
        return null;
    }

    renderEditFormZone(content = null, titleOnly = false) {
        let editZone = [];

        // Title
        editZone.push(
            <div key={this.props.clientId + "_EditZoneTitle"} className="title">
                {this.title}
            </div>
        );

        if (false && !titleOnly) {
            // Separator
            // editZone.push(<div key={ this.props.clientId + "_EditZoneSeparator1" } className="separator"></div>);

            // Edit button
            editZone.push(this.renderButtonEditZone());

            // Additionnal content
            if (content != null) {
                // Separator
                editZone.push(
                    <div
                        key={this.props.clientId + "_EditZoneSeparator2"}
                        className="separator"
                    ></div>
                );

                // Additionnal content
                editZone.push(content);
            }

            editZone.push(this.renderTools());
        }

        return (
            <div
                key={this.props.clientId + "-EditZoneButtonGroup"}
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
                key={this.props.clientId + "-EditZoneButtonEdition"}
                className="abtButtonEditZone"
                variant="primary"
                onMouseDown={() => {
                    __OEditorApp.getInstance().open(this);
                    if (this.getReusableBlock() != null) {
                        __OModal
                            .getInstance()
                            .showModal("alertReusableBlock", true);
                    }
                }}
            >
                <Dashicon icon="edit" /> Edit
            </Button>
        );
    }

    renderRemoveModal() {
        return this.displayModal("removeSubmitted") &&
            typeof this.props.removeBlock != "undefined" ? (
            <WpeModal
                key={this.props.clientId + "-removeBlockWpeModal"}
                id={this.props.clientId + "-removeBlockWpeModal"}
                title={'Confirm "' + this.title + '" suppression'}
                onClose={() => this.hideModal("removeSubmitted")}
                hasFooter={false}
                type="warning"
            >
                <p>Are you sure you want to remove this block ?</p>
                <div className="bouttonGroup">
                    <div className="row">
                        <Button
                            variant="primary"
                            onMouseDown={() => {
                                this.hideModal("removeSubmitted");
                                __OEditorApp.getInstance().hide();
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
                                this.hideModal("removeSubmitted")
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
