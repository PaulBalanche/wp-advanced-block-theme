import { Button } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { OBlocksAppender } from './OBlocksAppender';

import { withDispatch, withSelect } from '@wordpress/data';

import { store as blockEditorStore } from '@wordpress/block-editor';

const ButtonBlockAppender = ({
    inserterItems = null,
    insertBlock = null,
    rootClientId,
    extraAttributes = {},
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
                variant="primary"
                onClick={() => {
                    setIsOpen(true);
                }}
            >
                {/* <Dashicon icon="plus" /> */}
                Add block
            </Button>
            {isOpen && (
                <OBlocksAppender
                    rootClientId={rootClientId}
                    blocks={inserterItems}
                    blockCategories={blockCategories}
                    insertBlockFunction={insertBlock}
                    onClose={() => {
                        setIsOpen(false);
                    }}
                    extraAttributes={extraAttributes}
                />
            )}
        </>
    );
};

export const OButtonBlockAppender = compose([
    withSelect((select, props) => {
        const clientId =
            typeof props.rootClientId != 'undefined'
                ? props.rootClientId
                : undefined;

        const inserterItems =
            select('core/block-editor').getInserterItems(clientId);

        return {
            inserterItems,
            rootClientId: clientId,
        };
    }),
    withDispatch((dispatch) => {
        const { insertBlock } = dispatch(blockEditorStore);

        return {
            insertBlock,
        };
    }),
])(ButtonBlockAppender);
