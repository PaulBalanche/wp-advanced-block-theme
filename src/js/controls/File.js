import { MediaPlaceholder } from "@wordpress/block-editor";

import { Button, Dashicon } from "@wordpress/components";

import { Attributes } from "../Static/Attributes";
import { Render } from "../Static/Render";

export function renderFile(
    componentInstance,
    id,
    label,
    keys,
    valueProp,
    objectValue,
    required = false
) {
    label = label && required ? label + "*" : label;

    const preview = ( objectValue && typeof objectValue == "object" ) ?
        <div
            key={id + "-mediaPreviewContainer"}
            className="media-preview-container"
        >
            <img
                key={id + "-filePreview"}
                alt="Edit file"
                title="Edit file"
                className="edit-file-preview"
                src={objectValue.preview}
            />
            <div key={id + "-fileDetails"} className="file-details">
                {objectValue.name}
                <br />
                {objectValue.mime}
                <br />
                {Attributes.fileSizeFormat(objectValue.size)}
            </div>
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
                    componentInstance.updatePreview();
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
                <span className="inner">No file...</span>
        </div>

    let inner = Render.fieldContainer(
        id + "_file",
        <MediaPlaceholder
            key={id}
            onSelect={(value) => {
                let newValue = undefined;

                if (typeof value.id != "undefined") {
                    newValue = {
                        id: value.id,
                        preview: value.icon,
                        name: value.filename,
                        mime: value.mime,
                        size: value.filesizeInBytes
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
                    componentInstance.updatePreview();
            }}
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
