import { Component, createPortal } from "@wordpress/element";
import { Button, ButtonGroup, Dashicon } from "@wordpress/components";

import __OUserPreferences from "./OUserPreferences";

import __OEditorApp from "./OEditorApp";

export default class ODevices extends Component {
    static _instance;
    static getInstance() {
        return this._instance;
    }

    constructor(props) {
        super(props);

        this.state = {
            currentDevice: null
        };

        // @ts-ignore
        this.constructor._instance = this;


        this.componentInstance = {};
        this.mediaQueries = {};
        this.defaultMediaQuery = null;
    }

    componentDidMount() {

        const devicesButtonGroupContainer = document.createElement("div");
            devicesButtonGroupContainer.setAttribute(
                "id",
                "devicesButtonGroupContainer"
            );
            // document
            //     .querySelector(".edit-post-header__toolbar")
            //     .appendChild(devicesButtonGroupContainer);
            document
                .querySelector(".o-editor-container")
                .appendChild(devicesButtonGroupContainer);

        if (
            theme_spec?.media?.queries &&
            typeof theme_spec.media.queries == "object"
        ) {
            this.mediaQueries = this.sortMediaQueries(theme_spec.media.queries);

            if (
                this.getCurrentDevice() == null ||
                (theme_spec?.media?.defaultMedia &&
                    typeof this.mediaQueries[theme_spec.media.defaultMedia] !=
                        "undefined")
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

    setCurrentDevice(newDevice) {

        this.setState( { currentDevice: newDevice } );

        var editor_area = document.querySelector("#editor");
        var layout_flow_area = document.querySelector(
            ".is-root-container.is-layout-flow"
        );
        if (editor_area && layout_flow_area) {
            layout_flow_area.style.margin = "auto";

            if (typeof this.getMediaQueries()[newDevice] != "undefined") {
                if (
                    this.getMediaQueries()[newDevice]["maxWidth"] != null &&
                    this.getMediaQueries()[newDevice]["maxWidth"] <=
                        editor_area.offsetWidth
                ) {
                    layout_flow_area.style.width =
                        this.getMediaQueries()[newDevice]["maxWidth"] + "px";
                } else {
                    layout_flow_area.style.removeProperty("width");
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

        if( typeof this.getMediaQueries()[currentDevice] == 'undefined' ) {
            return null;
        }
        const minText =
            this.getMediaQueries()[currentDevice]["minWidth"] != null &&
            this.getMediaQueries()[currentDevice]["minWidth"] > 0 ? (
                <>
                    {this.getMediaQueries()[currentDevice]["minWidth"] +
                        "px"}
                    <Dashicon icon="arrow-left-alt2" />
                </>
            ) : null;
        const maxText =
            this.getMediaQueries()[currentDevice]["maxWidth"] != null ? (
                <>
                    <Dashicon icon="arrow-left-alt2" />
                    {this.getMediaQueries()[currentDevice]["maxWidth"] +
                        "px"}
                </>
            ) : null;

        return (
            <>
                <div className="devicesInfo">
                    {minText}
                    {currentDevice.charAt(0).toUpperCase() +
                        currentDevice.slice(1)}
                    {maxText}
                </div>
                <ButtonGroup
                    key="devicesButtonGroup"
                    className="devicesButtonGroup"
                >
                    {Object.keys(this.getMediaQueries()).map((layout) => {
                        return (
                            <Button
                                key={"layoutButton_" + layout}
                                isPressed={currentDevice == layout}
                                onMouseDown={() => {
                                    this.setCurrentDevice(layout);
                                }}
                            >
                                {layout.charAt(0).toUpperCase() +
                                    layout.slice(1)}
                            </Button>
                        );
                    })}
                </ButtonGroup>
            </>
        );
    }

    render() {
        // return null;
        return createPortal(
            this.getButtonGroup(),
            document.querySelector(".o-editor-container")
        );
    }
}
