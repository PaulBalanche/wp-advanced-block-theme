import { createBlock } from '@wordpress/blocks';
import { Render } from '../Static/Render';
import { WpeModal } from './Modal';

export const OBlocksAppender = ({
    blocks,
    blockCategories,
    insertBlockFunction,
    onClose,
}) => {
    return (
        <WpeModal
            key={'o-editor-inspector-modal-insertNewBlock'}
            id={'o-editor-inspector-modal-insertNewBlock'}
            title="Add block"
            onClose={() => {
                onClose();
            }}
        >
            {Render.tabPanelComponent(
                'o-editor-inspector-tab-insertNewBlock',
                blockCategories,
                (tabPanel) => {
                    return (
                        <div className="items">
                            {blocks.map((block, index) => {
                                if (block.category == tabPanel.name) {
                                    return (
                                        <div
                                            key={
                                                'o-editor-inspector-modal-block-' +
                                                index
                                            }
                                            className="item"
                                            onMouseDown={() => {
                                                insertBlockFunction(
                                                    createBlock(block.name),
                                                );
                                                onClose();
                                            }}
                                        >
                                            <div className="previewContainer">
                                                {block?.example?.attributes
                                                    ?.editorPreviewImage && (
                                                    <img
                                                        src={
                                                            block.example
                                                                .attributes
                                                                .editorPreviewImage
                                                        }
                                                    />
                                                )}
                                            </div>
                                            <div className="blockTitle">
                                                {block.title}
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    );
                },
                null,
                null,
                'panelInspectorInsertNewBlock',
            )}
        </WpeModal>
    );
};
