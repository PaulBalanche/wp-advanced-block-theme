import React from "react";

import { getBlockType } from "@wordpress/blocks";

import { Component } from "@wordpress/element";

import { compose } from "@wordpress/compose";
import { withDispatch, withSelect } from "@wordpress/data";

import {
    store as blockEditorStore,
} from "@wordpress/block-editor";

import {
    Button,
    Dashicon
} from "@wordpress/components";

import __OEditorApp from "./OEditorApp";

import globalData from '../global';

export default class OEditorInspector {
    constructor() {}

    renderTitle() {
        return <h2>Inspector</h2>;
    }

    renderFooter() {
        return (
            <>
                <div className="o-flex-grow"></div>
                <Button
                    key={"buttonCloseEditZone"}
                    className="abtButtonCloseEditZone"
                    variant="secondary"
                    onMouseDown={() => __OEditorApp.getInstance().goHome() }
                >
                    <Dashicon icon="no-alt" />
                    Close
                </Button>
            </>
        );
    }

    render() {
        return <BlockList />
    }

    getExtraClassName() {
        return "inspector";
    }
}


function renderBlockList( { blockList, isChildren } ) {

    return <ul>
        { isChildren && <div class="separator"></div> }
        { blockList.map((block) => <><BlockListItem block={ block } /><li class="separator"></li></>
        ) }
    </ul>
}

const BlockList = withSelect( ( select, props ) => {

        const blockList = select("core/block-editor").getBlocks();

        // blockList.forEach(element => {
        //     if( element.name == 'core/block' ) {

        //         // for( var i in globalData.componentInstances ) {
        //         //     if( globalData.componentInstances[i].props.clientId == component ) {
        //         //         component = globalData.componentInstances[i];
        //         //         break;
        //         //     }
        //         // }

                
        //     }
        //     // console.log(globalData.componentInstances);
        // });

        return {
            blockList,
            isChildren: false
        };
    } )( renderBlockList );


function renderBlockListItem( { selectBlock, block } ) {

    const anchor = block.attributes?.anchor;

    return <li>
        <Button
            variant="tertiary"
            className="animate"
            onMouseOver={() => {
                selectBlock(block.clientId);
            } }
            onMouseDown={() => {
                __OEditorApp.getInstance().open(block.clientId);
            } }
        >
            <Dashicon icon="arrow-right-alt2" />{ getBlockType(block.name).title }
            { ( typeof anchor != 'undefined' ) && <span className="anchor">#{anchor}</span> }
        </Button>
        { block.innerBlocks.length > 0 && renderBlockList( { blockList: block.innerBlocks, isChildren: true } ) }
    </li>
}

const BlockListItem = withDispatch( ( dispatch ) => {
        const {
            selectBlock
        } = dispatch(blockEditorStore);

        return {
            selectBlock
        };
    } )( renderBlockListItem );