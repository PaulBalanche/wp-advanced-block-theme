import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { Button, Dashicon } from "@wordpress/components";
import { useState } from "@wordpress/element";

export function MediaPreview({id, value, onChange, multiple = false}) {

    const [preview, setPreview] = useState( null );

    function fetchMedia() {

        const queryParams = { include: [value] };

        apiFetch( { path: addQueryArgs('/wp/v2/media', queryParams) } ).then( ( posts ) => {

            console.log(posts);
            if( typeof posts == 'object' && posts != null && typeof posts.media_type != undefined ) {

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

            // const countColumns = ( objectValue.length > 5 ) ? 5 : objectValue.length;
            // const preview = ( objectValue && typeof objectValue == "object" && objectValue.length > 0 ) ?
            //     <div
            //         key={id + "-mediaPreviewContainer"}
            //         className="media-preview-container"
            //     >
            //         <figure
            //             key={id + "-galleryImagefigure"}
            //             className={"wp-block-gallery columns-" + countColumns}
            //         >
            //             <ul
            //                 key={id + "-galleryImageContainerUl"}
            //                 className="blocks-gallery-grid"
            //             >
            //                 { objectValue.map((image) => {
            //                     return <li
            //                         key={id + "-galleryImageContainerLi" + image.id}
            //                         className="blocks-gallery-item"
            //                     >
            //                         <img
            //                             key={id + "-galleryImage_" + image.id}
            //                             src={image.url}
            //                         />
            //                     </li>
            //                 }) }
            //             </ul>
            //         </figure>
            //     </div>
        } );
    }

    if( value && ( Number.isInteger(value) || ( value != null && typeof value != 'object' ) ) ) {

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