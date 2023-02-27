import { Button, Modal } from '@wordpress/components';
import { Component } from '@wordpress/element';

export class WpeModal extends Component {

    constructor() {
        super( ...arguments );
    }

    render() {

        return (
            <Modal
                key={ this.props.id }
                title={ this.props.title }
                onRequestClose={ () => this.props.onClose() }
                className="wpe-modal"
            >
                <div className="components-modal__body">{ this.props.children }</div>
                <div className="components-modal__footer">
                    <Button
                        className="alignRight"
                        variant="secondary"
                        onMouseDown={ () => this.props.onClose() }
                    >Cancel</Button>
                </div>
            </Modal>
        )
    }
}