/**
 * WordPress dependencies
 */
import { WpeComponentBase } from '../../../../js/WpeComponentBase';
import { compose } from '@wordpress/compose';
import {
    InnerBlocks,
    InspectorControls,
    MediaPlaceholder,
    useBlockProps,
    useInnerBlocksProps,
    __experimentalBlockVariationPicker
} from '@wordpress/block-editor';

import {
    PanelBody,
    SelectControl,
    Button,
    ButtonGroup,
    Placeholder
} from '@wordpress/components';

import { withSelect } from '@wordpress/data';

import { MarginControls, generateMarginClassName } from '../../../component-block-master/src/_marginControls.js';

import { getLayouts, setBodyDevice, getBodyDevice, initContainer } from '../../../../js/devices';
import { renderControl } from '../../../../js/attributes';

/**
 * registerBlockType edit function
 */
class WpeContainer extends WpeComponentBase {

	constructor() {
        super( ...arguments );
    }
    liveRendering() {
        this.props.innerBlocksProps.key = 'innerBlocksProps_' + this.props.clientId;
        return <div { ...this.props.innerBlocksProps } />;
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
            backgroundData: ! props.attributes.backgroundFile ? null : select('core').getEntityRecord('postType', 'attachment', props.attributes.backgroundFile ),
            experimentalDeviceType: __experimentalGetPreviewDeviceType(),
            isSelectedBlock: select('core/block-editor').isBlockSelected(props.clientId),
            isParentOfSelectedBlock: select('core/block-editor').hasSelectedInnerBlock(props.clientId, true)
        };
    } ),
] )( WpeContainer );