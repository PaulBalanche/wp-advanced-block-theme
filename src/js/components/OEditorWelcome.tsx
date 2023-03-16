import React from "react";

import {
    Button,
    Dashicon
} from "@wordpress/components";

import __OEditorApp from "./OEditorApp";

export default class OEditorWelcome {
    constructor() {}

    renderTitle() {
        return <h2>Editor Blocks Tools</h2>
    }

    render() {
        return <ul>
            <li>
                <Button
                    key="o-editor-welcome_routeTo-Block"
                    variant="tertiary"
                    onMouseDown={() => __OEditorApp.getInstance().routeTo('blocks') }
                >
                    <Dashicon icon="list-view" />Blocks list view
                </Button>
            </li>
            <li class="separator"></li>
            <li>
                <Button
                    key="o-editor-welcome_routeTo-settings"
                    variant="tertiary"
                    onMouseDown={() => __OEditorApp.getInstance().routeTo('settings') }
                >
                    <Dashicon icon="admin-settings" />User preferences
                </Button>
            </li>
        </ul>
    }

    getExtraClassName() {
        return "welcome";
    }
}
