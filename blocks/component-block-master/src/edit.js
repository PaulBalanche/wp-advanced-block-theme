import { WpeComponentBase } from '../../../js/WpeComponentBase';
import ServerSideRender from '@wordpress/server-side-render';
import { withSelect } from '@wordpress/data';
import {
    Placeholder
} from '@wordpress/components';
import { renderControl, renderTabPanelComponent } from '../../../js/attributes.js';

class WpeComponent extends WpeComponentBase {

	constructor() {
        super( ...arguments );

        this.defineLiveRendering();
    }

    defineLiveRendering() {

        // Because of ID will be not saved to the block’s comment delimiter default attribute, we manually set it.
        if( typeof this.props.attributes.id_component == 'undefined' )
            this.setAttributes( { id_component: block_spec.id } );
            
        this.blockSpecificRender = <ServerSideRender
            key={ this.props.clientId + "-serverSideRender" }
            block={ "custom/wpe-component-" + this.props.block_spec.id }
            attributes={ this.props.attributes }
            httpMethod={ "POST" }
        />;
    }
}

export default (block_spec, current_user_can_edit_posts, frontspec_styles ) => withSelect( ( select, props ) => {

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
        frontspec_styles: frontspec_styles
    };
} )( WpeComponent )