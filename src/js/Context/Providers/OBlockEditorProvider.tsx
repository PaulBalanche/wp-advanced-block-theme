import { createContext, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

export function OBlockEditorProvider({
    clientId,
    name,
    blockSpec,
    themeSpec,
    children,
}) {
    const {
        blockInstance,
        parentsBlock,
        selectedBlockClientId,
        blocksList,
        relations,
        editorMode,
    } = useSelect(
        (select) => {
            const parentsBlock = [];
            const getBlockParents =
                select('core/block-editor').getBlockParents(clientId);
            for (let i in getBlockParents) {
                parentsBlock.push(
                    select('core/block-editor').getBlock(getBlockParents[i]),
                );
            }

            const selectedBlockClientId =
                select('core/block-editor').getSelectedBlockClientId();

            const { getEntityRecords } = select('core');
            const relations = [];

            if (
                blockSpec?.id &&
                name === 'custom/wpe-component-' + blockSpec.id
            ) {
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
                        relations[valueProp.entity] = getEntityRecords(
                            'postType',
                            valueProp.entity,
                            {
                                per_page: -1,
                                status: 'publish',
                            },
                        );
                    }
                }
            }

            return {
                blockInstance: select('core/block-editor').getBlock(clientId),
                parentsBlock: parentsBlock,
                selectedBlockClientId: selectedBlockClientId,
                blocksList: select('core/block-editor').getBlocks(clientId),
                relations: relations,
                editorMode: select('core/edit-post').getEditorMode(),
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
    } = useDispatch(blockEditorStore);

    return (
        <OBlockEditorContext.Provider
            value={{
                clientId,
                blockInstance,
                parentsBlock,
                selectedBlockClientId,
                selectBlock,
                resetSelection,
                insertBlock,
                removeBlock,
                duplicateBlocks,
                moveBlocksUp,
                moveBlocksDown,
                blockSpec,
                themeSpec,
                blocksList,
                relations,
                editorMode,
            }}
        >
            {children}
        </OBlockEditorContext.Provider>
    );
}

export const OBlockEditorContext = createContext(null);
