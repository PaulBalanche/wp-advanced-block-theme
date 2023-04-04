import { Fragment } from "@wordpress/element";
import { getBlockType } from "@wordpress/blocks";
import { Button, Dashicon } from "@wordpress/components";

import __OEditorApp from "./OEditorApp";

export default class OEditorInspector {
    constructor(blocksList, selectBlock) {
        this.blocksList = blocksList;
        this.selectBlock = selectBlock;
    }

    renderTitle() {
        return <h2>Inspector</h2>;
    }

    renderTools() {
        return (
            <Button
                key={"o-editor-zone-button-help"}
                variant="primary"
                onMouseDown={() => __OEditorApp.getInstance().routeTo("help")}
            >
                <Dashicon icon="editor-help" />
            </Button>
        );
    }

    render() {
        return (
            <BlockList
                blocksList={this.blocksList}
                selectBlock={this.selectBlock}
            />
        );
    }

    getExtraClassName() {
        return "inspector";
    }
}

const BlockList = (props) => {
    return (
        <ul>
            {typeof props.isChildren != "undefined" && props.isChildren && (
                <div className="separator"></div>
            )}
            {props.blocksList.map((block) => (
                <Fragment key={"o-inspector-blockContainer-" + block.clientId }>
                    <BlockListItem
                        block={block}
                        selectBlock={props.selectBlock}
                    />
                    <li className="separator"></li>
                </Fragment>
            ))}
        </ul>
    );
};

const BlockListItem = ({ block, selectBlock }) => {
    const anchor = block.attributes?.anchor;
    const displayAnchor =
        typeof anchor != "undefined" &&
        anchor.match(/^[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+$/) ==
            null;
    const domBlock = document.querySelector("#block-" + block.clientId);
    
    const parentDomBlocks = [];
    var closestParent = domBlock;
    while( true ) {
        closestParent = closestParent.parentNode;
        if( closestParent.classList.contains('is-root-container') ) {
            break;
        }
        if( closestParent.classList.contains('block-editor-block-list__block') ) {
            parentDomBlocks.push(closestParent);
        }
    }

    const blockName = ( block.name == "core/block" && typeof block.postName != 'undefined' ) ? block.postName + " (" + getBlockType(block.name).title + ")" : getBlockType(block.name).title;

    return (
        <li key={"o-inspector-block-" + block.clientId}>
            <Button
                variant="tertiary"
                className="animate"
                onMouseOver={() => {
                    domBlock?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                    domBlock?.classList.add("is-pre-selected");
                    for(var i in parentDomBlocks) {
                        parentDomBlocks[i].classList.add("has-child-pre-selected");
                    }
                }}
                onMouseOut={() => {
                    domBlock?.classList.remove("is-pre-selected");
                    for(var i in parentDomBlocks) {
                        parentDomBlocks[i].classList.remove("has-child-pre-selected");
                    }
                }}
                onMouseDown={() => {
                    selectBlock(block.clientId);
                }}
            >
                <Dashicon icon="arrow-right-alt2" />
                {blockName}
                {displayAnchor && <span className="anchor">#{anchor}</span>}
            </Button>
            {/* {block.innerBlocks.length > 0 && (
                <BlockList
                    blocksList={block.innerBlocks}
                    selectBlock={selectBlock}
                    isChildren={true}
                />
            )} */}
            {/* { typeof block.children != 'undefined' && (
                <BlockList
                    blocksList={block.children}
                    selectBlock={selectBlock}
                    isChildren={true}
                />
            )} */}
        </li>
    );
};
