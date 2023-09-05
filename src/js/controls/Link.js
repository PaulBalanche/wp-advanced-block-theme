import { TextControl } from '@wordpress/components';

import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { Render } from '../Static/Render';

export function Link({ id, label, description, value, onChange }) {
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
