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
                label="alertReusableBlockMessage"
                checked={ __OEditorApp.getInstance().getUserPreferences('alertReusableBlockMessage') }
                onChange={ () => __OEditorApp.getInstance().updateUserPreferences('alertReusableBlockMessage') }
            />
            <ToggleControl
                label="alertUpdateAttributesMessage"
                checked={ __OEditorApp.getInstance().getUserPreferences('alertUpdateAttributesMessage') }
                onChange={ () => __OEditorApp.getInstance().updateUserPreferences('alertUpdateAttributesMessage') }
            />
        </>
    }

    getExtraClassName() {
        return "settings";
    }
}
