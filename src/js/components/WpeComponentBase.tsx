import { createPortal, useContext, useState } from '@wordpress/element';
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
import __OUserPreferences from './OUserPreferences';
import { Fragment } from 'react';
import { OBlockEditorContext } from '../Context/Providers/OBlockEditorProvider';

export default function WpeComponentBase({
    attributes,
    setAttributes,
    name,
    description,
    error,
    children,
}) {
    const [modal, setModal] = useState({
        removeSubmitted: false,
    });

    const {
        clientId,
        parentsBlock,
        selectedBlockClientId,
        selectBlock,
        removeBlock,
        duplicateBlocks,
        moveBlocksUp,
        moveBlocksDown,
        blockSpec,
    } = useContext(OBlockEditorContext);

    const title =
        typeof name != 'undefined' ? getBlockType(name).title : 'Undefined...';
    const reusableBlock = checkIsReusableBlock();

    if (getAttribute('anchor') != null) {
        setAttributes({ anchor: clientId });
    }

    function getAttribute(key) {
        return typeof attributes[key] != 'undefined' ? attributes[key] : null;
    }

    function propsExists() {
        return (
            typeof blockSpec != 'undefined' &&
            typeof blockSpec == 'object' &&
            typeof blockSpec.props != 'undefined' &&
            typeof blockSpec.props == 'object' &&
            Object.keys(blockSpec.props).length > 0
        );
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
        }

        return (
            <div
                key={clientId + '-EditZoneButtonGroup'}
                className="o-toolbar-container"
            >
                <div className="o-toolbar">{editZone}</div>
            </div>
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

    render.push(children);
    render.push(renderRemoveModal());

    return render;
}
