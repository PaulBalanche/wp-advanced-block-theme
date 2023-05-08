/**
 * WordPress dependencies
 */
import {
    __experimentalBlockVariationPicker,
    store as blockEditorStore,
    useBlockProps,
    useInnerBlocksProps,
} from "@wordpress/block-editor";
import { createBlock } from "@wordpress/blocks";
import { compose } from "@wordpress/compose";
import { WpeComponentBase } from "../../../Components/WpeComponentBase";

import { Dashicon, MenuItem } from "@wordpress/components";

import { plus } from "@wordpress/icons";

import { dispatch, withDispatch, withSelect } from "@wordpress/data";
import { get, map } from "lodash";

import __ODevices from "../../../Components/ODevices";

/**
 * Add some columns in wpe-container based on variation selected
 *
 */
function createBlocksFromInnerBlocksTemplate(innerBlocksTemplate) {
    return map(innerBlocksTemplate, ({ name, attributes }) =>
        createBlock(name, attributes)
    );
}

/**
 * registerBlockType edit function
 */
class WpeGrid extends WpeComponentBase {
    constructor() {
        super(...arguments);
    }

    addColumn() {
        // Define rowStart fo the new colums added
        let initLayout = {};
        Object.keys(__ODevices.getInstance().getMediaQueries()).forEach(
            (layout) => {
                initLayout[layout] = {
                    columnStart: 1,
                    width: 1,
                    rowStart: 2,
                    height: 1,
                };
                this.props.inner_blocks.forEach((element) => {
                    if (
                        element.attributes.layout &&
                        element.attributes.layout[layout]
                    ) {
                        let currentRowStart =
                            element.attributes.layout[layout].rowStart &&
                            element.attributes.layout[layout].rowStart
                                ? element.attributes.layout[layout].rowStart
                                : 1;
                        let currentHeight =
                            element.attributes.layout[layout].height &&
                            element.attributes.layout[layout].height
                                ? element.attributes.layout[layout].height
                                : 1;
                        let currentRowEnd = currentRowStart + currentHeight;
                        if (currentRowEnd > initLayout[layout].rowStart) {
                            initLayout[layout].rowStart = currentRowEnd;
                        }
                    }
                });
            }
        );

        let inner_blocks_new = [
            ...this.props.inner_blocks,
            createBlock("custom/wpe-column", {
                layout: initLayout,
            }),
        ];

        this.props.replaceInnerBlocks(
            this.props.clientId,
            inner_blocks_new,
            false
        );
    }

    renderSpecificTools() {
        return (
            <MenuItem
                key={
                    this.props.clientId +
                    "-toolsDropdownMenu-SpecificTools-addColumn"
                }
                icon={plus}
                onClick={() => this.addColumn()}
            >
                Add column
            </MenuItem>
        );
    }

    liveRendering() {
        var {
            clientId,
            inner_blocks,
            countColumns,
            blockVariations,
            blockType,
            // isSelectedBlock,
            // isParentOfSelectedBlock,
            replaceInnerBlocks,
        } = this.props;

        const { children, ...innerBlocksProps } = this.props.innerBlocksProps;
        innerBlocksProps.key = "innerBlocksProps_" + clientId;
        /**
         * Define innerBlocks
         */
        if (
            false &&
            (typeof inner_blocks != "object" ||
                (typeof inner_blocks == "object" && countColumns == 0))
        ) {
            return (
                <>
                    <div {...innerBlocksProps}>
                        <__experimentalBlockVariationPicker
                            key={
                                "__experimentalBlockVariationPicker_" + clientId
                            }
                            icon={get(blockType, ["icon", "src"])}
                            label={get(blockType, ["title"])}
                            variations={blockVariations}
                            onSelect={(nextVariation) => {
                                if (nextVariation.innerBlocks) {
                                    replaceInnerBlocks(
                                        clientId,
                                        createBlocksFromInnerBlocksTemplate(
                                            nextVariation.innerBlocks
                                        ),
                                        false
                                    );
                                }
                                if (nextVariation.attributes) {
                                    dispatch(
                                        "core/block-editor"
                                    ).updateBlockAttributes(
                                        clientId,
                                        nextVariation.attributes
                                    );
                                }
                            }}
                        />
                    </div>
                </>
            );
        } else {
            return (
                <div {...innerBlocksProps}>
                    {this.renderEditFormZone()}
                    <div className="o-grid-container">{children}</div>
                    <div
                        className="o-grid-add-column"
                        onClick={() => this.addColumn()}
                    >
                        <Dashicon icon="plus" />
                        Add column
                    </div>
                </div>
            );
        }
    }
}

export default (block_spec, theme_spec) =>
    compose([
        withSelect((select, props) => {
            // Detect if inside a reusable block
            const getBlockParents = select("core/block-editor").getBlockParents(
                props.clientId
            );

            const parentsBlock = [];
            if (getBlockParents.length > 0) {
                for (var i in getBlockParents) {
                    parentsBlock.push(
                        select("core/block-editor").getBlock(getBlockParents[i])
                    );
                }
            }

            return {
                block_spec,
                theme_spec,
                inner_blocks: select("core/block-editor").getBlocks(
                    props.clientId
                ),
                innerBlocksProps: useInnerBlocksProps(
                    useBlockProps({ className: "" }),
                    { renderAppender: false }
                ),
                countColumns: select("core/block-editor").getBlockCount(
                    props.clientId
                ),
                blockVariations: select("core/blocks").getBlockVariations(
                    props.name,
                    "block"
                ),
                blockType: select("core/blocks").getBlockType(props.name),
                // isSelectedBlock: select("core/block-editor").isBlockSelected(
                //     props.clientId
                // ),
                // isParentOfSelectedBlock: select(
                //     "core/block-editor"
                // ).hasSelectedInnerBlock(props.clientId, true),
                parentsBlock,
            };
        }),
        withDispatch((dispatch) => {
            const {
                replaceInnerBlocks,
                removeBlock,
                duplicateBlocks,
                moveBlocksUp,
                moveBlocksDown,
            } = dispatch(blockEditorStore);

            return {
                replaceInnerBlocks,
                removeBlock,
                duplicateBlocks,
                moveBlocksUp,
                moveBlocksDown,
            };
        }),
    ])(WpeGrid);
