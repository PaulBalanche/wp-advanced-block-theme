import { Button, Dashicon } from '@wordpress/components';
import { useContext, useState } from '@wordpress/element';
import { OBlocksAppender } from './OBlocksAppender';
import { OBlockEditorContext } from '../Context/Providers/OBlockEditorProvider';

export function OButtonBlockAppender({
    extraAttributes = {},
    buttonExtraClass = null,
    buttonDashicon = null,
    buttonVariant = 'primary',
    label = 'Add',
}) {
    const { clientId, insertBlock, inserterItems, isEmptyPage } =
        useContext(OBlockEditorContext);

    const [isOpen, setIsOpen] = useState(isEmptyPage);

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
                variant={buttonVariant}
                onClick={() => {
                    setIsOpen(true);
                }}
                className={'insert-new-block ' + buttonExtraClass}
            >
                {buttonDashicon && <Dashicon icon={buttonDashicon} />}
                {label}
            </Button>
            {isOpen && (
                <OBlocksAppender
                    rootClientId={clientId}
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
}
