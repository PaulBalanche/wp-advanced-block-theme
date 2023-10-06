import { createContext } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { store as blockDirectoryStore } from '@wordpress/block-directory';
import { getBlockType } from '@wordpress/blocks';
import { store as noticesStore } from '@wordpress/notices';

export function OBlockEditorProvider({ clientId, children }) {
    const {
        blockInstance,
        parentsBlock,
        componentRestApiUrl,
        blockTitle,
        selectedBlockClientId,
        blocksList,
        relations,
        editorMode,
        blockAttributes,
        blockSpec,
        notices,
        blocksErrorNotices,
    } = useSelect(
        (select) => {
            const parentsBlock = [];
            const relations = [];
            let blockSpec = null;
            let componentRestApiUrl = null;
            let blockTitle = null;
            const blockInstance =
                select('core/block-editor').getBlock(clientId);

            if (blockInstance) {
                const getBlockParents =
                    select('core/block-editor').getBlockParents(clientId);
                for (let i in getBlockParents) {
                    parentsBlock.push(
                        select('core/block-editor').getBlock(
                            getBlockParents[i],
                        ),
                    );
                }

                for (const componentKey in GLOBAL_LOCALIZED.components) {
                    if (
                        blockInstance.name ==
                        'custom/wpe-component-' +
                            GLOBAL_LOCALIZED.components[componentKey].id
                    ) {
                        blockSpec = GLOBAL_LOCALIZED.components[componentKey];

                        componentRestApiUrl =
                            GLOBAL_LOCALIZED.rest_api_namespace +
                            GLOBAL_LOCALIZED.componentblock_attr_autosaves_rest_api_resource_path +
                            '/' +
                            GLOBAL_LOCALIZED.post_id +
                            '/' +
                            blockSpec.id +
                            '/' +
                            clientId;

                        blockTitle = getBlockType(blockInstance.name).title;

                        // Loop Props
                        for (const [keyProp, valueProp] of Object.entries(
                            blockSpec.props,
                        )) {
                            if (
                                (valueProp.type === 'relation' ||
                                    valueProp.type === 'form') &&
                                typeof valueProp.entity != 'undefined' &&
                                relations[valueProp.entity] == null
                            ) {
                                relations[valueProp.entity] = select(
                                    'core',
                                ).getEntityRecords(
                                    'postType',
                                    valueProp.entity,
                                    {
                                        per_page: -1,
                                        status: 'publish',
                                    },
                                );
                            }
                        }

                        break;
                    }
                }
            }

            return {
                parentsBlock,
                relations,
                blockInstance,
                blockSpec,
                blockTitle,
                componentRestApiUrl,
                selectedBlockClientId:
                    select('core/block-editor').getSelectedBlockClientId(),
                blockAttributes:
                    select('core/block-editor').getBlockAttributes(clientId),
                blocksList: select('core/block-editor').getBlocks(clientId),
                editorMode: select('core/edit-post').getEditorMode(),
                notices: select(noticesStore).getNotices(),
                blocksErrorNotices: select(
                    'core/block-directory',
                ).getErrorNotices(),
            };
        },
        [clientId],
    );

    const {
        selectBlock,
        resetSelection,
        insertBlock,
        removeBlock,
        duplicateBlocks,
        moveBlocksUp,
        moveBlocksDown,
        updateBlockAttributes,
    } = useDispatch(blockEditorStore);

    const { setErrorNotice, clearErrorNotice } =
        useDispatch(blockDirectoryStore);

    return (
        <OBlockEditorContext.Provider
            value={{
                clientId,
                blockInstance,
                parentsBlock,
                componentRestApiUrl,
                blockTitle,
                selectedBlockClientId,
                selectBlock,
                resetSelection,
                insertBlock,
                removeBlock,
                duplicateBlocks,
                moveBlocksUp,
                moveBlocksDown,
                blockSpec,
                themeSpec: GLOBAL_LOCALIZED.theme_spec,
                blocksList,
                relations,
                editorMode,
                blockAttributes,
                updateBlockAttributes,
                blocksErrorNotices,
                setErrorNotice,
                clearErrorNotice,
            }}
        >
            {children}
        </OBlockEditorContext.Provider>
    );
}

export const OBlockEditorContext = createContext(null);
