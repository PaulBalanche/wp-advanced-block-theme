import { Component } from '@wordpress/element';

import {
    Button,
    Dashicon,
    __experimentalInputControl as InputControl,
    ToggleControl,
} from '@wordpress/components';

import { WpeModal } from '../../Components/WpeModal';

export class LinkControl extends Component {
    constructor() {
        super(...arguments);

        this.state = {};
        this.isValid = false;
        this.editionMode = false;
        this.close = this._close.bind(this);
        this.confirmLink = this._confirmLink.bind(this);
        this.removeLink = this._removeLink.bind(this);
        // this.removeLink = this._removeLink.bind(this);
    }

    componentDidUpdate() {
        const selectionState = this.props.editorState.getSelection();
        const anchorKey = selectionState.getAnchorKey();
        const contentState = this.props.editorState.getCurrentContent();
        const blockWithLink = contentState.getBlockForKey(anchorKey);

        const start = selectionState.getStartOffset();

        const linkKey = blockWithLink.getEntityAt(start);
        const linkData = linkKey
            ? contentState.getEntity(linkKey).getData()
            : null;
        this.editionMode = linkData && linkData.url ? true : false;
    }

    initValue() {
        const selectionState = this.props.editorState.getSelection();
        const anchorKey = selectionState.getAnchorKey();
        const contentState = this.props.editorState.getCurrentContent();
        const blockWithLink = contentState.getBlockForKey(anchorKey);

        const start = selectionState.getStartOffset();
        const end = selectionState.getEndOffset();
        const selectedText = blockWithLink.getText().slice(start, end);

        const linkKey = blockWithLink.getEntityAt(start);
        const linkData = linkKey
            ? contentState.getEntity(linkKey).getData()
            : null;

        this.setState({
            isOpen: true,
            url: linkData && linkData.url ? linkData.url : '',
            openInNewTab: linkData && linkData.openInNewTab ? true : false,
        });

        if (!this.editionMode && selectedText == '') {
            this.isValid = false;
            return;
        }
        this.isValid = true;
    }

    open = () => {
        this.initValue();
    };

    _close() {
        this.setState({
            isOpen: false,
            url: '',
            openInNewTab: false,
        });
    }

    getUrl() {
        return this.state.url;
    }

    setUrl(url) {
        this.setState({ url: url });
    }

    isTargetBlank() {
        return this.state.openInNewTab;
    }

    toggleTarget() {
        this.setState({ openInNewTab: !this.isTargetBlank() });
    }

    _confirmLink() {
        this.props.onSubmit({
            url: this.getUrl(),
            openInNewTab: this.isTargetBlank(),
        });
        this._close();
    }

    _removeLink() {
        this.props.onRemove();
        this._close();
    }

    getContent() {
        return (
            <>
                <InputControl
                    label="Url"
                    value={this.getUrl()}
                    onChange={(newUrl) => this.setUrl(newUrl)}
                />
                <ToggleControl
                    label="Open in new tab"
                    checked={this.isTargetBlank()}
                    onChange={() => this.toggleTarget()}
                />
            </>
        );
    }

    getFooter() {
        return this.editionMode ? (
            <>
                <Button variant="primary" onMouseDown={this.confirmLink}>
                    <Dashicon icon="saved" />
                    Save
                </Button>
                <Button variant="tertiary" onMouseDown={this.removeLink}>
                    <Dashicon icon="trash" />
                    Remove
                </Button>
            </>
        ) : (
            <>
                <Button variant="primary" onMouseDown={this.confirmLink}>
                    <Dashicon icon="saved" />
                    Save
                </Button>
            </>
        );
    }

    render() {
        const title = this.editionMode ? 'Edit link' : 'Add link';

        return (
            <>
                <Button
                    variant="tertiary"
                    className={this.editionMode ? 'is-active' : ''}
                    onClick={this.open}
                >
                    <Dashicon icon="admin-links" />
                </Button>
                {this.isValid && this.state.isOpen && (
                    <WpeModal
                        key={this.props.clientId + '-linkWpeModal'}
                        id={this.props.clientId + '-linkWpeModal'}
                        title={title}
                        onClose={this.close}
                    >
                        {this.getContent()}
                        <div className="bouttonGroup">{this.getFooter()}</div>
                    </WpeModal>
                )}
            </>
        );
    }
}
