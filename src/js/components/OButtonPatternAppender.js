import { Button, Dashicon } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { OPatternsAppender } from './OPatternsAppender';

import { withDispatch, withSelect } from '@wordpress/data';

import { store as blockEditorStore } from '@wordpress/block-editor';

const ButtonPatternAppender = ({ rootClientId, insertBlocks }) => {
    const [isOpen, setIsOpen] = useState(false);

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
                Add pattern
            </Button>
            {isOpen && (
                <OPatternsAppender
                    rootClientId={rootClientId}
                    insertBlocksFunction={insertBlocks}
                    onClose={() => {
                        setIsOpen(false);
                    }}
                />
            )}
        </>
    );
};

export const OButtonPatternAppender = compose([
    withSelect((select, props) => {
        const clientId =
            typeof props.rootClientId != 'undefined'
                ? props.rootClientId
                : undefined;

        return {
            rootClientId: clientId,
        };
    }),
    withDispatch((dispatch) => {
        const { insertBlocks } = dispatch(blockEditorStore);

        return {
            insertBlocks,
        };
    }),
])(ButtonPatternAppender);
