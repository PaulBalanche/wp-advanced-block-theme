import { MediaPlaceholder } from "@wordpress/block-editor";
import { Fragment } from "react";
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

    let initialTabName = null;

    // File
    if( typeof args.file == 'undefined' || !! args.file ) {

        const preview = ( objectValue && objectValue.file && typeof objectValue.file == "object" ) ?
            <div
                key={id + "-mediaPreviewContainer"}
                className="media-preview-container"
            >
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
                <Button
                    key={id + "-removeMedia"}
                    variant="primary"
                    className="reset-button is-destructive"
                    onMouseDown={() => {
                        Attributes.updateAttributes(
                            keys.concat("file"),
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
                    <span className="inner">No video...</span>
            </div>
        
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
                        componentInstance.updatePreview();
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
        });

        if( initialTabName == null && objectValue && objectValue.file ) {
            initialTabName = 'file';
        }
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
                    onChange={(newValue) => {
                        Attributes.updateAttributes(
                            keys.concat("embed"),
                            valueProp,
                            newValue,
                            false,
                            componentInstance
                        );
                        componentInstance.updatePreview();
                    }}
                />
            )
        });

        if( initialTabName == null && objectValue && objectValue.embed ) {
            initialTabName = 'embed';
        }
    }
    else {
        typeVideoPanel.push({
            name: 'embed',
            title: 'Embed',
            content: null,
            disabled: true
        })
    }

    return <Fragment key={id + "-fragment"}>
        <div key={id + "-instructions"}>Upload a media file or pick one from your media library.</div>
        { Render.tabPanelComponent(
            id + '-videoType',
            typeVideoPanel,
            function (typeVideoPanel) {
                return typeVideoPanel.content;
            },
            initialTabName,
            null,
            'videoType'
        ) }
    </Fragment>

    return imageVideoControl;
}
