import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { getBlockContent } from '@wordpress/blocks';
import { Button, ButtonGroup } from '@wordpress/components';
import { useContext, useEffect, useState, useRef } from '@wordpress/element';
import { OButtonBlockAppender } from '../../Components/OButtonBlockAppender';
import apiFetch from '@wordpress/api-fetch';
import { OBlockEditorContext } from '../../Context/Providers/OBlockEditorProvider';

export function EditMode({ attributes }) {
    const [previewReady, setPreviewReady] = useState(false);
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [updatePreviewTimeoutRef, setUpdatePreviewTimeoutRef] =
        useState(null);

    const iframeRef = useRef(null);

    const {
        clientId,
        blockInstance,
        blockSpec,
        selectBlock,
        componentRestApiUrl,
        blockTitle,
        setErrorNotice,
        clearErrorNotice,
    } = useContext(OBlockEditorContext);

    const innerBlocksProps =
        typeof blockSpec.inner_blocks != 'undefined' &&
        blockSpec.inner_blocks !== false
            ? useInnerBlocksProps(
                  useBlockProps({
                      className:
                          blockSpec.inner_blocks == null ? 'hidden' : true,
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

    useEffect(() => {
        clearTimeout(updatePreviewTimeoutRef);
        setUpdatePreviewTimeoutRef(
            setTimeout(() => {
                runApiFetch(attributes);
            }, 1500),
        );
    }, [attributes]);

    function runApiFetch(attributes = null) {
        setPreviewReady(false);
        setIframeLoaded(false);
        setError(null);

        apiFetch({
            path: componentRestApiUrl,
            method: 'POST',
            data: {
                attributes: attributes,
                content: getBlockContent(blockInstance),
            },
        }).then((res) => {
            if (res.success) {
                setPreviewReady(true);
                setError(typeof res.data != 'undefined' ? res.data : null);
                clearErrorNotice(clientId);
            } else {
                setError(res.data);
                setErrorNotice(clientId, res.data);
            }
        });
    }

    const iframeResize = () => {
        setIframeLoaded(true);

        const heightIframe =
            iframeRef.current.contentWindow.document.body.offsetHeight + 'px';
        iframeRef.current.height = heightIframe;
        iframeRef.current.parentNode.style.height = heightIframe;
        iframeRef.current.contentWindow.document.body.style.overflowY =
            'hidden';
    };

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
        return (
            <iframe
                key={clientId + '-LiveRenderingIframe'}
                ref={iframeRef}
                className="o-preview-iframe"
                src={GLOBAL_LOCALIZED.rest_api_url + componentRestApiUrl}
                onLoad={iframeResize}
            ></iframe>
        );
    }

    function liveRendering() {
        const render = [];

        let countErrorsBlock = 0;
        for (let i in error) {
            if (typeof error[i].error != 'undefined') {
                countErrorsBlock++;
            }
        }

        if (previewReady) {
            render.push(renderLoaderPreview());
            render.push(renderIframePreview());

            if (
                typeof blockSpec.inner_blocks != 'undefined' &&
                blockSpec.inner_blocks !== false
            ) {
                render.push(
                    <div
                        key={clientId + '-innerBlocksProps'}
                        {...innerBlocksProps}
                    />,
                );
            }
        } else if (countErrorsBlock === 0) {
            render.push(renderLoaderPreview());
        }

        render.push(
            <div
                key={clientId + '-blockEditOverlay'}
                className={`block-edit-overlay${
                    countErrorsBlock > 0 ? ' errors' : ''
                }`}
                onMouseDown={() => {
                    selectBlock(clientId);
                    // const domBlock = document.querySelector(
                    //     '#block-' + clientId,
                    // );
                    // domBlock?.scrollIntoView({
                    //     behavior: 'smooth',
                    //     block: 'center',
                    // });
                }}
            >
                <h2>
                    {blockTitle}
                    {countErrorsBlock > 0 && (
                        <span className="error-attributes">
                            {countErrorsBlock}
                        </span>
                    )}
                </h2>
                {countErrorsBlock > 0 && (
                    <p>
                        Fix error{countErrorsBlock > 1 && 's'} to make this
                        block visible.
                    </p>
                )}
                {error != null && typeof error == 'string' && <p>{error}</p>}
                <Button variant="link">Click to edit</Button>
            </div>,
        );

        return render;
    }

    return <>{liveRendering()}</>;
}
