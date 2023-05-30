import { Button, Dashicon } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { OBlocksAppender } from './OBlocksAppender';

import { withDispatch, withSelect } from '@wordpress/data';

import { store as blockEditorStore } from '@wordpress/block-editor';

export const ButtonBlockAppender = ({
    inserterItems = null,
    insertBlock = null,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    let blockCategories = [];
    inserterItems.forEach((block) => {
        if (!blockCategories.includes(block.category)) {
            blockCategories.push(block.category);
        }
    });
    blockCategories = blockCategories.map((category) => {
        return {
            name: category,
            title:
                category == 'wpe-layout'
                    ? 'Layout'
                    : category.charAt(0).toUpperCase() + category.slice(1),
        };
    });

    return (
        <>
            <Button
                key={'o-editor-inspector-button-insertNewBlock'}
                className="inspectorButtonInsertNewBlock"
                variant="primary"
                onClick={() => {
                    setIsOpen(true);
                }}
            >
                <Dashicon icon="plus" />
                Add block
            </Button>
            {isOpen && (
                <OBlocksAppender
                    blocks={inserterItems}
                    blockCategories={blockCategories}
                    insertBlockFunction={insertBlock}
                    onClose={() => {
                        setIsOpen(false);
                    }}
                />
            )}
        </>
    );
};

export const OButtonBlockAppender = compose([
    withSelect((select) => {
        const inserterItems = select('core/block-editor').getInserterItems();

        return {
            inserterItems,
        };
    }),
    withDispatch((dispatch) => {
        const { insertBlock } = dispatch(blockEditorStore);

        return {
            insertBlock,
        };
    }),
])(ButtonBlockAppender);
