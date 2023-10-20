import { createBlock, parse, isReusableBlock } from '@wordpress/blocks';
import { Render } from '../Static/Render';
import { __, sprintf } from '@wordpress/i18n';
import { WpeModal } from './WpeModal';
import { useContext } from '@wordpress/element';
import { OBlockEditorContext } from '../Context/Providers/OBlockEditorProvider';
import { Dashicon } from '@wordpress/components';

export function OBlocksAppender({ onClose, extraAttributes = {} }) {
    const {
        clientId,
        isEmptyPage,
        createSuccessNotice,
        inserterItems,
        insertBlock,
        insertBlocks,
        patterns,
        patternCategories,
    } = useContext(OBlockEditorContext);

    function getBlocks() {
        return inserterItems.map((block) => {
            return !isReusableBlock(block) ? block : null;
        });
    }

    function getReusableBlocks() {
        return inserterItems.map((block) => {
            return isReusableBlock(block) ? block : null;
        });
    }

    function getBlocksCategories() {
        const blockCategories = [];
        getBlocks().forEach((block) => {
            if (
                block != null &&
                typeof block == 'object' &&
                !blockCategories.includes(block.category)
            ) {
                blockCategories.push(block.category);
            }
        });
        return blockCategories.map((category) => {
            return {
                name: category,
                title:
                    category == 'wpe-layout'
                        ? 'Layout'
                        : category.charAt(0).toUpperCase() + category.slice(1),
            };
        });
    }
    function getPatternCategories() {
        const patternCategoriesToDisplay = [];
        patterns.forEach((pattern, index) => {
            if (
                pattern.categories == null ||
                typeof pattern.categories != 'object' ||
                pattern.categories.length == 0
            ) {
                patterns[index].categories = ['uncategorized'];
            }

            pattern.categories.forEach((category) => {
                if (!patternCategoriesToDisplay.includes(category)) {
                    patternCategoriesToDisplay.push(category);
                }
            });
        });

        return patternCategoriesToDisplay.map((category) => {
            let categoryFormatted = {
                name: category,
                title: category.charAt(0).toUpperCase() + category.slice(1),
            };
            patternCategories.forEach((initialCategory) => {
                if (initialCategory.name == category) {
                    categoryFormatted = {
                        name: initialCategory.name,
                        title: initialCategory.label,
                    };
                    return;
                }
            });

            return categoryFormatted;
        });
    }

    function renderEntities(entities, category = null) {
        return (
            <div className="items">
                {entities.map((entity, index) => {
                    if (
                        entity != null &&
                        typeof entity == 'object' &&
                        (category == null ||
                            (typeof entity.categories != 'undefined' &&
                                entity.categories?.length > 0 &&
                                entity.categories.includes(category)) ||
                            (typeof entity.category != 'undefined' &&
                                entity.category == category))
                    ) {
                        return (
                            <div
                                key={'o-editor-inspector-modal-block-' + index}
                                className="item"
                                onMouseDown={() => {
                                    if (
                                        isReusableBlock(entity) ||
                                        typeof entity.content == 'undefined'
                                    ) {
                                        insertBlock(
                                            createBlock(entity.name, {
                                                ...entity.initialAttributes,
                                                ...extraAttributes,
                                            }),
                                            undefined,
                                            clientId ?? undefined,
                                            true,
                                        );
                                    } else {
                                        insertBlocks(
                                            parse(entity.content),
                                            undefined,
                                            clientId ?? undefined,
                                            true,
                                        );
                                    }
                                    onClose();
                                    createSuccessNotice(
                                        sprintf(
                                            /* translators: %s: block pattern title. */
                                            __('"%s" inserted.'),
                                            entity.title,
                                        ),
                                        {
                                            type: 'snackbar',
                                            icon: '🔥',
                                        },
                                    );
                                }}
                            >
                                <div className="previewContainer">
                                    {entity?.example?.attributes
                                        ?.editorPreviewImage && (
                                        <img
                                            src={
                                                entity.example.attributes
                                                    .editorPreviewImage
                                            }
                                        />
                                    )}
                                    {!entity?.example?.attributes
                                        ?.editorPreviewImage && (
                                        <img src="https://picsum.photos/400/225" />
                                    )}
                                </div>
                                <div className="blockTitle">{entity.title}</div>
                            </div>
                        );
                    }
                })}
            </div>
        );
    }

    function renderBlocks() {
        if (getBlocksCategories().length > 1) {
            return renderTabPanelEntities(getBlocksCategories(), getBlocks());
        } else {
            return renderEntities(getBlocks());
        }
    }

    function renderReusableBlocks() {
        return renderEntities(getReusableBlocks());
    }

    function renderPatterns() {
        if (getPatternCategories().length > 1) {
            return renderTabPanelEntities(getPatternCategories(), patterns);
        } else {
            return renderEntities(patterns);
        }
    }

    function renderTabPanelEntities(categories, entities) {
        return Render.tabPanelComponent(
            'o-editor-inspector-tab-insertNewBlock',
            categories,
            (tabPanel) => {
                return renderEntities(entities, tabPanel.name);
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
            title="Insert block(s)"
            shouldCloseOnEsc={!isEmptyPage}
            shouldCloseOnClickOutside={!isEmptyPage}
            isFullScreen={true}
            hideHeader={isEmptyPage}
        >
            {isEmptyPage && (
                <div className="new_page_info">
                    <h1>Welcome! </h1>
                    <p>This page is blank. Its construction begins here!</p>
                    <p>
                        Insert a <strong>block</strong> or a{' '}
                        <strong>blocks pattern</strong>.
                    </p>
                </div>
            )}

            {Render.tabPanelComponent(
                'o-editor-inspector-tab-blocks-appender',
                [
                    {
                        name: 'blocks',
                        title: 'Blocks',
                    },
                    {
                        name: 'reusable_blocks',
                        title: 'Reusable blocks',
                    },
                    {
                        name: 'patterns',
                        title: 'Patterns',
                    },
                ],
                (tab) => {
                    switch (tab.name) {
                        case 'blocks':
                            return renderBlocks();
                        case 'reusable_blocks':
                            return renderReusableBlocks();
                        case 'patterns':
                            return renderPatterns();
                    }
                },
                null,
                null,
                'switch_blocks_patterns',
            )}
        </WpeModal>
    );
}
