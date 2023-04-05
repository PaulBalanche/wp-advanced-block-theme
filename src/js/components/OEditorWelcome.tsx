import React from "react";

import { Button, Dashicon } from "@wordpress/components";

import __OEditorApp from "./OEditorApp";

export default class OEditorWelcome {
    constructor() {}

    renderTitle() {
        return <h2>Help</h2>;
    }

    render() {
        return (
            <ul>
                <li>
                    <Button
                        key="o-editor-help-settings"
                        variant="tertiary"
                        onMouseDown={() =>
                            __OEditorApp.getInstance().routeTo("settings")
                        }
                    >
                        <Dashicon icon="admin-settings" />
                        User preferences
                    </Button>
                </li>
            </ul>
        );
    }

    renderFooter() {
        return (
            <>
                <div className="o-flex-grow"></div>
                <Button
                    key={"buttonCloseEditZone"}
                    className="abtButtonCloseEditZone"
                    variant="secondary"
                    onMouseDown={() => __OEditorApp.getInstance().clean()}
                >
                    <Dashicon icon="no-alt" />
                    Close
                </Button>
            </>
        );
    }

    getExtraClassName() {
        return "help";
    }
}
