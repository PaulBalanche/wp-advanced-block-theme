import { createPortal, useState } from '@wordpress/element';
import { store as blockEditorStore } from '@wordpress/block-editor';
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
import { useSelect, useDispatch } from '@wordpress/data';
import { getBlockType, isReusableBlock } from '@wordpress/blocks';
import { WpeModal } from './WpeModal';
import __OEditorApp from './OEditorApp';
import __OModal from './OModal';
import __OUserPreferences from './OUserPreferences';
import { Fragment } from 'react';
import globalData from '../global';
import EditMode from '../Blocks/component-block-master/edit';

function WpeComponentBase({
    attributes,
    setAttributes,
    clientId,
    name,
    description,
    block_spec,
    error,
    setNeedPreviewUpdate,
    children,
}) {
    const [modal, setModal] = useState({
        removeSubmitted: false,
    });

    // Detect if inside a reusable block
    const { parentsBlock } = useSelect(
        (select) => {
            const getBlockParents =
                select('core/block-editor').getBlockParents(clientId);
            const parentsBlock = [];
            for (let i in getBlockParents) {
                parentsBlock.push(
                    select('core/block-editor').getBlock(getBlockParents[i]),
                );
            }

            return { parentsBlock: parentsBlock };
        },
        [clientId],
    );

    const {
        selectBlock,
        removeBlock,
        duplicateBlocks,
        moveBlocksUp,
        moveBlocksDown,
    } = useDispatch(blockEditorStore);

    const title =
        typeof name != 'undefined' ? getBlockType(name).title : 'Undefined...';
    const reusableBlock = checkIsReusableBlock();

    globalData.componentInstances[clientId] = this;
    if (getAttribute('anchor') != null) {
        setAttributes({ anchor: clientId });
    }

    function getAttribute(key) {
        return typeof attributes[key] != 'undefined' ? attributes[key] : null;
    }

    function propsExists() {
        return (
            typeof block_spec != 'undefined' &&
            typeof block_spec == 'object' &&
            typeof block_spec.props != 'undefined' &&
            typeof block_spec.props == 'object' &&
            Object.keys(block_spec.props).length > 0
        );
    }

    function getCurrentEditedProp() {
        return typeof this.state.currentEditedProp != 'undefined'
            ? this.state.currentEditedProp
            : null;
    }

    function checkIsReusableBlock() {
        if (typeof parentsBlock == 'object') {
            for (let i in parentsBlock) {
                if (isReusableBlock(parentsBlock[i])) {
                    return parentsBlock[i].attributes.ref;
                }
            }
        }

        return null;
    }

    function isEditable() {
        return true;
    }

    function getReusableBlock() {
        return reusableBlock;
    }

    function descriptionMessage() {
        const messages = [];

        if (typeof description != 'undefined') {
            messages.push(
                <div
                    key={clientId + '-descriptionMessage-info'}
                    className="row"
                >
                    {description}
                </div>,
            );
        }

        return messages.length > 0 ? (
            <div key={clientId + '-descriptionMessage'} className="description">
                {messages}
            </div>
        ) : null;
    }

    function renderSpecificTools() {
        return null;
    }

    function getNavParent() {
        const navParent = [];
        if (
            parentsBlock != null &&
            typeof parentsBlock == 'object' &&
            parentsBlock.length > 0
        ) {
            parentsBlock.forEach((element) => {
                navParent.push(element);
            });
        }

        return navParent;
    }

    function renderTitle() {
        const anchor = getAttribute('anchor');
        const displayAnchor =
            typeof anchor != 'undefined' &&
            anchor != null &&
            anchor.match(
                /^[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+$/,
            ) == null;

        const path = [];
        getNavParent().forEach((element) => {
            path.push(
                <li
                    key={'breadcrumb-parent-block-' + element.clientId}
                    className="breadcrumb-parent-block"
                >
                    <Button
                        key={'path-button-' + element.clientId}
                        className="path-element"
                        onMouseDown={() => selectBlock(element.clientId)}
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
                        {title ?? title ?? 'Editor'}
                        {displayAnchor && (
                            <span className="subtitle">#{anchor}</span>
                        )}
                    </h2>
                </li>
            </>
        );
    }

    function renderFooter() {
        const path = [];
        getNavParent().forEach((element, index) => {
            path.push(
                <Fragment key={'footer-breadcrumb-' + index + '-' + clientId}>
                    <li className="separator">/</li>
                    <li className="breadcrumb-parent-block">
                        <Button
                            key={'path-button-footer-' + element.clientId}
                            variant="link"
                            onMouseDown={() => selectBlock(element.clientId)}
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
                {title && (
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
                            {title}
                        </li>
                    </>
                )}
            </>
        );
    }

    function renderTools() {
        const menuGroup = [];

        if (typeof this.previewUrl != 'undefined') {
            menuGroup.push(
                <MenuGroup key={clientId + '-toolsDropdownMenu-top'}>
                    <MenuItem
                        key={clientId + '-toolsDropdownMenu-top-Preview'}
                        icon={external}
                        onClick={() => window.open(this.previewUrl, '_blank')}
                    >
                        Open preview
                    </MenuItem>
                </MenuGroup>,
            );
        }

        if (
            typeof moveBlocksUp != 'undefined' ||
            typeof moveBlocksDown != 'undefined'
        ) {
            const rootClientId =
                parentsBlock != null &&
                typeof parentsBlock == 'object' &&
                parentsBlock.length > 0
                    ? parentsBlock[parentsBlock.length - 1].clientId
                    : undefined;

            const groupMoveBlock = [];

            if (
                typeof moveBlocksUp != 'undefined' &&
                getReusableBlock() == null
            ) {
                groupMoveBlock.push(
                    <MenuItem
                        key={clientId + '-toolsDropdownMenu-move-up'}
                        icon={chevronUp}
                        onClick={() => moveBlocksUp([clientId], rootClientId)}
                    >
                        Move up
                    </MenuItem>,
                );
            }

            if (
                typeof moveBlocksDown != 'undefined' &&
                this.getReusableBlock() == null
            ) {
                groupMoveBlock.push(
                    <MenuItem
                        key={clientId + '-toolsDropdownMenu-move-down'}
                        icon={chevronDown}
                        onClick={() => moveBlocksDown([clientId], rootClientId)}
                    >
                        Move down
                    </MenuItem>,
                );
            }

            menuGroup.push(
                <MenuGroup key={clientId + '-toolsDropdownMenu-move'}>
                    {groupMoveBlock}
                </MenuGroup>,
            );
        }

        if (typeof duplicateBlocks != 'undefined') {
            const groupSpecificTools = [];

            groupSpecificTools.push(renderSpecificTools());

            groupSpecificTools.push(
                <MenuItem
                    key={
                        clientId + '-toolsDropdownMenu-SpecificTools-duplicate'
                    }
                    icon={pages}
                    onClick={() => {
                        duplicateBlocks([clientId]);
                    }}
                >
                    Duplicate
                </MenuItem>,
            );

            menuGroup.push(
                <MenuGroup key={clientId + '-toolsDropdownMenu-SpecificTools'}>
                    {groupSpecificTools}
                </MenuGroup>,
            );
        }

        if (getReusableBlock() != null) {
            menuGroup.push(
                <MenuGroup key={clientId + '-toolsDropdownMenu-reusable'}>
                    <MenuItem
                        key={
                            clientId + '-toolsDropdownMenu-reusable-manage-all'
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
                            clientId +
                            '-toolsDropdownMenu-reusable-convert-to-regular'
                        }
                        onClick={() =>
                            window.open(
                                GLOBAL_LOCALIZED.admin_url +
                                    'post.php?post=' +
                                    getReusableBlock() +
                                    '&action=edit',
                                '_blank',
                            )
                        }
                    >
                        Convert to regular blocks
                    </MenuItem>
                    <MenuItem
                        key={clientId + '-toolsDropdownMenu-reusable-manage'}
                        onClick={() =>
                            window.open(
                                GLOBAL_LOCALIZED.admin_url +
                                    'post.php?post=' +
                                    getReusableBlock() +
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

        if (typeof removeBlock != 'undefined') {
            menuGroup.push(
                <MenuGroup key={clientId + '-toolsDropdownMenu-remove'}>
                    <MenuItem
                        key={clientId + '-toolsDropdownMenu-remove-trash'}
                        icon={trash}
                        onClick={() => showModal('removeSubmitted')}
                    >
                        Remove {title}
                    </MenuItem>
                </MenuGroup>,
            );
        }

        return menuGroup.length > 0 ? (
            <li className="breadcrumb-tools">
                <DropdownMenu
                    key={clientId + '-toolsDropdownMenu'}
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
    function isReusable(): boolean {
        return getReusableBlock() !== null;
    }

    /**
     * Get the internal component id
     */
    function getId(): string {
        return getAttribute('anchor');
    }

    function renderPropsEdition() {
        if (
            !__OEditorApp.exists() ||
            !__OEditorApp.getInstance().isBlockEdited(clientId)
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

        if (propsExists()) {
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
                typeof block_spec.props_categories != 'undefined' &&
                block_spec.props_categories != null
            ) {
                for (const [keyCatProps, valueCatProps] of Object.entries(
                    block_spec.props_categories,
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
                block_spec.props,
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
                            getAttribute(conditionalFieldKey) !=
                            conditionalFieldValue
                        )
                            continue forEachCatProps;
                    }
                }

                let currentAttributeError = false;

                if (
                    typeof error == 'object' &&
                    error != null &&
                    typeof error[keyProp] == 'object'
                ) {
                    currentAttributeError = error[keyProp];

                    if (typeof error[keyProp].error != 'undefined') {
                        errorAttributes++;
                    }
                    if (typeof error[keyProp].warning != 'undefined') {
                        warningAttributes++;
                    }
                }

                let valueProp = getAttribute(keyProp);
                currentEditCat.push(
                    Attributes.renderProp(
                        prop,
                        [keyProp],
                        { [keyProp]: valueProp },
                        clientId,
                        currentAttributeError,
                        setNeedPreviewUpdate,
                        setAttributes,
                    ),
                );
            }

            if (keyCat == 'block_settings') {
                currentEditCat.push(renderInspectorControls());
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
                title: titleTab,
                content: currentEditCat,
            });
        }

        const portalContainer = document.querySelector(
            '.o-editor-app.block .o-editor-app_body',
        );
        if (!portalContainer) return null;

        return createPortal(
            <Placeholder
                key={clientId + '-ConfigurationPlaceholder'}
                isColumnLayout={true}
                className="wpe-component_edit_placeholder"
            >
                {Render.tabPanelComponent(
                    clientId,
                    tabPanel,
                    function (tabPanel) {
                        return tabPanel.content;
                    },
                )}
            </Placeholder>,
            portalContainer,
        );
    }

    function showModal(modal, once = false) {
        if (once && modal[modal] != null) {
            return;
        }

        if (
            __OUserPreferences.getInstance().getUserPreferences(modal) !=
                null &&
            !__OUserPreferences.getInstance().getUserPreferences(modal)
        ) {
            return;
        }

        const newModalState = modal;
        newModalState[modal] = true;
        setModal(newModalState);
    }

    function hideModal(modal) {
        const newModalState = modal;
        newModalState[modal] = false;
        setModal(newModalState);
    }

    function displayModal(modal) {
        return modal[modal];
    }

    function updatePreview() {
        if (
            typeof this.state.needPreviewUpdate != 'undefined' &&
            this.state.needPreviewUpdate
        ) {
            apiFetch();
        }
    }

    function renderInspectorControls() {
        return null;
    }

    function liveRendering() {
        return null;
    }

    function renderEditFormZone(content = null, titleOnly = true) {
        let editZone = [];

        // Title
        editZone.push(
            <div key={clientId + '_EditZoneTitle'} className="title">
                {title}
            </div>,
        );

        if (!titleOnly) {
            // Separator
            // editZone.push(<div key={ clientId + "_EditZoneSeparator1" } className="separator"></div>);

            // Edit button
            // editZone.push(this.renderButtonEditZone());

            // Additionnal content
            if (content != null) {
                // Separator
                editZone.push(
                    <div
                        key={clientId + '_EditZoneSeparator2'}
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
                key={clientId + '-EditZoneButtonGroup'}
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

    function renderButtonEditZone() {
        return (
            <Button
                key={clientId + '-EditZoneButtonEdition'}
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

    function renderRemoveModal() {
        return displayModal('removeSubmitted') &&
            typeof removeBlock != 'undefined' ? (
            <WpeModal
                key={clientId + '-removeBlockWpeModal'}
                id={clientId + '-removeBlockWpeModal'}
                title={'Confirm "' + title + '" suppression'}
                onClose={() => hideModal('removeSubmitted')}
                type="warning"
            >
                <p>Are you sure you want to remove this block ?</p>
                <div className="bouttonGroup">
                    <div className="row">
                        <Button
                            variant="primary"
                            onMouseDown={() => {
                                hideModal('removeSubmitted');
                                removeBlock(clientId);
                            }}
                        >
                            <Dashicon icon="trash" />
                            Yes, remove it.
                        </Button>
                    </div>
                    <div className="row">
                        <Button
                            variant="link"
                            onMouseDown={() => hideModal('removeSubmitted')}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </WpeModal>
        ) : null;
    }

    const render = [];

    render.push(renderPropsEdition());
    render.push(children);
    render.push(renderRemoveModal());

    return render;
}

export default WpeComponentBase;
