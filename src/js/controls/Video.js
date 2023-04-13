import { MediaPlaceholder } from "@wordpress/block-editor";

import { Button, RadioControl, TextControl, Dashicon } from "@wordpress/components";
import { withState } from "@wordpress/compose";
import { Attributes } from "../Static/Attributes";
import { Render } from "../Static/Render";

export function renderVideo(
    componentInstance,
    args,
    id,
    label,
    keys,
    valueProp,
    objectValue,
    required = false
) {
    const typeVideoPanel = [];

    // File
    if( typeof args.file == 'undefined' || !! args.file ) {

        let preview = false;
        if (
            objectValue &&
            objectValue.file &&
            typeof objectValue.file == "object"
        ) {
            preview = (
                <>
                    <img
                        key={id + "-filePreview"}
                        alt="Edit file"
                        title="Edit file"
                        className="edit-file-preview"
                        src={objectValue.file.preview}
                    />
                    <div key={id + "-fileDetails"} className="file-details">
                        {objectValue.file.name}
                        <br />
                        {objectValue.file.mime}
                        <br />
                        {Attributes.fileSizeFormat(objectValue.file.size)}
                    </div>
                </>
            );

            preview = (
                <div
                    key={id + "-mediaPreviewContainer"}
                    className="media-preview-container"
                >
                    {preview}
                    <Button
                        key={id + "-removeMedia"}
                        isSecondary
                        isSmall
                        className="reset-button"
                        onMouseDown={() =>
                            Attributes.updateAttributes(
                                keys.concat("file"),
                                valueProp,
                                undefined,
                                false,
                                componentInstance
                            )
                        }
                    >
                        Remove
                    </Button>
                </div>
            );
        }
        
        const file = Render.fieldContainer(
            id + "_file",
            <MediaPlaceholder
                key={id + "-MediaPlaceholder"}
                onSelect={(value) => {
                    let newValue = undefined;
                    if (typeof value.id != "undefined") {
                        newValue = {
                            id: value.id,
                            preview: value.icon,
                            name: value.filename,
                            mime: value.mime,
                            size: value.filesizeInBytes,
                        };
                    }

                    if (
                        typeof newValue != "undefined" &&
                        (typeof newValue != "object" ||
                            Object.keys(newValue).length > 0)
                    ) {
                        Attributes.updateAttributes(
                            keys.concat("file"),
                            valueProp,
                            newValue,
                            false,
                            componentInstance
                        );
                    }
                }}
                value={
                    objectValue && objectValue.file
                        ? objectValue.file
                        : false
                }
                disableDropZone={true}
                labels={{
                    title: null,
                    instructions: null
                }}
            >
                {preview}
            </MediaPlaceholder>
        );

        typeVideoPanel.push({
            name: 'file',
            title: 'File',
            content: file
        })
    }
    else {
        typeVideoPanel.push({
            name: 'file',
            title: 'File',
            content: null,
            disabled: true
        })
    }

    
    // Embed
    if( typeof args.embed == 'undefined' || !! args.embed ) {
        typeVideoPanel.push({
            name: 'embed',
            title: 'Embed',
            content: Render.fieldContainer(
                id + "_embed",
                <TextControl
                    key={id + "-embedLink"}
                    label={"Embed link"}
                    type={"text"}
                    value={
                        objectValue && objectValue.embed
                            ? objectValue.embed
                            : ""
                    }
                    onChange={(newValue) =>
                        Attributes.updateAttributes(
                            keys.concat("embed"),
                            valueProp,
                            newValue,
                            false,
                            componentInstance
                        )
                    }
                />
            )
        })
    }
    else {
        typeVideoPanel.push({
            name: 'embed',
            title: 'Embed',
            content: null,
            disabled: true
        })
    }

    return <>
        <div>Upload a media file or pick one from your media library.</div>
        { Render.tabPanelComponent(
            id + '-videoType',
            typeVideoPanel,
            function (typeVideoPanel) {
                return typeVideoPanel.content;
            },
            null,
            null,
            'videoType'
        ) }
    </>

    return imageVideoControl;
}
