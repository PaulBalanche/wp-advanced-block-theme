/**
 * WordPress dependencies
 */
import { WpeComponentBase } from '../../../../src/js/WpeComponentBase';
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

        var { innerBlocksProps } = this.props;
        
        innerBlocksProps.key = 'innerBlocksProps_' + this.props.clientId;
        return <div { ...innerBlocksProps } />
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