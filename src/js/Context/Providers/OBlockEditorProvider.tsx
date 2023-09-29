import { createContext } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

export function OBlockEditorProvider({ clientId, children }) {
    const { parentsBlock, selectedBlockClientId } = useSelect(
        (select) => {
            const getBlockParents =
                select('core/block-editor').getBlockParents(clientId);
            const parentsBlock = [];
            for (let i in getBlockParents) {
                parentsBlock.push(
                    select('core/block-editor').getBlock(getBlockParents[i]),
                );
            }

            const selectedBlockClientId =
                select('core/block-editor').getSelectedBlockClientId();

            return {
                parentsBlock: parentsBlock,
                selectedBlockClientId: selectedBlockClientId,
            };
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

    return (
        <OBlockEditorContext.Provider
            value={{
                clientId,
                parentsBlock,
                selectedBlockClientId,
                selectBlock,
                removeBlock,
                duplicateBlocks,
                moveBlocksUp,
                moveBlocksDown,
            }}
        >
            {children}
        </OBlockEditorContext.Provider>
    );
}

export const OBlockEditorContext = createContext(null);
