import { Render } from '../Static/Render';

import { parse } from '@wordpress/blocks';

import { compose } from '@wordpress/compose';

import { withDispatch, withSelect } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';
import { WpeModal } from './WpeModal';

import { store as blockEditorStore } from '@wordpress/block-editor';

const PatternsAppender = ({
    rootClientId,
    patterns,
    patternCategories,
    onClose,
    insertBlocksFunction,
    createSuccessNotice,
}) => {
    let patternCategoriesToDisplay = [];
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
    patternCategoriesToDisplay = patternCategoriesToDisplay.map((category) => {
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

    return (
        <WpeModal
            key={'o-editor-inspector-modal-insertNewPattern'}
            id={'o-editor-inspector-modal-insertNewPattern'}
            title="Add pattern"
            onClose={() => {
                onClose();
            }}
        >
            {Render.tabPanelComponent(
                'o-editor-inspector-tab-insertNewPattern',
                patternCategoriesToDisplay,
                (tabPanel) => {
                    return (
                        <div className="items">
                            {patterns.map((pattern, index) => {
                                if (
                                    pattern.categories?.length > 0 &&
                                    pattern.categories.includes(tabPanel.name)
                                ) {
                                    return (
                                        <div
                                            key={
                                                'o-editor-inspector-modal-pattern-' +
                                                index
                                            }
                                            className="item"
                                            onMouseDown={() => {
                                                insertBlocksFunction(
                                                    parse(pattern.content),
                                                    undefined,
                                                    rootClientId,
                                                    true,
                                                );
                                                onClose();
                                                createSuccessNotice(
                                                    sprintf(
                                                        /* translators: %s: block pattern title. */
                                                        __('"%s" inserted.'),
                                                        pattern.title,
                                                    ),
                                                    {
                                                        type: 'snackbar',
                                                        icon: '🔥',
                                                    },
                                                );
                                            }}
                                        >
                                            <div className="previewContainer">
                                                {pattern?.example?.attributes
                                                    ?.editorPreviewImage && (
                                                    <img
                                                        src={
                                                            pattern.example
                                                                .attributes
                                                                .editorPreviewImage
                                                        }
                                                    />
                                                )}
                                            </div>
                                            <div className="blockTitle">
                                                {pattern.title}
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

export const OPatternsAppender = compose([
    withSelect((select, props) => {
        const clientId =
            typeof props.rootClientId != 'undefined'
                ? props.rootClientId
                : undefined;

        const { __experimentalGetAllowedPatterns, getSettings } =
            select(blockEditorStore);

        return {
            patterns: __experimentalGetAllowedPatterns(clientId),
            patternCategories:
                getSettings().__experimentalBlockPatternCategories,
        };
    }),
    withDispatch((dispatch) => {
        const { createSuccessNotice } = dispatch(noticesStore);
        return {
            createSuccessNotice,
        };
    }),
])(PatternsAppender);
