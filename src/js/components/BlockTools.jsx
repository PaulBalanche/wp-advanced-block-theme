import {
    chevronDown,
    chevronUp,
    cog,
    external,
    pages,
    trash,
} from '@wordpress/icons';
import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { useContext } from '@wordpress/element';
import { OBlockEditorContext } from '../Context/Providers/OBlockEditorProvider';

export function BlockTools() {
    const {
        clientId,
        parentsBlock,
        moveBlocksUp,
        moveBlocksDown,
        duplicateBlocks,
        removeBlock,
        componentRestApiUrl,
        blockTitle,
    } = useContext(OBlockEditorContext);

    const menuGroup = [];

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

    menuGroup.push(
        <MenuGroup key={clientId + '-toolsDropdownMenu-top'}>
            <MenuItem
                key={clientId + '-toolsDropdownMenu-top-Preview'}
                icon={external}
                onClick={() =>
                    window.open(
                        GLOBAL_LOCALIZED.rest_api_url + componentRestApiUrl,
                        '_blank',
                    )
                }
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
                key={clientId + '-toolsDropdownMenu-SpecificTools-duplicate'}
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
                    key={clientId + '-toolsDropdownMenu-reusable-manage-all'}
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
                    onClick={() => removeBlock(clientId)}
                >
                    Remove {blockTitle}
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
