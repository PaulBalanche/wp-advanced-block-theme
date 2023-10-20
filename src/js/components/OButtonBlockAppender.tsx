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
    const { isEmptyPage } = useContext(OBlockEditorContext);

    const [isOpen, setIsOpen] = useState(isEmptyPage);

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
                    onClose={() => {
                        setIsOpen(false);
                    }}
                    extraAttributes={extraAttributes}
                />
            )}
        </>
    );
}
