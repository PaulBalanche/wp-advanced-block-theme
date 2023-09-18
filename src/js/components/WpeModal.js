import { Modal } from '@wordpress/components';
import { useState } from '@wordpress/element';

export const WpeModal = (props) => {
    const [isOpen, setOpen] = useState(true);
    const openModal = () => setOpen(true);
    const closeModal = () => {
        setOpen(false);
        props.onClose();
    };

    const classNameModal = ['wpe-modal', 'o-editor'];

    if (typeof props.type != 'undefined') {
        classNameModal.push('modal-' + props.type);
    }

    return (
        <>
            {isOpen && (
                <Modal
                    key={props.id + '-modal'}
                    title={props.title}
                    onRequestClose={closeModal}
                    className={classNameModal.join(' ')}
                    shouldCloseOnEsc={true}
                    shouldCloseOnClickOutside={true}
                >
                    <div className="components-modal__body">
                        {props.children}
                    </div>
                </Modal>
            )}
        </>
    );
};
