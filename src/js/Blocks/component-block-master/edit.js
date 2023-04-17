import {
    InnerBlocks,
    store as blockEditorStore,
    useBlockProps,
    useInnerBlocksProps,
} from "@wordpress/block-editor";
import { compose } from "@wordpress/compose";
import { withDispatch, withSelect } from "@wordpress/data";
import { WpeComponentBase } from "../../Components/WpeComponentBase";

import apiFetch from "@wordpress/api-fetch";

import __OEditorApp from "../../Components/OEditorApp";

class WpeComponent extends WpeComponentBase {
    _$iframes;

    constructor() {
        super(...arguments);

        // Because of ID will be not saved to the block’s comment delimiter default attribute, we manually set it.
        if (typeof this.props.attributes.id_component == "undefined")
            this.setAttributes({ id_component: this.props.block_spec.id });

        this.description = this.props.block_spec.description;
        this.previewUrl =
            js_const.rest_api_url +
            js_const.rest_api_namespace +
            js_const.componentblock_attr_autosaves_rest_api_resource_path +
            "/" +
            js_const.post_id +
            "/" +
            this.props.attributes.id_component +
            "/" +
            this.props.clientId;

        this.iframeResize = this._iframeResize.bind(this);
    }

    componentDidMount() {

        setTimeout(() => {
            this.apiFetch();
        });

        // load iframes one after the other
        // it seems that it's a bad idea cause it's slower...
        // (async () => {
        //     if (!this._$iframes) {
        //         this._$iframes = Array.from(
        //             document.querySelectorAll(".o-preview-iframe") ?? []
        //         );
        //         for (let [idx, $iframe] of this._$iframes.entries()) {
        //             await new Promise((resolve) => {
        //                 $iframe.addEventListener("load", () => {
        //                     resolve();
        //                 });
        //                 $iframe.setAttribute(
        //                     "src",
        //                     $iframe.getAttribute("data-src")
        //                 );
        //             });
        //         }
        //     }
        // })();

        // for (let [idx, $frame] of this._$iframes.entries()) {
        //     console.log($iframe.key);
        //     if ($frame.id === $iframe.key) {
        //         console.log(idx, $frame, $iframe);
        //     }
        // }
    }

    shouldComponentUpdate(nextProps, nextState) {
        this._iframeResize.bind(this);

        if (!this.state.needPreviewUpdate && nextState.needPreviewUpdate) {
            this.apiFetch(nextProps.attributes);
        }

        return true;
    }

    apiFetch(attributes = null) {
        this.setState({
            previewReady: false,
            iframeLoaded: false,
            error: null,
        });

        apiFetch({
            path:
                js_const.rest_api_namespace +
                js_const.componentblock_attr_autosaves_rest_api_resource_path +
                "/" +
                js_const.post_id +
                "/" +
                this.props.attributes.id_component +
                "/" +
                this.props.clientId,
            method: "POST",
            data: attributes == null ? this.props.attributes : attributes,
        }).then((res) => {
            if (res.success) {
                this.setState({
                    previewReady: true,
                    needPreviewUpdate: false,
                });
            } else {
                this.setState({
                    error: res.data,
                    needPreviewUpdate: false,
                });
            }

            __OEditorApp.getInstance().forceUpdate();
        });
    }

    _iframeResize() {
        this.setState({
            iframeLoaded: true,
        });

        var iFrame = document.getElementById(
            this.props.clientId + "-LiveRenderingIframe"
        );
        if (iFrame) {
            const heightIframe =
                iFrame.contentWindow.document.body.scrollHeight + "px";
            iFrame.height = heightIframe;
            iFrame.parentNode.style.height = heightIframe;
            iFrame.contentWindow.document.body.style.overflowY = "hidden";
        }

        // __OEditorApp.getInstance().refreshScrollrefreshScroll();
    }

    renderLoaderPreview() {

        const className = ( this.state.iframeLoaded ) ? "loaderLiveRenderingIframe closed" : "loaderLiveRenderingIframe";

        return (
            <div
                key={this.props.clientId + "-loaderLiveRenderingIframe"}
                className={className}
            >
                <div className="_inner">
                    <div className="o-loader"></div>
                </div>
            </div>
        );
    }

