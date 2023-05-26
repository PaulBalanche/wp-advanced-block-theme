import { Component } from '@wordpress/element';

import { Button, Dashicon } from '@wordpress/components';

import __OUserPreferences from './OUserPreferences';

import { WpeModal } from './Modal';

export default class OModal extends Component {
    static _instance;
    static getInstance() {
        return this._instance;
    }

    constructor(props) {
        super(props);

        this.state = {
            alertReusableBlock: null,
        };

        // @ts-ignore
        this.constructor._instance = this;
    }

    render() {
        const render = [];

        render.push(this.alertReusableBlock());

        return render;
    }

    showModal(modal, once = false) {
        if (once && this.state[modal] != null) {
            return;
        }

        if (
            __OUserPreferences.getInstance().getUserPreferences(modal) !=
                null &&
            !__OUserPreferences.getInstance().getUserPreferences(modal)
        ) {
            return;
        }

        this.setState({ [modal]: true });
    }

    displayModal(modal) {
        return this.state[modal];
    }

    hideModal(modal) {
        this.setState({ [modal]: false });
    }

    alertReusableBlock() {
        return this.displayModal('alertReusableBlock') ? (
            <WpeModal
                key="OModal-alertReusableBlock"
                id="alertReusableBlockMessageWpeModal"
                title="Reusable block"
                onClose={() => this.hideModal('alertReusableBlock')}
                type="warning"
            >
                <p>
                    This block is part of a <b>reusable block</b> composition.
                    <br />
                    Updating this block will{' '}
                    <b>apply the changes everywhere it is used.</b>
                </p>
                <div className="bouttonGroup">
                    <div className="row">
                        <Button
                            key={'alertReusableBlockMessageButton'}
                            variant="primary"
                            onMouseDown={() =>
                                this.hideModal('alertReusableBlock')
                            }
                        >
                            <Dashicon icon="yes" />
                            All right!
                        </Button>
                    </div>
                    <div className="row">
                        <__OUserPreferences
                            preference="alertReusableBlock"
                            context="checkbox"
                            label="Do not show this message again"
                        ></__OUserPreferences>
                    </div>
                </div>
            </WpeModal>
        ) : null;
    }
}
