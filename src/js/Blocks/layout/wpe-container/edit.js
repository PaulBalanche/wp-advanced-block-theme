/**
 * WordPress dependencies
 */
import {
    store as blockEditorStore,
    useBlockProps,
    useInnerBlocksProps,
} from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';
import { OButtonBlockAppender } from '../../../Components/OButtonBlockAppender';
import { WpeComponentBase } from '../../../Components/WpeComponentBase';

/**
 * registerBlockType edit function
 */
class WpeContainer extends WpeComponentBase {
    constructor() {
        super(...arguments);
    }
    liveRendering() {
        const { children, ...innerBlocksProps } = this.props.innerBlocksProps;
        innerBlocksProps.key = 'innerBlocksProps_' + this.props.clientId;

        return (
            <div {...innerBlocksProps}>
                {this.renderEditFormZone()}
                {children}
            </div>
        );
    }
}

export default (containerConfig, block_spec, theme_spec) =>
    compose([
        withSelect((select, props) => {
            const { __experimentalGetPreviewDeviceType } =
                select('core/edit-post');

            // Detect if inside a reusable block
            const getBlockParents = select('core/block-editor').getBlockParents(
                props.clientId,
            );
            const parentsBlock = [];
            for (var i in getBlockParents) {
                parentsBlock.push(
                    select('core/block-editor').getBlock(getBlockParents[i]),
                );
            }

            return {
                containerConfig: containerConfig,
                block_spec,
                theme_spec,
                innerBlocksProps: useInnerBlocksProps(
                    useBlockProps({ className: '' }),
                    { renderAppender: OButtonBlockAppender },
                ),
                isSelectedBlock: select('core/block-editor').isBlockSelected(
                    props.clientId,
                ),
                isParentOfSelectedBlock: select(
                    'core/block-editor',
                ).hasSelectedInnerBlock(props.clientId, true),
                parentsBlock,
            };
        }),
        withDispatch((dispatch) => {
            const { removeBlock, duplicateBlocks } = dispatch(blockEditorStore);

            return {
                removeBlock,
                duplicateBlocks,
            };
        }),
    ])(WpeContainer);
