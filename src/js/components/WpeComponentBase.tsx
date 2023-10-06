import { useContext, useState } from '@wordpress/element';
import { Button, Dashicon } from '@wordpress/components';
import { isReusableBlock } from '@wordpress/blocks';
import { WpeModal } from './WpeModal';
import __OUserPreferences from './OUserPreferences';
import { OBlockEditorContext } from '../Context/Providers/OBlockEditorProvider';

export function WpeComponentBase({
    attributes,
    setAttributes,
    name,
    description,
    error,
    children,
}) {
    const [modal, setModal] = useState({
        removeSubmitted: false,
    });

    const { clientId, parentsBlock, removeBlock, blockTitle } =
        useContext(OBlockEditorContext);

    const reusableBlock = checkIsReusableBlock();

    if (getAttribute('anchor') != null) {
        setAttributes({ anchor: clientId });
    }

    function getAttribute(key) {
        return typeof attributes[key] != 'undefined' ? attributes[key] : null;
    }

    function checkIsReusableBlock() {
        if (typeof parentsBlock == 'object') {
            for (let i in parentsBlock) {
                if (isReusableBlock(parentsBlock[i])) {
                    return parentsBlock[i].attributes.ref;
                }
            }
        }

        return null;
    }

    function isEditable() {
        return true;
    }

    function getReusableBlock() {
        return reusableBlock;
    }

    function descriptionMessage() {
        const messages = [];

        if (typeof description != 'undefined') {
            messages.push(
                <div
                    key={clientId + '-descriptionMessage-info'}
                    className="row"
                >
                    {description}
                </div>,
            );
        }

        return messages.length > 0 ? (
            <div key={clientId + '-descriptionMessage'} className="description">
                {messages}
            </div>
        ) : null;
    }

    function getNavParent() {
        const navParent = [];
        if (
            parentsBlock != null &&
            typeof parentsBlock == 'object' &&
            parentsBlock.length > 0
        ) {
            parentsBlock.forEach((element) => {
                navParent.push(element);
            });
        }

        return navParent;
    }

    /**
     * Allows to check if the current component is reusable or not
     */
    function isReusable(): boolean {
        return getReusableBlock() !== null;
    }

    /**
     * Get the internal component id
     */
    function getId(): string {
        return getAttribute('anchor');
    }

    function showModal(modal, once = false) {
        if (once && modal[modal] != null) {
            return;
        }

        if (
            __OUserPreferences.getInstance().getUserPreferences(modal) !=
                null &&
            !__OUserPreferences.getInstance().getUserPreferences(modal)
        ) {
            return;
        }

        const newModalState = modal;
        newModalState[modal] = true;
        setModal(newModalState);
    }

    function hideModal(modal) {
        const newModalState = modal;
        newModalState[modal] = false;
        setModal(newModalState);
    }

    function displayModal(modal) {
        return modal[modal];
    }

    function updatePreview() {
        if (
            typeof this.state.needPreviewUpdate != 'undefined' &&
            this.state.needPreviewUpdate
        ) {
            apiFetch();
        }
    }

    function renderInspectorControls() {
        return null;
    }

    function liveRendering() {
        return null;
    }

    function renderEditFormZone(content = null, titleOnly = true) {
        let editZone = [];

        // Title
        editZone.push(
            <div key={clientId + '_EditZoneTitle'} className="title">
                {blockTitle}
            </div>,
        );

        if (!titleOnly) {
            // Additionnal content
            if (content != null) {
                // Separator
                editZone.push(
                    <div
                        key={clientId + '_EditZoneSeparator2'}
                        className="separator"
                    ></div>,
                );

                // Additionnal content
                editZone.push(content);
            }
        }

        return (
            <div
                key={clientId + '-EditZoneButtonGroup'}
                className="o-toolbar-container"
            >
                <div className="o-toolbar">{editZone}</div>
            </div>
        );
    }

    function renderRemoveModal() {
        return displayModal('removeSubmitted') &&
            typeof removeBlock != 'undefined' ? (
            <WpeModal
                key={clientId + '-removeBlockWpeModal'}
                id={clientId + '-removeBlockWpeModal'}
                title={'Confirm "' + blockTitle + '" suppression'}
                onClose={() => hideModal('removeSubmitted')}
                type="warning"
            >
                <p>Are you sure you want to remove this block ?</p>
                <div className="bouttonGroup">
                    <div className="row">
                        <Button
                            variant="primary"
                            onMouseDown={() => {
                                hideModal('removeSubmitted');
                                removeBlock(clientId);
                            }}
                        >
                            <Dashicon icon="trash" />
                            Yes, remove it.
                        </Button>
                    </div>
                    <div className="row">
                        <Button
                            variant="link"
                            onMouseDown={() => hideModal('removeSubmitted')}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </WpeModal>
        ) : null;
    }

    return children;
}
