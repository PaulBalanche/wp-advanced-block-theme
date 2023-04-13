import { MediaPlaceholder } from "@wordpress/block-editor";

import { Button, RadioControl, TextControl, Dashicon } from "@wordpress/components";
import { withState } from "@wordpress/compose";
import { Attributes } from "../Static/Attributes";
import { Render } from "../Static/Render";

export function renderImage(
    componentInstance,
    args,
    id,
    label,
    keys,
    valueProp,
    objectValue,
    required = false
) {
    label = label && required ? label + "*" : label;

    const preview = (typeof objectValue == "object" && objectValue.url) ?
        <div
            key={id + "-mediaPreviewContainer"}
            className="media-preview-container"
        >
            <img
                key={id + "-imagePreview"}
                alt="Edit image"
                title="Edit image"
                className="edit-image-preview"
                src={objectValue.url}
            />
            <Button
                key={id + "-removeMedia"}
                variant="primary"
                className="reset-button is-destructive"
                onMouseDown={() => {
                    Attributes.updateAttributes(
                        keys,
                        valueProp,
                        undefined,
                        false,
                        componentInstance
                    );
                }}
            >
                <Dashicon icon="trash" />
            </Button>
        </div>
        :
        <div
            key={id + "-mediaPreviewContainer"}
            className="media-preview-container empty"
            >
                <span className="diagonal1"></span>
                <span className="diagonal2"></span>
                <span className="inner">No image...</span>
        </div>

    // MediaPlaceholder labels
    let labels = {
        title: null
    };
    if (
        args.instructions &&
        typeof args.instructions == "object" &&
        args.instructions
    ) {
        labels.instructions = args.instructions;
    }

    return Render.fieldContainer(
        id + "_image",
        <MediaPlaceholder
            key={id + "-MediaPlaceholder"}
            onSelect={(value) => {
                let newValue = undefined;

                if (typeof value.id != "undefined") {
                    newValue = {
                        id: value.id,
                        url: value.url,
                    };
                }

                if (
                    typeof newValue != "undefined" &&
                    (typeof newValue != "object" ||
                        Object.keys(newValue).length > 0)
                )
                    Attributes.updateAttributes(
                        keys,
                        valueProp,
                        newValue,
                        false,
                        componentInstance
                    );
            }}
            value={objectValue ? objectValue : false}
            disableDropZone={true}
            labels={labels}
        >
            {preview}
        </MediaPlaceholder>,
        'image'
    )
    // return Render.panelComponent(id, label, mediaControl, false);
}
