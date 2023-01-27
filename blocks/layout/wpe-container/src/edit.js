/**
 * WordPress dependencies
 */
import { WpeComponentBase } from '../../../../src/js/Models/WpeComponentBase';
import { compose } from '@wordpress/compose';
import {
    InnerBlocks,
    useBlockProps,
    useInnerBlocksProps,
    __experimentalBlockVariationPicker
} from '@wordpress/block-editor';

import { withSelect } from '@wordpress/data';


/**
 * registerBlockType edit function
 */
class WpeContainer extends WpeComponentBase {

	constructor() {
        super( ...arguments );
    }
    liveRendering() {

        const { children, ...innerBlocksProps } = this.props.innerBlocksProps;
        innerBlocksProps.key = 'innerBlocksProps_' + this.props.clientId;

        return <div {...innerBlocksProps}>
            { this.renderEditZone() }
            { children }
        </div>
    }
}

export default ( containerConfig, block_spec, theme_spec ) => compose( [
	withSelect( ( select, props ) => {

        const { __experimentalGetPreviewDeviceType } = select( 'core/edit-post' );

        return {
            containerConfig: containerConfig,
            block_spec,
            theme_spec,
            innerBlocksProps: useInnerBlocksProps( useBlockProps( { className: '' } ), { renderAppender: InnerBlocks.ButtonBlockAppender } ),
            // backgroundData: ! props.attributes.backgroundFile ? null : select('core').getEntityRecord('postType', 'attachment', props.attributes.backgroundFile ),
            // experimentalDeviceType: __experimentalGetPreviewDeviceType(),
            isSelectedBlock: select('core/block-editor').isBlockSelected(props.clientId),
            isParentOfSelectedBlock: select('core/block-editor').hasSelectedInnerBlock(props.clientId, true)
        };
    } ),
] )( WpeContainer )