import React from "react";

import { Component } from "@wordpress/element";


import {
    Button,
    Dashicon
} from "@wordpress/components";

import __OEditorInspector from "./OEditorInspector";
import __OEditorSettings from "./OEditorSettings";
import __OEditorWelcome from "./OEditorWelcome";
import __OEditorBlock from "./OEditorBlock";

import globalData from '../global';

import OModal from './OModal';
import OUserPreferences from './OUserPreferences';

export default class OEditorApp extends Component {
    static _instance;
    static getInstance() {
        return this._instance;
    }

    static exists() {
        return ( typeof this._instance != 'undefined' );
    }

    _$editApp;
    _$editAppContainer;

    constructor(props) {
        super(props);

        this.state = {
            route: null
        };

        // @ts-ignore
        this.constructor._instance = this;

        // get the actual edit app dom node
        this._$editApp = document.querySelector(".o-editor");
        this._$editAppContainer = document.querySelector(".o-editor-container");
    }

    componentDidMount() {

        // init shortcuts and mouse events
        this._initShortcuts();
        this._initMouseEvents();

        // Route the Editor App related to anchor
        this._routing();

        this._hideEditorLoadingZone();
        this._showEditorApp();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        
        for( var i in globalData.componentInstances ) {
            globalData.componentInstances[i].forceUpdate();
        }
    }

    _initMouseEvents() {}

    _initShortcuts() {
        // listen for escape to close the editor
        // document.addEventListener("keyup", (e) => {
        //     if (e.key === "Escape") {
        //         e.preventDefault();
        //         this.close();
        //     }
        // });

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

    _hideEditorLoadingZone() {

        document.querySelector(".o-editor-loading-zone").classList.add("hide");
        setTimeout(() => {
            document.querySelector(".o-editor-loading-zone").classList.add("close");
        }, 1000);
    }

    _showEditorApp() {
        setTimeout(() => {
            this._$editAppContainer.classList.add("show");
        }, 1200);
    }

    _routing() {

        if (document.location.hash === "#settings") {
            this.setState({ route: 'settings' });
        } else if (document.location.hash === "#help") {
            this.setState({ route: 'help' });
        } else {

            const anchorDetection = document.location.hash?.match(/^#([a-zA-Z0-9-]+)/);
            if( anchorDetection != null ) {

                const clientIdRequested = anchorDetection[1];

                for( var i in globalData.componentInstances ) {

                    if( globalData.componentInstances[i].getId() == clientIdRequested ) {
                        this.forceSelectComponent( globalData.componentInstances[i] );
                        break;
                    }
                }
            }
        }
    }

    routeTo( route ) {
        this.clean();
        this.setState({ route: route });
        document.location.hash = route;
    }

    goInspector() {
        this.clean();
        this.setState({ route: null });
    }

    isBlockEdited( clientId ) {

        if( this.state.route != null ) {
            return false;
        }

        if( this.props.context.selectedBlockClientId == undefined ) {
            return false;
        }
        
        if( this.props.context.selectedBlockClientId != clientId ) {
            return false;
        }

        return true;
    }

    forceSelectComponent(component: any): void {

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

        this.props.context.selectBlock(component.props.clientId);
    }

    refreshScroll() {
        if( this.props.context.selectedBlockClientId != undefined ) {
            document.querySelector('#block-' + this.props.context.selectedBlockClientId)?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }

    clean() {
        if( this.props.context.selectedBlockClientId != undefined ) {
            this.props.context.resetSelection(this.props.context.selectedBlockClientId, this.props.context.selectedBlockClientId, -1);
        }
    }

    // close() {
    //     this.hide();
    //     this.clean();
    // }

    show() {
        this._$editApp.classList.remove("hide", "is-updating");
    }

    hide() {
        this._$editApp.classList.add("hide");
    }

    renderBreadcrumb() {

        return ( this.state.route != null || ( this.props.context.selectedBlockClientId != undefined && typeof globalData.componentInstances[this.props.context.selectedBlockClientId] != 'undefined' ) ) ?
            <div className="breadcrumb">
                <Button
                    key={"breadcrumb-home"}
                    variant="link"
                    onMouseDown={() => this.goInspector() }
                >
                    <Dashicon icon="arrow-left-alt2" />Back
                </Button>
            </div>
        : null;
    }

    render() {

        switch( this.state.route ) {

            case 'settings':
                var componentToRender = new __OEditorSettings();
                break;
            case 'help':
                var componentToRender = new __OEditorWelcome();
                break;
            default:
                var componentToRender = ( this.props.context.selectedBlockClientId != undefined && typeof globalData.componentInstances[this.props.context.selectedBlockClientId] != 'undefined' ) ? new __OEditorBlock( globalData.componentInstances[this.props.context.selectedBlockClientId] ) : new __OEditorInspector( this.props.context.blocksList, this.props.context.selectBlock );
        }

        return <>
            <section
                key="o-editor-app"
                className={`o-editor-app ${
                    componentToRender?.getExtraClassName?.()
                }`}
            >
                { componentToRender?.renderTitle && (
                    <div className="o-editor-app_header">
                        <div className="title">
                            { this.renderBreadcrumb() }
                            {componentToRender.renderTitle()}
                        </div>
                        { componentToRender?.renderTools && (
                            <div className="tools">
                                {componentToRender.renderTools()}
                            </div>
                        ) }
                    </div>
                ) }
                <div className="o-editor-app_body">
                    {componentToRender?.render?.()}
                </div>
                { componentToRender?.renderFooter && (
                        <div className="o-editor-app_footer">
                        {componentToRender?.renderFooter?.()}
                    </div>
                ) }
            </section>
            <OUserPreferences />
            <OModal />
        </>
    }
}
