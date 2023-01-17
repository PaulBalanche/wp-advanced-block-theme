import { Component } from '@wordpress/element';

import {
    ToggleControl,
    __experimentalInputControl as InputControl,
    Button,
    Modal,
    Dashicon
} from '@wordpress/components';

export class LinkControl extends Component {

    constructor() {
        super( ...arguments );

        this.state = {};
        this.isValid = false;
        this.editionMode = false;
        this.close = this._close.bind(this);
        this.confirmLink = this._confirmLink.bind(this);
        this.removeLink = this._removeLink.bind(this);
        // this.removeLink = this._removeLink.bind(this);
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
        const linkData = ( linkKey ) ? contentState.getEntity(linkKey).getData() : null;

        this.setState( {
            isOpen: true,
            url: ( linkData && linkData.url ) ? linkData.url : '',
            openInNewTab: ( linkData && linkData.openInNewTab ) ? true : false
        } );

        this.editionMode = ( linkData && linkData.url ) ? true : false;

        if( ! this.editionMode && selectedText == '' ) {
            this.isValid = false;
            return;
        }
        this.isValid = true;
    }

    open = () => {
        this.initValue();
    }

    _close() {
        this.setState( {
            isOpen: false,
            url: '',
            openInNewTab: false
        } );
    }

    getUrl() {
        return this.state.url;
    }

    setUrl( url ) {
        this.setState( { url: url } );
    }

    isTargetBlank() {
        return this.state.openInNewTab;
    }
    
    toggleTarget() {
        this.setState( { openInNewTab: ! this.isTargetBlank() } );
    }

    _confirmLink() {
        this.props.onSubmit( {
            url: this.getUrl(),
            openInNewTab: this.isTargetBlank()
        } );
        this._close();
    }

    _removeLink() {
        this.props.onRemove();
        this._close();
    }

    getContent() {

        return <>
            <InputControl
                label="Url"
                value={ this.getUrl() }
                onChange={ ( newUrl ) => this.setUrl( newUrl ) }
            />
            <ToggleControl
                label="Open in new tab"
                checked={ this.isTargetBlank() }
                onChange={ () => this.toggleTarget() }
            />
        </>
    }

    getFooter() {

        return ( this.editionMode ) ?
            <>
                <Button variant="primary" onMouseDown={this.confirmLink} ><Dashicon icon="saved" />Save</Button>
                <Button variant="tertiary" onMouseDown={this.removeLink} ><Dashicon icon="trash" />Remove</Button>
            </> :
            <>
                <Button variant="primary" onMouseDown={this.confirmLink} ><Dashicon icon="saved" />Save</Button>
            </>;
    }

    render() {

        const title = ( this.editionMode ) ? 'Edit link' : 'Add link';

        return (
            <>
                <Button variant="tertiary" onClick={this.open}>
                    <Dashicon icon="admin-links" />
                </Button>
                { this.isValid && this.state.isOpen && (
                    <Modal title={ title } onRequestClose={this.close} className="wpe-modal-link">
                        <div className="components-modal__body">{ this.getContent() }</div>
                        <div className="components-modal__footer">
                            { this.getFooter() }
                        </div>
                    </Modal>
                ) }
            </>
        );
    }
}