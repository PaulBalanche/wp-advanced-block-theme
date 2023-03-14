import React from "react";

import { Component } from "@wordpress/element";

import __OEditorInspector from "./OEditorInspector";
import __OEditorSettings from "./OEditorSettings";
import __OEditorWelcome from "./OEditorWelcome";
import __OEditorBlock from "./OEditorBlock";

import globalData from '../global';

export default class OEditorApp extends Component {
    static _instance;
    static getInstance() {
        return this._instance;
    }

    static exists() {
        return ( typeof this._instance != 'undefined' );
    }

    _$editApp;

    constructor(props) {
        super(props);

        this.state = {
            componentInstance: null,
            route: null,
            userPreferences: {
                alertUpdateAttributesMessage: true,
                alertReusableBlockMessage: true
            }
        };

        // @ts-ignore
        this.constructor._instance = this;

        // get the actual edit app dom node
        this._$editApp = document.querySelector(".o-editor");

        
    }

    componentDidMount() {

        // init shortcuts and mouse events
        this._initShortcuts();
        this._initMouseEvents();

        // Route the Editor App related to anchor
        this._routing();

        this._initUserPreference();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        
        if( prevState.componentInstance != null ) {
            prevState.componentInstance.forceUpdate();
        }

        if( this.state.componentInstance != null ) {
            this.state.componentInstance.forceUpdate();
        }
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

    _routing() {

        if (document.location.hash === "#settings") {
            this.setState({ route: 'settings' });
        } else if (document.location.hash === "#inspector") {
            this.setState({ route: 'settings' });
        } else {

            const anchorDetection = document.location.hash?.match(/^#([a-zA-Z0-9-]+)/);
            if( anchorDetection != null ) {

                const clientIdRequested = anchorDetection[1];

                for( var i in globalData.componentInstances ) {

                    if( globalData.componentInstances[i].getId() == clientIdRequested ) {
                        this.open( globalData.componentInstances[i] );
                        break;
                    }
                }
            }
        }
    }

    _initUserPreference() {
        const storage = localStorage.getItem(
            "ABT_PREFERENCES_USER_" + js_const.user_id
        );
        if (storage) {
            let jsonStorage = JSON.parse(storage);
            if (typeof jsonStorage == "object") {

                const userPreferencesToInit = this.state.userPreferences;
                for( var i in userPreferencesToInit ) {
                    if( typeof jsonStorage[i] != 'undefined' ) {
                        userPreferencesToInit[i] = jsonStorage[i];
                    }
                }
                
                this.setState({ userPreferences: userPreferencesToInit });
            }
        }
    }

    getUserPreferences( preference ) {

        return this.state.userPreferences[preference];
    }

    updateUserPreferences( preference, value = null ) {

        const userPreferencesToUpdate = this.state.userPreferences;
        userPreferencesToUpdate[preference] = ( value != null ) ? value : ! userPreferencesToUpdate[preference];
        this.setState({ userPreferences: userPreferencesToUpdate });

        localStorage.setItem(
            "ABT_PREFERENCES_USER_" + js_const.user_id,
            JSON.stringify(userPreferencesToUpdate)
        );
    };

    routeTo( route ) {
        this.clean();
        this.setState({ route: route });
        document.location.hash = route;
    }

    isBlockEdited( blockId ) {

        if( this.state.route != 'blocks' ) {
            return false;
        }

        if( this.state.componentInstance == null ) {
            return false;
        }
        
        if( this.state.componentInstance.getId() != blockId ) {
            return false;
        }

        return true;
    }

    open(component: any): void {

        // If clientId given, get the block instance related
        if ( typeof component == 'string' ) {
            for( var i in globalData.componentInstances ) {
                if( globalData.componentInstances[i].props.clientId == component ) {
                    component = globalData.componentInstances[i];
                    break;
                }
            }
        }

        if( typeof component == 'string' ) {
            return;
        }

        this.clean();
        this.setState({
            componentInstance: component,
            route: 'blocks'
        });

        document.location.hash = `${component.getId()}`;
        
        this.show();
    }

    clean() {
        if( this.state.componentInstance != null ) {
            this.setState({ componentInstance: null });
        }
    }

    close() {
        this.hide();
        this.clean();
    }

    show() {
        this._$editApp.classList.remove("hide", "is-updating");
    }

    hide() {
        this._$editApp.classList.add("hide");
    }

    render() {

        let componentToRender = new __OEditorWelcome();
        switch( this.state.route ) {
            case 'settings':
                componentToRender = new __OEditorSettings();
                break;
            case 'blocks':
                componentToRender = ( this.state.componentInstance != null ) ? new __OEditorBlock( this.state.componentInstance ) : new __OEditorInspector();
                break;
        }

        return <section
            key="o-editor-app"
            className={`o-editor-app ${
                componentToRender?.getExtraClassName?.()
            }`}
        >
            <div className="o-editor-app_header">
                <div className="title">
                    {componentToRender?.renderTitle?.() ?? <h2>Welcome</h2>}
                </div>
                { componentToRender?.renderTools && (
                    <div className="tools">
                        {componentToRender.renderTools()}
                    </div>
                ) }
            </div>
            <div className="o-editor-app_body">
                {componentToRender?.render?.()}
            </div>
            { componentToRender?.renderFooter && (
                    <div className="o-editor-app_footer">
                    {componentToRender?.renderFooter?.()}
                </div>
            ) }
        </section>
    }
}
