import { MediaPlaceholder } from "@wordpress/block-editor";

import { Button, Dashicon } from "@wordpress/components";

import { Attributes } from "../Static/Attributes";
import { Render } from "../Static/Render";

export function renderGallery(
    componentInstance,
    id,
    label,
    keys,
    valueProp,
    objectValue,
    required = false
) {
    label = label && required ? label + "*" : label;
    
    const countColumns = ( objectValue.length > 5 ) ? 5 : objectValue.length;
    const preview = ( objectValue && typeof objectValue == "object" && objectValue.length > 0 ) ?
        <div
            key={id + "-mediaPreviewContainer"}
            className="media-preview-container"
        >
            <figure
                key={id + "-galleryImagefigure"}
                className={"wp-block-gallery columns-" + countColumns}
            >
                <ul
                    key={id + "-galleryImageContainerUl"}
                    className="blocks-gallery-grid"
                >
                    { objectValue.map((image) => {
                        return <li
                            key={id + "-galleryImageContainerLi" + image.id}
                            className="blocks-gallery-item"
                        >
                            <img
                                key={id + "-galleryImage_" + image.id}
                                src={image.url}
                            />
                        </li>
                    }) }
                </ul>
            </figure>
        </div>
        :
        <div
            key={id + "-mediaPreviewContainer"}
            className="media-preview-container empty"
            >
                <span className="diagonal1"></span>
                <span className="diagonal2"></span>
                <span className="inner">No image...</span>
        </div>;


// onMouseDown={() => {
//     componentInstance.setAttributes({
//         [keys]: objectValue.slice(
//             0,
//             objectValue.length - 1
//         ),
//     });
// }}


    let inner = Render.fieldContainer(
        id + "_file",
        <MediaPlaceholder
            key={id}
            onSelect={(value) => {

                let stopFunction = false;
                let newValue = [];
                value.forEach((image) => {

                    if (typeof image.id == "undefined") {
                        stopFunction = true;
                        return false;
                    }

                    newValue.push({
                        id: image.id,
                        url: image.url,
                    });
                });
                
                if( stopFunction ) {
                    return false;
                }

                if( typeof newValue != "undefined" &&
                    (typeof newValue != "object" || Object.keys(newValue).length > 0)
                )
                    Attributes.updateAttributes(
                        keys,
                        valueProp,
                        newValue,
                        false,
                        componentInstance
                    );
                    componentInstance.updatePreview();
            }}
            multiple={true}
            addToGallery={true}
            value={objectValue}
            disableDropZone={true}
            labels={{
                title: null
            }}
        >
            {preview}
        </MediaPlaceholder>
    );

    return inner;
    // return Render.panelComponent(id, label, inner, false);
}
