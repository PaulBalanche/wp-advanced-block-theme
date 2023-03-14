import React from "react";

import { Component } from "@wordpress/element";

import { compose } from "@wordpress/compose";
import { withDispatch, withSelect } from "@wordpress/data";

import {
    store as blockEditorStore,
} from "@wordpress/block-editor";

import {
    Button
} from "@wordpress/components";

import __OEditorApp from "./OEditorApp";

import globalData from '../global';

export default class OEditorInspector {
    constructor() {}

    renderTitle() {
        return <h2>Inspector</h2>;
    }

    render() {
        return <BlockList />
    }

    getExtraClassName() {
        return "inspector";
    }
}


function renderBlockList( { blockList } ) {

    return <ul>
        { blockList.map((block) => <BlockListItem block={ block } />
        ) }
    </ul>
}

const BlockList = withSelect( ( select, props ) => {

        const blockList = select("core/block-editor").getBlocks();

        blockList.forEach(element => {
            if( element.name == 'core/block' ) {

                // for( var i in globalData.componentInstances ) {
                //     if( globalData.componentInstances[i].props.clientId == component ) {
                //         component = globalData.componentInstances[i];
                //         break;
                //     }
                // }

                console.log(globalData.componentInstances);
            }
        });

        return {
            blockList
        };
    } )( renderBlockList );


function renderBlockListItem( { selectBlock, block } ) {

    return <li>
        <Button
            variant="tertiary"
            onMouseDown={() => {
                selectBlock(block.clientId);
                __OEditorApp.getInstance().open(block.clientId);
            } }
        >
            {block.name}
        </Button>
        { block.innerBlocks.length > 0 &&
            renderBlockList( { blockList: block.innerBlocks } )
        }
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