import React from "react";

import { Component } from "@wordpress/element";

import __OEditorInspector from "./OEditorInspector";
import __OEditorSettings from "./OEditorSettings";
import __OEditorWelcome from "./OEditorWelcome";

export default class OEditorApp extends Component {
    static _instance;
    static getInstance() {
        return this._instance;
    }

    _$editApp;
    _editComponent;

    constructor(props) {
        super(props);

        // @ts-ignore
        this.constructor._instance = this;

        // get the actual edit app dom node
        this._$editApp = document.querySelector(".o-editor");

        window.addEventListener("hashchange", (e) => {
            console.log("CHNGE", e);
        });

        // init shortcuts and mouse events
        this._initShortcuts();
        this._initMouseEvents();
    }

    _initMouseEvents() {}

    _initShortcuts() {
        // listen for escape to close the editor
        document.addEventListener("keyup", (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
                this.close();
            }
        });

        // liten for maintaining the "§" key to hide and show the editor
        document.addEventListener("keydown", (e) => {
            if (e.key === "§") {
                e.preventDefault();
                this.hide();
            }
        });
        document.addEventListener("keyup", (e) => {
            if (e.key === "§") {
                e.preventDefault();
                this.show();
            }
        });
    }

    open(component: any): void {
        document.location.hash = `${component.getId()}`;
        this._editComponent = component;
        this.show();
        this.forceUpdate();
    }

    close() {
        this.hide();
        this._editComponent = null;
        this.forceUpdate();
    }

    show() {
        this._$editApp.classList.remove("hide", "is-updating");
    }

    hide() {
        this._$editApp.classList.add("hide");
    }

    render() {
        let componentToRender = new __OEditorWelcome();
        if (document.location.hash === "#settings") {
            componentToRender = new __OEditorSettings();
        } else if (document.location.hash === "#inspector") {
            componentToRender = new __OEditorInspector();
        } else if (document.location.hash?.match(/^#[a-zA-Z0-9-]+/)) {
            componentToRender = this._editComponent;
        }

        return (
            <section
                key="o-editor-app"
                className={`o-editor-app ${
                    componentToRender?.isReusable?.() ? "is-reusable" : ""
                }`}
            >
                <div className="o-editor-app_header">
                    <div className="title">
                        {componentToRender?.renderTitle?.() ?? <h2>Welcome</h2>}
                    </div>
                    <div className="tools">
                        {componentToRender?.renderTools?.()}
                    </div>
                </div>
                <div className="o-editor-app_body">
                    {componentToRender?.render?.()}
                </div>
                <div className="o-editor-app_footer">
                    {componentToRender?.renderFooter?.()}
                </div>
            </section>
        );
    }
}
