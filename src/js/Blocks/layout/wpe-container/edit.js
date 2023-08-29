/**
 * WordPress dependencies
 */
import { store as blockEditorStore } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';
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

export const EditMode = compose([
    withSelect((select, props) => {
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
