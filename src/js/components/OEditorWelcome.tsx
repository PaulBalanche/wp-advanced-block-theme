import React from "react";

import {
    Button
} from "@wordpress/components";

import __OEditorApp from "./OEditorApp";

export default class OEditorWelcome {
    constructor() {}

    renderTitle() {
        return <>
            <h2>Inspector</h2>
            <Button
                key="o-editor-welcome_routeTo-settings"
                onMouseDown={() => __OEditorApp.getInstance().routeTo('settings') }
            >
                Settings
            </Button>
        </>
    }

    renderFooter() {
        return <h1>footer</h1>;
    }

    render() {
        return <h1>Welcome</h1>;
    }

    getExtraClassName() {
        return "welcome";
    }
}
