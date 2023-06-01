import { Button, ButtonGroup } from '@wordpress/components';
import { Component, createPortal } from '@wordpress/element';

import __OEditorApp from './OEditorApp';

import { Render } from '../Static/Render';

export default class ODevices extends Component {
    static _instance;
    static getInstance() {
        return this._instance;
    }

    constructor(props) {
        super(props);

        this.state = {
            currentDevice: null,
        };

        // @ts-ignore
        this.constructor._instance = this;

        this.mediaQueries = {};
        this.defaultMediaQuery = null;
    }

    componentDidMount() {
        if (
            theme_spec?.media?.queries &&
            typeof theme_spec.media.queries == 'object'
        ) {
            this.mediaQueries = this.sortMediaQueries(theme_spec.media.queries);

            if (
                this.getCurrentDevice() == null ||
                (theme_spec?.media?.defaultMedia &&
                    typeof this.mediaQueries[theme_spec.media.defaultMedia] !=
                        'undefined')
            ) {
                this.defaultMediaQuery = theme_spec.media.defaultMedia;
                this.setCurrentDevice(theme_spec.media.defaultMedia);
            }
        }
    }

    sortMediaQueries(mediaQueries) {
        var mediaQueriesSorted = {};

        while (Object.keys(mediaQueries).length > 0) {
            var min = 0;
            var keyMin = null;
            Object.keys(mediaQueries).forEach((layout) => {
                if (keyMin == null || mediaQueries[layout].minWidth < min) {
                    keyMin = layout;
                    min = mediaQueries[layout].minWidth;
                }
            });

            mediaQueriesSorted[keyMin] = mediaQueries[keyMin];
            delete mediaQueries[keyMin];
        }

        return mediaQueriesSorted;
    }

    getCurrentDevice() {
        return this.state.currentDevice;
    }

    getDefaultDevice() {
        return this.defaultMediaQuery;
    }

    setCurrentDevice(newDevice) {
        this.setState({ currentDevice: newDevice });

        var editor_area = document.querySelector('#editor');
        var layout_flow_area = document.querySelector(
            '.is-root-container.is-layout-flow',
        );
        if (editor_area && layout_flow_area) {
            layout_flow_area.style.margin = 'auto';

            if (typeof this.getMediaQueries()[newDevice] != 'undefined') {
                if (
                    this.getMediaQueries()[newDevice]['maxWidth'] != null &&
                    this.getMediaQueries()[newDevice]['maxWidth'] <=
                        editor_area.offsetWidth
                ) {
                    layout_flow_area.style.width =
                        this.getMediaQueries()[newDevice]['maxWidth'] + 'px';
                } else {
                    layout_flow_area.style.removeProperty('width');
                }
            }
        }

        __OEditorApp.getInstance().setCurrentDevice(newDevice);
    }

    getMediaQueries() {
        return this.mediaQueries;
    }

    getButtonGroup() {
        const currentDevice = this.getCurrentDevice();
        const defaultDevice = this.getDefaultDevice();

        if (typeof this.getMediaQueries()[currentDevice] == 'undefined') {
            return null;
        }

        return (
            <div id="devicesButtonGroupContainer">
                <ButtonGroup
                    key="devicesButtonGroup"
                    className="devicesButtonGroup"
                >
                    {Object.keys(this.getMediaQueries()).map((layout) => {
                        const extraClass =
                            defaultDevice == layout ? 'default' : null;
                        return (
                            <Button
                                key={'layoutButton_' + layout}
                                isPressed={currentDevice == layout}
                                className={extraClass}
                                onMouseDown={() => {
                                    this.setCurrentDevice(layout);
                                }}
                            >
                                {Render.getDeviceLabel(layout)}
                            </Button>
                        );
                    })}
                    <Button
                        key={'layoutButton_open'}
                        href={js_const.post_url}
                        className="is-secondary"
                        target="_blank"
                    >
                        View page
                    </Button>
                </ButtonGroup>
            </div>
        );
    }

    render() {
        // return null;
        return createPortal(
            this.getButtonGroup(),
            document.querySelector('.o-editor'),
        );
    }
}
