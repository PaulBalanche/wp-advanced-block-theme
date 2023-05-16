/**
 * WordPress dependencies
 */
import {
    InnerBlocks,
    useBlockProps,
    useInnerBlocksProps,
} from "@wordpress/block-editor";
import { compose } from "@wordpress/compose";
import { WpeComponentBase } from "../../../Components/WpeComponentBase";

import { withSelect } from "@wordpress/data";

/**
 * registerBlockType edit function
 *
 */
class WpeSlide extends WpeComponentBase {
    constructor() {
        super(...arguments);
    }

    liveRendering() {
        const { children, ...innerBlocksProps } = this.props.innerBlocksProps;
        innerBlocksProps.key = "innerBlocksProps_" + this.props.clientId;

        return (
            <div {...innerBlocksProps}>
                {this.renderEditFormZone()}
                {children}
            </div>
        );
    }
}

export default (block_spec, theme_spec) =>
    compose([
        withSelect(() => {
            return {
                block_spec,
                theme_spec,
                innerBlocksProps: useInnerBlocksProps(
                    useBlockProps({ className: "" }),
                    { renderAppender: InnerBlocks.ButtonBlockAppender }
                ),
            };
        }),
    ])(WpeSlide);
