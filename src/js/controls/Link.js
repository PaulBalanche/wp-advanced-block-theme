// import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { Render } from '../Static/Render';

import {
    Button,
    Dashicon,
    __experimentalInputControl as InputControl,
    TextControl,
    ToggleControl,
} from '@wordpress/components';

import { WpeModal } from '../Components/WpeModal';

export function Link({ id, label, description, value, onChange }) {
    return (
        <LinkControl
            label={label}
            value={value}
            onSubmit={(newValue) => console.log(newValue)}
            onRemove={() => console.log('remove')}
        />
    );
    return Render.panelComponent(
        id,
        label,
        Render.fieldContainer(
            id + '_link',
            <div
                key={id + '-LinkControlComponentsBaseControl'}
                className="components-base-control"
            >
                <div
                    key={id + '-LinkControlComponentsBaseControlField'}
                    className="components-base-control__field"
                >
                    <div
                        key={id + '-LinkControlContainer'}
                        className="link-control-container"
                    >
                        <TextControl
                            key={id + '-text'}
                            label={'Text'}
                            type={'text'}
                            value={value?.text ? value.text : ''}
                            onChange={(newValue) => {
                                newValue = {
                                    text: newValue,
                                };
                                if (value?.url) {
                                    newValue.url = value.url;
                                }
                                if (value?.opensInNewTab) {
                                    newValue.opensInNewTab =
                                        value.opensInNewTab;
                                }
                                onChange(newValue);
                            }}
                        />
                        <LinkControl
                            key={id + '-LinkControl'}
                            className="wp-block-navigation-link__inline-link-input"
                            value={
                                value != null && typeof value == 'object'
                                    ? value
                                    : {}
                            }
                            settings={[
                                {
                                    id: 'url',
                                    title: 'URL ...',
                                },
                                {
                                    id: 'opensInNewTab',
                                    title: 'Open in new tab',
                                },
                            ]}
                            onChange={({
                                url: newURL,
                                opensInNewTab: newOpensInNewTab,
                            }) => {
                                if (typeof newURL == 'string') {
                                    const newValue = {
                                        url: newURL,
                                        opensInNewTab: newOpensInNewTab,
                                    };
                                    if (value?.text) {
                                        newValue.text = value.text;
                                    }
                                    onChange(newValue);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>,
        ),
        false,
        '',
        description,
    );
}

function LinkControl({ id, label, value }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditionMode, setIsEditionMode] = useState(false);
    const [url, setUrl] = useState('http://google.fr');

    const close = _close.bind(this);

    function _close() {
        setIsOpen(false);
    }

    const title = isEditionMode ? 'Edit link' : 'Add link';

    function getFooter() {
        return isEditionMode ? (
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

    return (
        <>
            <Button
                variant="tertiary"
                className={isEditionMode ? 'is-active' : ''}
                onClick={() => setIsOpen(true)}
            >
                <Dashicon icon="admin-links" /> {label}
            </Button>
            {isOpen && (
                <WpeModal
                    key={id + '-linkWpeModal'}
                    id={id + '-linkWpeModal'}
                    title={title}
                    onClose={close}
                >
                    <>
                        <InputControl
                            label="Url"
                            value={url}
                            onChange={(newUrl) => setUrl(newUrl)}
                        />
                        <ToggleControl
                            label="Open in new tab"
                            checked={false}
                            onChange={() => console.log('toogle')}
                        />
                    </>
                    <div className="bouttonGroup">{this.getFooter()}</div>
                </WpeModal>
            )}
        </>
    );
}
