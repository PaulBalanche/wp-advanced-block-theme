import React from "react";

import { getBlockType } from "@wordpress/blocks";

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

export default class OEditorInspector {
    constructor( blocksList, selectBlock ) {
        this.blocksList = blocksList;
        this.selectBlock = selectBlock;
    }

    renderTitle() {
        return <h2>Editor Blocks List</h2>;
    }

    renderTools() {
        
        return <Button
            key={"o-editor-zone-button-help"}
            variant="primary"
            onMouseDown={() => __OEditorApp.getInstance().routeTo('help') }
        >
            <Dashicon icon="editor-help" />
        </Button>
    }

    render() {
        return <BlockList blocksList={this.blocksList} selectBlock={this.selectBlock} />
    }

    getExtraClassName() {
        return "inspector";
    }
}

const BlockList = ( props ) => {

    return <ul>
        { typeof props.isChildren != 'undefined' && props.isChildren && <div className="separator"></div> }
        { props.blocksList.map((block) => <><BlockListItem block={ block } selectBlock={props.selectBlock} /><li className="separator"></li></>
        ) }
    </ul>
}

const BlockListItem = ( { block, selectBlock } ) => {

    const anchor = block.attributes?.anchor;
    const displayAnchor = ( typeof anchor != 'undefined' && anchor.match(/^[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+$/) == null);
    const domBlock = document.querySelector('#block-' + block.clientId);

    return <li
        key={"o-inspector-block-" + block.clientId}
    >
        <Button
            variant="tertiary"
            className="animate"
            onMouseOver={() => {
                domBlock?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                domBlock?.classList.add('is-pre-selected');
            } }
            onMouseOut={() => {
                domBlock?.classList.remove('is-pre-selected');
            } }
            onMouseDown={() => {
                selectBlock(block.clientId);
            } }
        >
            <Dashicon icon="arrow-right-alt2" />{ getBlockType(block.name).title }
            { displayAnchor && <span className="anchor">#{anchor}</span> }
        </Button>
        { block.innerBlocks.length > 0 && <BlockList blocksList={block.innerBlocks} selectBlock={selectBlock} isChildren={true} /> }
    </li>
}