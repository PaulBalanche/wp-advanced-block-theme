/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { Button, Dashicon } from '@wordpress/components';
import { useContext } from '@wordpress/element';
import { OBlockEditorContext } from '../../../Context/Providers/OBlockEditorProvider';
import { OButtonBlockAppender } from '../../../Components/OButtonBlockAppender';

/**
 * registerBlockType edit function
 */
export function EditMode({ attributes }) {
    const { clientId, selectBlock } = useContext(OBlockEditorContext);

    const innerBlocksProps = useInnerBlocksProps(
        useBlockProps({ className: '' }),
        {
            renderAppender: () => (
                <ButtonGroup className="inspectorButtonInsertNew">
                    <OButtonBlockAppender />
                </ButtonGroup>
            ),
        },
    );
    innerBlocksProps.key = 'innerBlocksProps_' + clientId;

    return (
        <div {...innerBlocksProps}>
            <div
                key={clientId + '-blockEditOverlay'}
                className={`block-edit-overlay`}
                onMouseDown={() => {
                    selectBlock(clientId);
                    // const domBlock = document.querySelector(
                    //     '#block-' + clientId,
                    // );
                    // domBlock?.scrollIntoView({
                    //     behavior: 'smooth',
                    //     block: 'center',
                    // });
                    // __OEditorApp.getInstance().open();
                }}
            >
                <h2>Container</h2>
                <Button variant="link">Click to edit</Button>
            </div>
        </div>
    );
}
