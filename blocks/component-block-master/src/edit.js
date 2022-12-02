import { WpeComponentBase } from '../../../js/WpeComponentBase';
import ServerSideRender from '@wordpress/server-side-render';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import {
    InnerBlocks,
    useBlockProps,
    useInnerBlocksProps
} from '@wordpress/block-editor';

class WpeComponent extends WpeComponentBase {

	constructor() {
        super( ...arguments );
    }

    liveRendering() {

        // Because of ID will be not saved to the block’s comment delimiter default attribute, we manually set it.
        if( typeof this.props.attributes.id_component == 'undefined' )
            this.setAttributes( { id_component: this.props.block_spec.id } );

        if( this?.props?.block_spec?.container && this.props.block_spec.container ) {

            return <div { ...this.props.innerBlocksProps } />
        }
        else {
            return  <ServerSideRender
                key={ this.props.clientId + "-serverSideRender" }
                block={ "custom/wpe-component-" + this.props.block_spec.id }
                attributes={ this.props.attributes }
                httpMethod={ "POST" }
            />
        }
    }
}

export default ( block_spec, current_user_can_edit_posts, theme_spec ) => compose( [
    withSelect( ( select, props ) => {

        const { getEntityRecords } = select( 'core' );
        const { __experimentalGetPreviewDeviceType } = select( 'core/edit-post' );
        let relations = [];

        if( props.name == "custom/wpe-component-" + block_spec.id ) {

            // Loop Props
            for (const [keyProp, valueProp] of Object.entries(block_spec.props)) {

                if( valueProp.type == 'relation' && typeof valueProp.entity != 'undefined' && relations[ valueProp.entity ] == null ) {
                    relations[ valueProp.entity ] = getEntityRecords( 'postType', valueProp.entity, {
                        per_page: -1,
                        status: 'publish'
                    } );
                }
            }
        }

        return {
            relations: relations,
            block_spec,
            current_user_can_edit_posts: current_user_can_edit_posts,
            theme_spec,
            innerBlocksProps: ( block_spec?.container && block_spec.container ) ? useInnerBlocksProps( useBlockProps( { className: '' } ), { renderAppender: InnerBlocks.ButtonBlockAppender } ) : null,
        };
    } ),
] )( WpeComponent )