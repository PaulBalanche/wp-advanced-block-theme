import React from "react";

import {
    Button,
    Dashicon,
    CheckboxControl
} from "@wordpress/components";

import __OEditorApp from "./OEditorApp";

import { WpeModal } from "../Models/Modal";

export default class OEditorBlock {
    
    _blockInstance;

    constructor( blockInstance ) {
        this._blockInstance = blockInstance;
    }

    renderTitle() {
        return <>
            <Button
                key={
                    this._blockInstance.props.clientId +
                    "o-editor-back"
                }
                onMouseDown={() => __OEditorApp.getInstance().routeTo('blocks') }
            >
                <Dashicon icon="editor-break" />
            </Button>
            {this._blockInstance.renderTitle?.()}
            <Button
                key="o-editor-welcome_routeTo-settings"
                onMouseDown={() => __OEditorApp.getInstance().routeTo('settings') }
            >
                Settings
            </Button>
        </>
    }

    renderTools() {
        return this._blockInstance.renderTools?.();
    }

    renderFooter() {
        return this._blockInstance.renderFooter?.();
    }

    render() {

        const render = [];
        return render;
    }
    
    getExtraClassName() {

        var className = "block-" + this._blockInstance.props.clientId;

        if( this._blockInstance.isReusable() ) {
            className += " is-reusable";
        }

        return className;
    }
    
}
