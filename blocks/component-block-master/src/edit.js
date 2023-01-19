import { WpeComponentBase } from '../../../src/js/WpeComponentBase';
import ServerSideRender from '@wordpress/server-side-render';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import {
    InnerBlocks,
    useBlockProps,
    useInnerBlocksProps
} from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';

class WpeComponent extends WpeComponentBase {

	constructor() {
        super( ...arguments );

        this.iframeResize = this._iframeResize.bind(this);
    }

    componentDidMount() {

        this.apiFetch();
    }

    shouldComponentUpdate(nextProps, nextState) {

        if( ! this.state.needPreviewUpdate && nextState.needPreviewUpdate ) {
            this.apiFetch( nextProps.attributes );
        }

        return true;
    }

    apiFetch( attributes = null ) {

        this.setState({
            previewReady: false,
            iframeLoaded: false,
            error: null
        });
        
        apiFetch( {
            path: js_const.rest_api_namespace + js_const.componentblock_attr_autosaves_rest_api_resource_path + '/' + js_const.post_id + '/' + this.props.attributes.id_component + '/' + this.props.clientId,
            method: 'POST',
            data: ( attributes == null ) ? this.props.attributes : attributes
        } ).then( ( res ) => {
            if( res.success ) {

                this.setState({
                    previewReady: true,
                    needPreviewUpdate: false
                });
            }
            else {
                this.setState({
                    error: "Sorry an error occurs...",
                    needPreviewUpdate: false
                });

                console.log( js_const.rest_api_namespace + js_const.componentblock_attr_autosaves_rest_api_resource_path + '/' + js_const.post_id + '/' + this.props.clientId + ' error: ' + res.data);
            }
        } );
    }

    _iframeResize() {
        
        this.setState({
            iframeLoaded: true
        });
        
        var iFrame = document.getElementById( this.props.clientId + "-LiveRenderingIframe" );
        if(iFrame) {
            const heightIframe = iFrame.contentWindow.document.body.scrollHeight + "px";
            iFrame.height = heightIframe;
            iFrame.parentNode.style.height = heightIframe;
        }
    }

    renderLoaderPreview() {
        
        return <div
            key={ this.props.clientId + "-loaderLiveRenderingIframe" }
            className="loaderLiveRenderingIframe"
            style={ ( ! this.state.iframeLoaded ) ? { display: 'block' } : {} }
        ></div>
    }

    renderIframePreview() {
        
        return <iframe
            key={ this.props.clientId + "-LiveRenderingIframe" }
            id={ this.props.clientId + "-LiveRenderingIframe" }
            style={ { width: '100%' } }
            src={ js_const.rest_api_url + js_const.rest_api_namespace + js_const.componentblock_attr_autosaves_rest_api_resource_path + '/' + js_const.post_id + '/' + this.props.attributes.id_component + '/' + this.props.clientId }
            onLoad={this.iframeResize}
        ></iframe>
    }

    liveRendering() {

        // Because of ID will be not saved to the block’s comment delimiter default attribute, we manually set it.
        if( typeof this.props.attributes.id_component == 'undefined' )
            this.setAttributes( { id_component: this.props.block_spec.id } );

        if( this?.props?.block_spec?.container && this.props.block_spec.container ) {

            return <div { ...this.props.innerBlocksProps } />
        }
        else {

            const { error, previewReady } = this.state;

            var render = [ this.renderEditZone() ];

            if( error != null ){
                render.push(error);
            } else if( ! previewReady ) {
                render.push(this.renderLoaderPreview());
            } else {
                render.push(this.renderLoaderPreview());
                render.push(this.renderIframePreview());
            }

            return render;

            // return  <ServerSideRender
            //     key={ this.props.clientId + "-serverSideRender" }
            //     block={ "custom/wpe-component-" + this.props.block_spec.id }
            //     attributes={ this.props.attributes }
            //     httpMethod={ "POST" }
            // />
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