    renderIframePreview() {
        const $iframe = (
            <iframe
                className="o-preview-iframe"
                key={this.props.clientId + "-LiveRenderingIframe"}
                id={this.props.clientId + "-LiveRenderingIframe"}
                src={this.previewUrl}
                onLoad={this.iframeResize}
            ></iframe>
        );

        return $iframe;
    }

    liveRendering() {
        if (
            this?.props?.block_spec?.container &&
            this.props.block_spec.container
        ) {
            return <div {...this.props.innerBlocksProps} />;
        } else {
            const { error, previewReady } = this.state;

            var render = [];

            if (error != null) {
                if (
                    typeof error == "object" &&
                    error?.missing_attributes &&
                    error.missing_attributes
                ) {
                    render.push(this.renderEditFormZone());
                    render.push(
                        <div
                            key={this.props.clientId + "-LiveRenderingMessage"}
                            className="liveRenderingMessage"
                        >
                            <span className="diagonal1"></span>
                            <span className="diagonal2"></span>
                            <span className="inner">Click to edit</span>
                            {/* {this.renderButtonEditZone()} */}
                        </div>
                    );
                } else {
                    render.push(this.renderEditFormZone());
                    render.push(
                        <div
                            key={this.props.clientId + "-LiveRenderingMessage"}
                            className="liveRenderingMessage"
                        >
                            <span className="diagonal1"></span>
                            <span className="diagonal2"></span>
                            <span className="inner">{error}</span>
                        </div>
                    );
                }
            } else if (!previewReady) {
                render.push(this.renderEditFormZone());
                render.push(this.renderLoaderPreview());
            } else {
                render.push(this.renderEditFormZone());
                render.push(this.renderLoaderPreview());
                render.push(this.renderIframePreview());
            }

            return render;
        }
    }
}

export default (block_spec, current_user_can_edit_posts, theme_spec) =>
    compose([
        withSelect((select, props) => {
            const { getEntityRecords } = select("core");
            const { __experimentalGetPreviewDeviceType } =
                select("core/edit-post");
            let relations = [];

            if (props.name == "custom/wpe-component-" + block_spec.id) {
                // Loop Props
                for (const [keyProp, valueProp] of Object.entries(
                    block_spec.props
                )) {
                    if (
                        valueProp.type == "relation" &&
                        typeof valueProp.entity != "undefined" &&
                        relations[valueProp.entity] == null
                    ) {
                        relations[valueProp.entity] = getEntityRecords(
                            "postType",
                            valueProp.entity,
                            {
                                per_page: -1,
                                status: "publish",
                            }
                        );
                    }
                }
            }

            // Detect if inside a reusable block
            const getBlockParents = select("core/block-editor").getBlockParents(
                props.clientId
            );
            const parentsBlock = [];
            for (var i in getBlockParents) {
                parentsBlock.push(
                    select("core/block-editor").getBlock(getBlockParents[i])
                );
            }

            return {
                relations: relations,
                block_spec,
                current_user_can_edit_posts: current_user_can_edit_posts,
                theme_spec,
                innerBlocksProps:
                    block_spec?.container && block_spec.container
                        ? useInnerBlocksProps(
                              useBlockProps({ className: "" }),
                              {
                                  renderAppender:
                                      InnerBlocks.ButtonBlockAppender,
                              }
                          )
                        : null,
                parentsBlock,
                blockInstance: select("core/block-editor").getBlock(
                    props.clientId
                ),
            };
        }),
        withDispatch((dispatch) => {
            const {
                removeBlock,
                duplicateBlocks,
                moveBlocksUp,
                moveBlocksDown,
            } = dispatch(blockEditorStore);

            // dispatch( preferencesStore ).setDefaults(
            //     'abt/wpe-component',
            //     {
            //         myBooleanFeature: true
            //     }
            // );

            return {
                removeBlock,
                duplicateBlocks,
                // __experimentalConvertBlocksToReusable
                moveBlocksUp,
                moveBlocksDown,
            };
        }),
    ])(WpeComponent);
