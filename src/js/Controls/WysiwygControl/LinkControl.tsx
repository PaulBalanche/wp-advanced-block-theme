import {
    Component,
    createRef,
    useContext,
    useEffect,
    useState,
} from '@wordpress/element';

import {
    Button,
    Dashicon,
    __experimentalInputControl as InputControl,
    ToggleControl,
} from '@wordpress/components';

import { WpeModal } from '../../Components/WpeModal';
import { OBlockEditorContext } from '../../Context/Providers/OBlockEditorProvider';

export function LinkControl({ editorState, onSubmit, onRemove }) {
    const close = _close.bind(this);
    const confirmLink = _confirmLink.bind(this);
    const removeLink = _removeLink.bind(this);

    const [editionMode, setEditionMode] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [url, setUrl] = useState(null);
    const [isOpen, setIsOpen] = useState();
    const [openInNewTab, setOpenInNewTab] = useState();

    const { clientId } = useContext(OBlockEditorContext);

    useEffect(() => {
        const selectionState = editorState.getSelection();
        const anchorKey = selectionState.getAnchorKey();
        const contentState = editorState.getCurrentContent();
        const blockWithLink = contentState.getBlockForKey(anchorKey);

        const start = selectionState.getStartOffset();

        const linkKey = blockWithLink.getEntityAt(start);
        const linkData = linkKey
            ? contentState.getEntity(linkKey).getData()
            : null;
        setEditionMode(linkData && linkData.url ? true : false);
    });

    function initValue() {
        const selectionState = editorState.getSelection();
        const anchorKey = selectionState.getAnchorKey();
        const contentState = editorState.getCurrentContent();
        const blockWithLink = contentState.getBlockForKey(anchorKey);

        const start = selectionState.getStartOffset();
        const end = selectionState.getEndOffset();
        const selectedText = blockWithLink.getText().slice(start, end);

        const linkKey = blockWithLink.getEntityAt(start);
        const linkData = linkKey
            ? contentState.getEntity(linkKey).getData()
            : null;

        setIsOpen(true);
        setUrl(linkData && linkData.url ? linkData.url : '');
        setOpenInNewTab(linkData && linkData.openInNewTab ? true : false);

        if (!editionMode && selectedText == '') {
            setIsValid(false);
            return;
        }
        setIsValid(true);
    }

    const open = () => {
        initValue();
    };

    function _close() {
        setIsOpen(false);
        setUrl('');
        setOpenInNewTab(false);
    }

    function isTargetBlank() {
        return openInNewTab;
    }

    function toggleTarget() {
        setOpenInNewTab(!isTargetBlank());
    }

    function _confirmLink() {
        onSubmit({
            url: url,
            openInNewTab: isTargetBlank(),
        });
        _close();
    }

    function _removeLink() {
        onRemove();
        _close();
    }

    function getContent() {
        return (
            <>
                <InputControl
                    label="Url"
                    value={url}
                    onChange={(newUrl) => setUrl(newUrl)}
                />
                <ToggleControl
                    label="Open in new tab"
                    checked={isTargetBlank()}
                    onChange={() => toggleTarget()}
                />
            </>
        );
    }

    function getFooter() {
        return editionMode ? (
            <>
                <Button variant="primary" onMouseDown={confirmLink}>
                    <Dashicon icon="saved" />
                    Save
                </Button>
                <Button variant="tertiary" onMouseDown={removeLink}>
                    <Dashicon icon="trash" />
                    Remove
                </Button>
            </>
        ) : (
            <>
                <Button variant="primary" onMouseDown={confirmLink}>
                    <Dashicon icon="saved" />
                    Save
                </Button>
            </>
        );
    }

    const title = editionMode ? 'Edit link' : 'Add link';

    return (
        <>
            <Button
                variant="tertiary"
                className={editionMode ? 'is-active' : ''}
                onClick={open}
            >
                <Dashicon icon="admin-links" />
            </Button>
            {isValid && isOpen && (
                <WpeModal
                    key={clientId + '-linkWpeModal'}
                    id={clientId + '-linkWpeModal'}
                    title={title}
                    onClose={close}
                >
                    {getContent()}
                    <div className="bouttonGroup">{getFooter()}</div>
                </WpeModal>
            )}
        </>
    );
}
