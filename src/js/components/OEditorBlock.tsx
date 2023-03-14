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

        // render.push( this.alertUpdateAttributesMessage() );

        return render;
    }
    
    getExtraClassName() {

        var className = "block-" + this._blockInstance.props.clientId;

        if( this._blockInstance.isReusable() ) {
            className += " is-reusable";
        }

        return className;
    }

    alertUpdateAttributesMessage() {
        return this.state.alertUpdateAttributesMessage != null &&
            !this.state.alertUpdateAttributesMessage ? (
            <WpeModal
                key={
                    this.props.clientId +
                    "-alertUpdateAttributesMessageWpeModal"
                }
                id={
                    this.props.clientId +
                    "-alertUpdateAttributesMessageWpeModal"
                }
                title={"Updating preview..."}
                onClose={() =>
                    this.setState({ alertUpdateAttributesMessage: true })
                }
                hasFooter={false}
                type="info"
            >
                <p>
                    This preview update does not save the post.
                    <br />
                    <b>Don't forget to save your changes!</b>
                </p>
                <div className="bouttonGroup">
                    <Button
                        key={
                            this.props.clientId +
                            "alertUpdateAttributesMessageButton"
                        }
                        variant="primary"
                        onMouseDown={() => {
                            this.setState({
                                alertUpdateAttributesMessage: true,
                            });
                        }}
                    >
                        <Dashicon icon="yes" />
                        All right!
                    </Button>
                </div>
            </WpeModal>
        ) : null;
    }

    alertReusableBlockMessage() {
        let display = true;

        display = display && this.getReusableBlock() != null ? true : false;
        display =
            display && this.state.alertReusableBlockMessage != null
                ? true
                : false;
        display =
            display && !this.state.alertReusableBlockMessage ? true : false;
        display =
            display &&
            !this.getUserPreferencePersistent("hideAlertReusableBlockMessage")
                ? true
                : false;

        return display ? (
            <WpeModal
                key={this.props.clientId + "-alertReusableBlockMessageWpeModal"}
                id={this.props.clientId + "-alertReusableBlockMessageWpeModal"}
                title={"Reusable block"}
                onClose={() =>
                    this.setState({ alertUpdateAttributesMessage: true })
                }
                hasFooter={false}
                type="warning"
            >
                <p>
                    This block is part of a <b>reusable block</b> composition.
                    <br />
                    Updating this block will{" "}
                    <b>apply the changes everywhere it is used.</b>
                </p>
                <div className="bouttonGroup">
                    <div className="row">
                        <Button
                            key={
                                this.props.clientId +
                                "alertReusableBlockMessageButton"
                            }
                            variant="primary"
                            onMouseDown={() => {
                                this.setState({
                                    alertReusableBlockMessage: true,
                                });
                                this.updateUserPreferencePersistent();
                            }}
                        >
                            <Dashicon icon="yes" />
                            All right!
                        </Button>
                    </div>
                    <div className="row">
                        <CheckboxControl
                            label="Do not show this message again"
                            checked={this.getUserUserPreference(
                                "hideAlertReusableBlockMessage"
                            )}
                            onChange={() =>
                                this.toogleUserUserPreference(
                                    "hideAlertReusableBlockMessage"
                                )
                            }
                        />
                    </div>
                </div>
            </WpeModal>
        ) : null;
    }

    
}
