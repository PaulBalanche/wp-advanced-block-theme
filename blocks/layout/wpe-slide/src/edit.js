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
 * 
 */
class WpeSlide extends WpeComponentBase {
 
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

export default ( block_spec, theme_spec ) => compose( [
    withSelect( () => {

        return {
            block_spec,
            theme_spec,
            innerBlocksProps: useInnerBlocksProps( useBlockProps( { className: '' } ), { renderAppender: InnerBlocks.ButtonBlockAppender } ),
            disableButtonGroupMode: true
        };
    } ),
] )( WpeSlide );