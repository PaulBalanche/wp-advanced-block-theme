import {
    store as blockEditorStore,
    InnerBlocks,
    useBlockProps,
    useInnerBlocksProps,
} from '@wordpress/block-editor';
import { getBlockContent } from '@wordpress/blocks';
import { Button, Dashicon, ButtonGroup } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { getBlockType } from '@wordpress/blocks';
import WpeComponentBase from '../../Components/WpeComponentBase';
import { OButtonBlockAppender } from '../../Components/OButtonBlockAppender';
import __OEditorApp from '../../Components/OEditorApp';
import apiFetch from '@wordpress/api-fetch';

function EditMode({
    attributes,
    setAttributes,
    clientId,
    name,
    block_spec,
    theme_spec,
}) {
    const [previewReady, setPreviewReady] = useState(false);
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [needPreviewUpdate, setNeedPreviewUpdate] = useState(true);
    const [error, setError] = useState(false);

    const innerBlocksProps =
        typeof block_spec.inner_blocks != 'undefined' &&
        block_spec.inner_blocks !== false
            ? useInnerBlocksProps(
                  useBlockProps({
                      className:
                          block_spec.inner_blocks == null ? 'hidden' : true,
                  }),
                  {
                      renderAppender: () => (
                          <ButtonGroup className="inspectorButtonInsertNew">
                              <OButtonBlockAppender rootClientId={clientId} />
                          </ButtonGroup>
                      ),
                  },
              )
            : null;

    const { blockInstance } = useSelect(
        (select) => {
            return {
                blockInstance: select('core/block-editor').getBlock(clientId),
            };
        },
        [clientId],
    );

    // Because of ID will be not saved to the block’s comment delimiter default attribute, we manually set it.
    if (typeof attributes.id_component == 'undefined')
        setAttributes({ id_component: block_spec.id });

    const previewUrl =
        GLOBAL_LOCALIZED.rest_api_url +
        GLOBAL_LOCALIZED.rest_api_namespace +
        GLOBAL_LOCALIZED.componentblock_attr_autosaves_rest_api_resource_path +
        '/' +
        GLOBAL_LOCALIZED.post_id +
        '/' +
        block_spec.id +
        '/' +
        clientId;

    const iframeResize = _iframeResize.bind(this);

    useEffect(() => {
        if (needPreviewUpdate) {
            runApiFetch(attributes);
        }
    }, [attributes, needPreviewUpdate]);

    function runApiFetch(attributes = null) {
        setNeedPreviewUpdate(false);
        setPreviewReady(false);
        setIframeLoaded(false);
        setError(null);

        apiFetch({
            path:
                GLOBAL_LOCALIZED.rest_api_namespace +
                GLOBAL_LOCALIZED.componentblock_attr_autosaves_rest_api_resource_path +
                '/' +
                GLOBAL_LOCALIZED.post_id +
                '/' +
                attributes.id_component +
                '/' +
                clientId,
            method: 'POST',
            data: {
                attributes: attributes,
                content: getBlockContent(blockInstance),
            },
        }).then((res) => {
            if (res.success) {
                setPreviewReady(true);
                setError(typeof res.data != 'undefined' ? res.data : null);
            } else {
                setError(res.data);
            }

            // if (__OEditorApp.getInstance()) {
            //     __OEditorApp.getInstance().forceUpdate();
            // }
        });
    }

    function _iframeResize() {
        setIframeLoaded(true);

        const iFrame = document.getElementById(
            clientId + '-LiveRenderingIframe',
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

    function renderLoaderPreview() {
        const className = iframeLoaded
            ? 'loaderLiveRenderingIframe closed'
            : 'loaderLiveRenderingIframe';

        return (
            <div
                key={clientId + '-loaderLiveRenderingIframe'}
                className={className}
            >
                <div className="_inner">
                    <div className="o-loader"></div>
                </div>
            </div>
        );
    }

    function renderIframePreview() {
        const $iframe = (
            <iframe
                className="o-preview-iframe"
                key={clientId + '-LiveRenderingIframe'}
                id={clientId + '-LiveRenderingIframe'}
                src={previewUrl}
                onLoad={iframeResize}
            ></iframe>
        );

        return $iframe;
    }

    function liveRendering() {
        const render = [];

        let errorsBlock = 0;
        for (let i in error) {
            if (typeof error[i].error != 'undefined') {
                errorsBlock++;
            }
        }

        if (previewReady) {
            render.push(renderLoaderPreview());
            render.push(renderIframePreview());

            if (
                typeof block_spec.inner_blocks != 'undefined' &&
                block_spec.inner_blocks !== false
            ) {
                render.push(
                    <div
                        key={clientId + '-innerBlocksProps'}
                        {...innerBlocksProps}
                    />,
                );
            }
        } else if (errorsBlock === 0) {
            render.push(renderLoaderPreview());
        }

        render.push(
            <div
                key={clientId + '-blockEditOverlay'}
                className={`block-edit-overlay${
                    errorsBlock > 0 ? ' errors' : ''
                }`}
                onMouseDown={() => {
                    const domBlock = document.querySelector(
                        '#block-' + clientId,
                    );
                    domBlock?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    });
                    __OEditorApp.getInstance().open();
                }}
            >
                <h2>
                    {getBlockType(name).title}
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

    return (
        <WpeComponentBase
            attributes={attributes}
            setAttributes={setAttributes}
            clientId={clientId}
            name={name}
            description={block_spec.description}
            block_spec={block_spec}
            error={error}
            onChange={() => setNeedPreviewUpdate(true)}
        >
            {liveRendering()}
        </WpeComponentBase>
    );
}

export default EditMode;

// export const EditModeOld = compose([
//     withSelect((select, props) => {
//         const { getEntityRecords } = select('core');
//         const { __experimentalGetPreviewDeviceType } = select('core/edit-post');
//         let relations = [];
//
//         if (props.name === 'custom/wpe-component-' + props.block_spec.id) {
//             // Loop Props
//             for (const [keyProp, valueProp] of Object.entries(
//                 props.block_spec.props,
//             )) {
//                 if (
//                     (valueProp.type === 'relation' ||
//                         valueProp.type === 'form') &&
//                     typeof valueProp.entity != 'undefined' &&
//                     relations[valueProp.entity] == null
//                 ) {
//                     relations[valueProp.entity] = getEntityRecords(
//                         'postType',
//                         valueProp.entity,
//                         {
//                             per_page: -1,
//                             status: 'publish',
//                         },
//                     );
//                 }
//             }
//         }
//
//         return {
//             relations: relations,
//             blockInstance: select('core/block-editor').getBlock(props.clientId),
//             blocksList: select('core/block-editor').getBlocks(props.clientId),
//         };
//     }),
//
//     }),
// ])(WpeComponent);
