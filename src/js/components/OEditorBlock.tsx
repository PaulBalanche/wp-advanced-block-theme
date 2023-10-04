import {
    Button,
    Dashicon,
    DropdownMenu,
    MenuGroup,
    MenuItem,
    Placeholder,
} from '@wordpress/components';
import { getBlockType, isReusableBlock } from '@wordpress/blocks';
import { OEditorAppHeader } from './OEditorAppHeader';
import { OBlockEditorContext } from '../Context/Providers/OBlockEditorProvider';
import { Attributes } from '../Static/Attributes';
import { Render } from '../Static/Render';
import { useContext } from '@wordpress/element';
import { Fragment } from 'react';
import {
    chevronDown,
    chevronUp,
    cog,
    external,
    pages,
    trash,
} from '@wordpress/icons';

export function OEditorBlock({ isOpen, breadcrumb, footerBreadcrumb }) {
    const {
        clientId,
        blockInstance,
        parentsBlock,
        selectBlock,
        blockSpec,
        blockAttributes,
        moveBlocksUp,
        moveBlocksDown,
        duplicateBlocks,
        removeBlock,
    } = useContext(OBlockEditorContext);

    const title =
        typeof blockInstance.name != 'undefined'
            ? getBlockType(blockInstance.name).title
            : 'Undefined...';

    const previewUrl =
        GLOBAL_LOCALIZED.rest_api_url +
        GLOBAL_LOCALIZED.rest_api_namespace +
        GLOBAL_LOCALIZED.componentblock_attr_autosaves_rest_api_resource_path +
        '/' +
        GLOBAL_LOCALIZED.post_id +
        '/' +
        blockSpec.id +
        '/' +
        clientId;

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
                    <h2>{title ?? title ?? 'Editor'}</h2>
                </li>
            </>
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

        menuGroup.push(
            <MenuGroup key={clientId + '-toolsDropdownMenu-top'}>
                <MenuItem
                    key={clientId + '-toolsDropdownMenu-top-Preview'}
                    icon={external}
                    onClick={() => window.open(previewUrl, '_blank')}
                >
                    Open preview
                </MenuItem>
            </MenuGroup>,
        );

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
                checkIsReusableBlock() == null
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
                checkIsReusableBlock() == null
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

        if (checkIsReusableBlock() != null) {
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
                                    checkIsReusableBlock() +
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
                                    checkIsReusableBlock() +
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

    function getOpenMarker() {
        return (
            <Button variant="primary">
                <Dashicon icon="edit" />
            </Button>
        );
    }

    function getAttribute(key) {
        return typeof blockAttributes[key] != 'undefined'
            ? blockAttributes[key]
            : null;
    }

    function renderPropsEdition() {
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

        if (
            typeof blockSpec != 'undefined' &&
            typeof blockSpec == 'object' &&
            typeof blockSpec.props != 'undefined' &&
            typeof blockSpec.props == 'object' &&
            Object.keys(blockSpec.props).length > 0
        ) {
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
                typeof blockSpec.props_categories != 'undefined' &&
                blockSpec.props_categories != null
            ) {
                for (const [keyCatProps, valueCatProps] of Object.entries(
                    blockSpec.props_categories,
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
                blockSpec.props,
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

                let valueProp = getAttribute(keyProp);
                currentEditCat.push(
                    Attributes.renderProp(prop, [keyProp], {
                        [keyProp]: valueProp,
                    }),
                );
            }

            let titleTab = valCat.name;

            tabPanel.push({
                name: keyCat,
                title: titleTab,
                content: currentEditCat,
            });
        }

        return (
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
            </Placeholder>
        );
    }

    return (
        <>
            <OEditorAppHeader isOpen={isOpen} openMarker={getOpenMarker()}>
                <nav>
                    <ol>
                        {breadcrumb}
                        {renderTitle()}
                        {renderTools()}
                    </ol>
                </nav>
            </OEditorAppHeader>
            <div className="o-editor-app_body">{renderPropsEdition()}</div>
            <div className="o-editor-app_footer">
                <nav>
                    <ol>
                        {footerBreadcrumb}
                        {renderFooter()}
                    </ol>
                </nav>
            </div>
        </>
    );
}
