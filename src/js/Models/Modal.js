import { Button, Modal, Dashicon } from '@wordpress/components';
import { Component } from '@wordpress/element';

export class WpeModal extends Component {

    constructor() {
        super( ...arguments );

        this.state = {
            showModal: true
        };

        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleCloseModal() {
        
        this.setState( { showModal: false } );
        this.props.onClose();
    }

    render() {

        const classNameModal = [ 'wpe-modal' ];

        if( typeof this.props.type != 'undefined' ) {
            classNameModal.push( 'modal-' + this.props.type);
        }

        const hasFooter = ( typeof this.props.hasFooter == 'undefined' || this.props.hasFooter );

        return ( this.state.showModal &&
                <Modal
                    key={ this.props.id + "-modal" }
                    title={ this.props.title }
                    onRequestClose={null}
                    isDismissible={false}
                    className={ classNameModal.join(' ') }
                    __experimentalHideHeader={true}
                    shouldCloseOnEsc={true}
		            shouldCloseOnClickOutside={true}
                >
                    <div className="components-modal__body">
                        <div className='title'>
                            { typeof this.props.icon != 'undefined' && (
                                <Dashicon icon={ this.props.icon } />
                            ) }
                            <h1>{ this.props.title }</h1>
                        </div>
                        <div className="children">{ this.props.children }</div>
                    </div>
                    { hasFooter && (
                        <div className="components-modal__footer">
                            <Button
                                className="alignRight"
                                variant="secondary"
                                isSmall
                                onMouseDown={this.handleCloseModal}
                            >Close</Button>
                        </div>

                    ) }
                </Modal>
            )
    }
}