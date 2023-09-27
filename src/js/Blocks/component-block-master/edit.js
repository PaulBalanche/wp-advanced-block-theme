import { store as blockEditorStore } from '@wordpress/block-editor';
import { getBlockContent } from '@wordpress/blocks';
import { Button, Dashicon } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';

import { WpeComponentBase } from '../../Components/WpeComponentBase';

import apiFetch from '@wordpress/api-fetch';

import __OEditorApp from '../../Components/OEditorApp';

class WpeComponent extends WpeComponentBase {
    _$iframes;

    constructor() {
        super(...arguments);

        // Because of ID will be not saved to the block’s comment delimiter default attribute, we manually set it.
        if (typeof this.props.attributes.id_component == 'undefined')
            this.setAttributes({ id_component: this.props.block_spec.id });

        this.description = this.props.block_spec.description;
        this.previewUrl =
            GLOBAL_LOCALIZED.rest_api_url +
            GLOBAL_LOCALIZED.rest_api_namespace +
            GLOBAL_LOCALIZED.componentblock_attr_autosaves_rest_api_resource_path +
            '/' +
            GLOBAL_LOCALIZED.post_id +
            '/' +
            this.props.block_spec.id +
            '/' +
            this.props.clientId;

        this.iframeResize = this._iframeResize.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.apiFetch();
        });
    }

    apiFetch(attributes = null) {
        this.setState({
            previewReady: false,
            iframeLoaded: false,
            error: null,
        });

        apiFetch({
            path:
                GLOBAL_LOCALIZED.rest_api_namespace +
                GLOBAL_LOCALIZED.componentblock_attr_autosaves_rest_api_resource_path +
                '/' +
                GLOBAL_LOCALIZED.post_id +
                '/' +
                this.props.attributes.id_component +
                '/' +
                this.props.clientId,
            method: 'POST',
            data: {
                attributes:
                    attributes == null ? this.props.attributes : attributes,
                content: getBlockContent(this.props.blockInstance),
            },
        }).then((res) => {
            if (res.success) {
                this.setState({
                    previewReady: true,
                    needPreviewUpdate: false,
                    error: typeof res.data != 'undefined' ? res.data : null,
                });
            } else {
                this.setState({
                    error: res.data,
                    needPreviewUpdate: false,
                });
            }

            if (__OEditorApp.getInstance()) {
                __OEditorApp.getInstance().forceUpdate();
            }
        });
    }

    _iframeResize() {
        this.setState({
            iframeLoaded: true,
        });

        var iFrame = document.getElementById(
            this.props.clientId + '-LiveRenderingIframe',
        );
        if (iFrame) {
            const heightIframe =
                iFrame.contentWindow.document.body.offsetHeight + 'px';
            iFrame.height = heightIframe;
            iFrame.parentNode.style.height = heightIframe;
            iFrame.contentWindow.document.body.style.overflowY = 'hidden';
        }

        // __OEditorApp.getInstance().refreshScrollrefreshScroll();
    }

    renderLoaderPreview() {
        const className = this.state.iframeLoaded
            ? 'loaderLiveRenderingIframe closed'
            : 'loaderLiveRenderingIframe';

        return (
            <div
                key={this.props.clientId + '-loaderLiveRenderingIframe'}
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
                key={this.props.clientId + '-LiveRenderingIframe'}
                id={this.props.clientId + '-LiveRenderingIframe'}
                src={this.previewUrl}
                onLoad={this.iframeResize}
            ></iframe>
        );

        return $iframe;
    }

    liveRendering() {
        const { error, previewReady } = this.state;
        var render = [];

        let errorsBlock = 0;
        for (var i in error) {
            if (typeof error[i].error != 'undefined') {
                errorsBlock++;
            }
        }

        if (previewReady) {
            // render.push(this.renderEditFormZone());
            render.push(this.renderLoaderPreview());
            render.push(this.renderIframePreview());

            if (
                typeof this.props.block_spec.inner_blocks != 'undefined' &&
                this.props.block_spec.inner_blocks !== false
            ) {
                render.push(
                    <div
                        key={this.props.clientId + '-innerBlocksProps'}
                        {...this.props.innerBlocksProps}
                    />,
                );
            }
        } else if (errorsBlock === 0) {
            // render.push(this.renderEditFormZone());
            render.push(this.renderLoaderPreview());
        }

        render.push(
            <div
                key={this.props.clientId + '-blockEditOverlay'}
                className={`block-edit-overlay${
                    errorsBlock > 0 ? ' errors' : ''
                }`}
                onMouseDown={() => {
                    const domBlock = document.querySelector(
                        '#block-' + this.props.clientId,
                    );
                    domBlock?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    });
                    __OEditorApp.getInstance().open();
                }}
            >
                <h2>
                    {this.title}
                    {errorsBlock > 0 && (
                        <span className="error-attributes">{errorsBlock}</span>
                    )}
                </h2>
                {errorsBlock > 0 && (
                    <p>
                        Fix error{errorsBlock > 1 && 's'} to make this block
                        visible.
                    </p>
                )}
                {error != null && typeof error == 'string' && <p>{error}</p>}
                <Button variant="primary">
                    <Dashicon icon="edit" /> Edit
                </Button>
            </div>,
        );

        return render;
    }
}

export const EditMode = compose([
    withSelect((select, props) => {
        const { getEntityRecords } = select('core');
        const { __experimentalGetPreviewDeviceType } = select('core/edit-post');
        let relations = [];

        if (props.name === 'custom/wpe-component-' + props.block_spec.id) {
            // Loop Props
            for (const [keyProp, valueProp] of Object.entries(
                props.block_spec.props,
            )) {
                if (
                    (valueProp.type === 'relation' ||
                        valueProp.type === 'form') &&
                    typeof valueProp.entity != 'undefined' &&
                    relations[valueProp.entity] == null
                ) {
                    relations[valueProp.entity] = getEntityRecords(
                        'postType',
                        valueProp.entity,
                        {
                            per_page: -1,
                            status: 'publish',
                        },
                    );
                }
            }
        }

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
            relations: relations,
            parentsBlock,
            blockInstance: select('core/block-editor').getBlock(props.clientId),
            blocksList: select('core/block-editor').getBlocks(props.clientId),
        };
    }),
    withDispatch((dispatch) => {
        const {
            selectBlock,
            removeBlock,
            duplicateBlocks,
            moveBlocksUp,
            moveBlocksDown,
        } = dispatch(blockEditorStore);

        return {
            selectBlock,
            removeBlock,
            duplicateBlocks,
            moveBlocksUp,
            moveBlocksDown,
        };
    }),
])(WpeComponent);
