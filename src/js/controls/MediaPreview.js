import apiFetch from '@wordpress/api-fetch';
import { Button, Dashicon } from "@wordpress/components";
import { useState } from "@wordpress/element";

export function MediaPreview({id, value, onChange}) {

    const [preview, setPreview] = useState( null );

    function fetchMedia() {

        apiFetch( { path: '/wp/v2/media/' + value } ).then( ( posts ) => {
            if( typeof posts == 'object' && posts != null && typeof posts.media_type != undefined ) {
                console.log(posts);
                switch( posts.media_type ) {

                    case "image":
                        setPreview(
                            <img
                                key={id + "-imagePreview"}
                                alt="Edit image"
                                title="Edit image"
                                className="edit-image-preview"
                                src={posts.media_details.sizes.medium.source_url}
                            />
                        );
                        return;
                    
                    case "file":
                        setPreview(
                            <img
                                key={id + "-imagePreview"}
                                alt="Edit image"
                                title="Edit image"
                                className="edit-image-preview"
                                src={posts.media_details.sizes.medium.source_url}
                            />
                        );
                        return;
                }
            }

            setPreview(false);
        } );
    }

    if( value && Number.isInteger(value) ) {

        if( preview == null ) {

            fetchMedia();

            return <PreviewContainer key={id + "-PreviewContainer"} id={id} isEmpty={true}>
                <span className="diagonal1"></span>
                <span className="diagonal2"></span>
                <span className="inner">
                    <div className="o-loader"></div>
                </span>
            </PreviewContainer>
        }
        else if( preview ) {

            return <PreviewContainer key={id + "-PreviewContainer"} id={id} >
                {preview}
                <Button
                    key={id + "-removeMedia"}
                    variant="primary"
                    className="reset-button is-destructive"
                    onMouseDown={() => onChange(undefined)}
                >
                    <Dashicon icon="trash" />
                </Button>
            </PreviewContainer>
        }
        else {
            return <PreviewContainer key={id + "-PreviewContainer"} id={id} isEmpty={true}>
                <span className="diagonal1"></span>
                <span className="diagonal2"></span>
                <span className="inner">No available preview...</span>
            </PreviewContainer>
        }
    }
    else {
        return <PreviewContainer key={id + "-PreviewContainer"} id={id} isEmpty={true}>
            <span className="diagonal1"></span>
            <span className="diagonal2"></span>
            <span className="inner">No media...</span>
        </PreviewContainer>
    }
}


function PreviewContainer({children, id, isEmpty = false}) {

    return <div
        key={id + "-mediaPreviewContainer"}
        className={"media-preview-container" + ( ( isEmpty ) ? " empty" : "" ) }
     >
        {children}
    </div>
}