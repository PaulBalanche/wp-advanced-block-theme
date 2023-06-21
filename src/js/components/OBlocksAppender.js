import { createBlock } from '@wordpress/blocks';
import { Render } from '../Static/Render';

import { compose } from '@wordpress/compose';
import { withDispatch } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';
import { WpeModal } from './WpeModal';

const BlocksAppender = ({
    rootClientId,
    blocks,
    blockCategories,
    insertBlockFunction,
    onClose,
    createSuccessNotice,
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
                                                    createBlock(
                                                        block.name,
                                                        block.initialAttributes,
                                                    ),
                                                    undefined,
                                                    rootClientId,
                                                    true,
                                                );
                                                onClose();
                                                createSuccessNotice(
                                                    sprintf(
                                                        /* translators: %s: block pattern title. */
                                                        __('"%s" inserted.'),
                                                        block.title,
                                                    ),
                                                    {
                                                        type: 'snackbar',
                                                        icon: '🔥',
                                                    },
                                                );
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

export const OBlocksAppender = compose([
    withDispatch((dispatch) => {
        const { createSuccessNotice } = dispatch(noticesStore);
        return {
            createSuccessNotice,
        };
    }),
])(BlocksAppender);
