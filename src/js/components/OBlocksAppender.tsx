import { createBlock } from '@wordpress/blocks';
import { Render } from '../Static/Render';
import { __, sprintf } from '@wordpress/i18n';
import { WpeModal } from './WpeModal';
import { useContext } from '@wordpress/element';
import { OBlockEditorContext } from '../Context/Providers/OBlockEditorProvider';
import { Dashicon } from '@wordpress/components';

export function OBlocksAppender({
    rootClientId,
    blocks,
    blockCategories,
    insertBlockFunction,
    onClose,
    extraAttributes = {},
}) {
    const { isEmptyPage, createSuccessNotice } =
        useContext(OBlockEditorContext);

    function renderComponentsCat(category = null) {
        return (
            <div className="items">
                {blocks.map((block, index) => {
                    if (category == null || block.category == category) {
                        return (
                            <div
                                key={'o-editor-inspector-modal-block-' + index}
                                className="item"
                                onMouseDown={() => {
                                    insertBlockFunction(
                                        createBlock(block.name, {
                                            ...block.initialAttributes,
                                            ...extraAttributes,
                                        }),
                                        undefined,
                                        rootClientId ?? undefined,
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
                                                block.example.attributes
                                                    .editorPreviewImage
                                            }
                                        />
                                    )}
                                    {!block?.example?.attributes
                                        ?.editorPreviewImage && (
                                        <img src="https://picsum.photos/400/225" />
                                    )}
                                </div>
                                <div className="blockTitle">{block.title}</div>
                            </div>
                        );
                    }
                })}
            </div>
        );
    }

    function renderComponents() {
        if (blockCategories.length > 1) {
            return renderTabPanelComponent();
        } else {
            return renderComponentsCat();
        }
    }
    function renderTabPanelComponent() {
        return Render.tabPanelComponent(
            'o-editor-inspector-tab-insertNewBlock',
            blockCategories,
            (tabPanel) => {
                return renderComponentsCat(tabPanel.name);
            },
            null,
            null,
            'panelInspectorInsertNewBlock',
        );
    }

    return (
        <WpeModal
            key={'o-editor-inspector-modal-insertNewBlock'}
            id={'o-editor-inspector-modal-insertNewBlock'}
            type={'insertNewBlock'}
            onClose={() => {
                onClose();
            }}
            shouldCloseOnEsc={!isEmptyPage}
            shouldCloseOnClickOutside={!isEmptyPage}
            hideHeader={true}
        >
            {isEmptyPage && (
                <div className="new_page_info">
                    <h1>Welcome! </h1>
                    <p>This page is blank. Its construction begins here!</p>
                </div>
            )}
            <h2 className="titleModal">
                Insert a block into those available below.
            </h2>
            {renderComponents()}
        </WpeModal>
    );
}
