import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { Render } from '../Static/Render';
import { Text } from './Text';

import { Button, ButtonGroup, Dashicon } from '@wordpress/components';

import { WpeModal } from '../Components/WpeModal';

export function Link({ id, label, description, value, props, onChange }) {
    return (
        <div
            key={id + '-WpeLinkControlComponentsBaseControl'}
            className="components-base-control"
        >
            <div
                key={id + '-WpeLinkControlComponentsBaseControlField'}
                className="components-base-control__field"
            >
                {Render.label(id, label, description)}
                <WpeLinkControl
                    key={id + '-WpeLinkControlComponents'}
                    id={id + '-WpeLinkControlComponents'}
                    label={label}
                    value={value}
                    onChange={onChange}
                    extraContent={props}
                />
            </div>
        </div>
    );
}

function WpeLinkControl({ id, label, value, onChange, extraContent }) {
    const [isOpen, setIsOpen] = useState(false);
    const [linkValue, setLinkValue] = useState(
        value != null &&
            typeof value == 'object' &&
            typeof value.link == 'object'
            ? value.link
            : null,
    );
    const close = _close.bind();

    function updateValue(newValue) {
        setLinkValue(newValue);
        onChange(
            {
                ...value,
                ...{
                    link: newValue != null ? newValue : undefined,
                },
            },
            true,
        );
    }

    function _close() {
        setIsOpen(false);
    }
    // const removeLink = _removeLink.bind();
    // function _removeLink() {
    //     setLinkValue(null);
    //     onChange(undefined, true);
    //     setIsOpen(false);
    // }

    function getContent() {
        return (
            <>
                <Text
                    key={id + '-LinkControl-text'}
                    id={id + '-LinkControl-text'}
                    label={Render.innerLabel(id + '-LinkControl-text', 'Title')}
                    type="text"
                    value={
                        linkValue != null &&
                        typeof linkValue == 'object' &&
                        linkValue?.text
                            ? linkValue.text
                            : ''
                    }
                    onChange={(newtext) =>
                        updateValue(
                            linkValue != null && typeof linkValue == 'object'
                                ? {
                                      ...linkValue,
                                      ...{
                                          text: newtext,
                                      },
                                  }
                                : {
                                      text: newtext,
                                  },
                        )
                    }
                />
                <LinkControl
                    key={id + '-LinkControl'}
                    className="wp-block-navigation-link__inline-link-input"
                    value={
                        linkValue != null && typeof linkValue == 'object'
                            ? linkValue
                            : {}
                    }
                    onChange={(nextValue) => {
                        if (typeof nextValue.url == 'string') {
                            updateValue(
                                linkValue != null &&
                                    typeof linkValue == 'object'
                                    ? {
                                          ...linkValue,
                                          ...{
                                              url: nextValue.url,
                                              opensInNewTab:
                                                  nextValue.opensInNewTab,
                                          },
                                      }
                                    : {
                                          url: nextValue.url,
                                          opensInNewTab:
                                              nextValue.opensInNewTab,
                                      },
                            );
                        }
                    }}
                    onRemove={() => updateValue(null)}
                />
            </>
        );
    }

    function getExtra() {
        return extraContent;
    }

    function getFooter() {
        return linkValue != null && typeof linkValue == 'object' ? (
            <>
                <Button variant="primary" onMouseDown={close}>
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
                <Button variant="primary" onMouseDown={close}>
                    <Dashicon icon="saved" />
                    Close
                </Button>
            </>
        );
    }

    return (
        <>
            <ButtonGroup
                key={id + '-LinkControl-ButtonGroup'}
                className="wpe-link-control"
            >
                <Button
                    variant={
                        linkValue != null && typeof linkValue == 'object'
                            ? 'primary'
                            : 'secondary'
                    }
                    onClick={() => setIsOpen(true)}
                >
                    <Dashicon icon="admin-links" />{' '}
                    {linkValue != null && typeof linkValue == 'object'
                        ? `Edit${
                              linkValue?.text
                                  ? ' "' + linkValue.text + '" '
                                  : ' '
                          }link`
                        : 'Add link'}
                </Button>
            </ButtonGroup>
            {isOpen && (
                <WpeModal
                    key={id + '-linkWpeModal'}
                    id={id + '-linkWpeModal'}
                    title={
                        linkValue != null && typeof linkValue == 'object'
                            ? 'Edit link'
                            : 'Add link'
                    }
                    onClose={close}
                    type="wpe-link-control"
                >
                    {Render.tabPanelComponent(
                        id + '-LinkControl-TabPanel',
                        [
                            {
                                name: 'link',
                                title: 'Link',
                                value: 'link',
                            },
                            {
                                name: 'extra',
                                title: 'Extra',
                                value: 'extra',
                            },
                        ],
                        (tabPanel) => {
                            return tabPanel.value == 'link'
                                ? getContent()
                                : getExtra();
                        },
                        null,
                        null,
                        'wpe-link-control-tabpanel',
                    )}
                    {/* <div className="bouttonGroup">{getFooter()}</div> */}
                </WpeModal>
            )}
        </>
    );
}
