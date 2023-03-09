/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { WpeComponentBase } from '../../../../src/js/Models/WpeComponentBase';
import { compose } from '@wordpress/compose';
import {
    useBlockProps,
    useInnerBlocksProps,
    store as blockEditorStore
} from '@wordpress/block-editor';

import { withSelect, withDispatch } from '@wordpress/data';

import {
    Button,
    ButtonGroup
} from '@wordpress/components';

/**
 * registerBlockType edit function
 */
class WpeSlider extends WpeComponentBase {

	constructor() {
        super( ...arguments );
    }

    addSlide() {

        let inner_blocks_new = [
            ...this.props.inner_blocks,
            createBlock('custom/wpe-slide')
        ];

        this.props.replaceInnerBlocks( this.props.clientId, inner_blocks_new, false );
        let lastSlideId = inner_blocks_new[ inner_blocks_new.length - 1 ].clientId;
        this.setState( { activeSlide: lastSlideId } )
    }

    liveRendering() {

        var {
            clientId,
            inner_blocks
        } = this.props;

        const { children, ...innerBlocksProps } = this.props.innerBlocksProps;
        innerBlocksProps.key = 'innerBlocksProps_' + clientId;

        let inlineCss = '';
        let buttons = [];
        inner_blocks.forEach( (element, key) => {

            let index = key + 1;

            let isPressed = true;
            if( 
                ( typeof this.state.activeSlide == 'undefined' && key != 0 ) ||
                ( typeof this.state.activeSlide != 'undefined' && element.clientId != this.state.activeSlide )
            ) {
                inlineCss += '#block-' + element.clientId + '{ display:none; }';
                isPressed = false;
            }

            buttons.push(
                <Button
                    key={ clientId + "-buttonSlide_" + index }
                    isPressed={ isPressed }
                    onMouseDown={ () => this.setState( { activeSlide: element.clientId } ) }
                >{ 'Slide ' + index }</Button>
            );
        });

        buttons.push(
            <Button
                key={ clientId + "-buttonSlide_X" }
                isPressed={ false }
                onMouseDown={ () => this.addSlide() }
                className="addSlide"
            >New slide</Button>
        );

        const buttonGroupComponentModeContainer = <ButtonGroup
            key={ clientId + "-buttonGroupComponentMode" }
            className="buttonGroupComponentModeContainer"
        >
            { buttons }
        </ButtonGroup>
        
        return <div {...innerBlocksProps}>
            <style>{inlineCss}</style>
            { this.renderEditFormZone(buttonGroupComponentModeContainer) }
            { children }
        </div>
    }
}

export default ( block_spec, theme_spec ) => compose( [
	withSelect( ( select, props ) => {

        // Detect if inside a reusable block
        const getBlockParents = select('core/block-editor').getBlockParents(props.clientId);
        const parentsBlock = [];
        for( var i in getBlockParents ) {

            parentsBlock.push( select('core/block-editor').getBlock( getBlockParents[i] ) );
        }

        return {
            block_spec,
            theme_spec,
            inner_blocks: select('core/block-editor').getBlocks(props.clientId),
            innerBlocksProps: useInnerBlocksProps( useBlockProps( { className: '' } ), { renderAppender:false } ),
            countSlides: select( 'core/block-editor' ).getBlockCount(props.clientId),
            blockType: select('core/blocks').getBlockType(props.name),
            isSelectedBlock: select('core/block-editor').isBlockSelected(props.clientId),
            isParentOfSelectedBlock: select('core/block-editor').hasSelectedInnerBlock(props.clientId, true),
            parentsBlock
        };
    } ),
    withDispatch( ( dispatch ) => {
        
		const {
            replaceInnerBlocks,
            removeBlock,
            duplicateBlocks
        } = dispatch( blockEditorStore );

		return {
			replaceInnerBlocks,
            removeBlock,
            duplicateBlocks
		};
	} )
] )( WpeSlider );