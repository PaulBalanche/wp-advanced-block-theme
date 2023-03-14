import React from "react";

import {
    ToggleControl
} from "@wordpress/components";

import __OEditorApp from "./OEditorApp";

export default class OEditorSettings {
    constructor() {}

    renderTitle() {
        return <h2>Inspector</h2>;
    }

    renderFooter() {
        return <h1>footer</h1>;
    }

    render() {

        return <>
            <ToggleControl
                label="alertUpdateAttributes"
                checked={ __OEditorApp.getInstance().getUserPreferences('alertUpdateAttributes') }
                onChange={ () => __OEditorApp.getInstance().updateUserPreferences('alertUpdateAttributes') }
            />
            <ToggleControl
                label="alertReusableBlock"
                checked={ __OEditorApp.getInstance().getUserPreferences('alertReusableBlock') }
                onChange={ () => __OEditorApp.getInstance().updateUserPreferences('alertReusableBlock') }
            />
        </>
    }

    getExtraClassName() {
        return "settings";
    }
}
