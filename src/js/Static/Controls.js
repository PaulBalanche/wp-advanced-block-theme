import { renderDateTime } from "../Controls/DateTime";
import { renderFile } from "../Controls/File";
import { renderGallery } from "../Controls/Gallery";
import { renderImage } from "../Controls/Image";
import { renderVideo } from "../Controls/Video";
import { renderLink } from "../Controls/Link";
import { renderObject } from "../Controls/Object";
import { renderRadio } from "../Controls/Radio";
import { renderCheckbox } from "../Controls/Checkbox";
import { renderRelation } from "../Controls/Relation";
import { renderSelect } from "../Controls/Select";
import { renderText } from "../Controls/Text";
import { renderTextarea } from "../Controls/Textarea";
import { renderToggle } from "../Controls/Toggle";
import WysiwygControl from "../Controls/WysiwygControl/WysiwygControl";

export class Controls {
    static render(
        type,
        componentInstance,
        id,
        label,
        keys,
        valueProp,
        objectValue,
        required = false,
        args = {},
        error = false
    ) {
        switch (type) {
            case "date":
            case "datetime":
                return renderDateTime(
                    componentInstance,
                    id,
                    label,
                    keys,
                    valueProp,
                    objectValue,
                    required,
                    args.type
                );

            case "file":
                return renderFile(
                    componentInstance,
                    id,
                    label,
                    keys,
                    valueProp,
                    objectValue,
                    required
                );

            case "gallery":
                return renderGallery(
                    componentInstance,
                    id,
                    label,
                    keys,
                    valueProp,
                    objectValue,
                    required
                );

            case "image":
                return renderImage(
                    componentInstance,
                    args.args,
                    id,
                    label,
                    keys,
                    valueProp,
                    objectValue,
                    required
                );

            case "video":
                return renderVideo(
                    componentInstance,
                    args.args,
                    id,
                    label,
                    keys,
                    valueProp,
                    objectValue,
                    required
                );

            case "link":
                return renderLink(
                    componentInstance,
                    id,
                    label,
                    keys,
                    valueProp,
                    objectValue,
                    required
                );

            case "radio":
                return renderRadio(
                    componentInstance,
                    id,
                    label,
                    args.options,
                    keys,
                    valueProp,
                    objectValue,
                    required
                );
            
            case "checkbox":
                return renderCheckbox(
                    componentInstance,
                    id,
                    label,
                    args.options,
                    keys,
                    valueProp,
                    objectValue,
                    required
                );

            case "relation":
                return renderRelation(
                    componentInstance,
                    id,
                    label,
                    args.entity,
                    keys,
                    valueProp,
                    objectValue,
                    required
                );

            case "select":
            case "color":
            case "spaces":
                return renderSelect(
                    componentInstance,
                    id,
                    label,
                    args.options,
                    args.default,
                    keys,
                    valueProp,
                    objectValue,
                    required
                );

            case "string":
            case "number":
            case "integer":
                return renderText(
                    componentInstance,
                    id,
                    label,
                    keys,
                    valueProp,
                    objectValue,
                    args.isNumber,
                    required,
                    args.default
                );

            case "text":
                return renderTextarea(
                    componentInstance,
                    id,
                    label,
                    keys,
                    valueProp,
                    objectValue,
                    required,
                    args.default
                );

            case "boolean":
            case "switch":
                return renderToggle(
                    componentInstance,
                    id,
                    label,
                    args.help,
                    keys,
                    valueProp,
                    objectValue,
                    required
                );

            case "object":
                return renderObject(
                    componentInstance,
                    id,
                    label,
                    keys,
                    valueProp,
                    args.props,
                    typeof args.initialOpen != "undefined"
                        ? args.initialOpen
                        : false,
                    required,
                    error
                );

            case "richText":
            case "wysiwyg":
                return (
                    <WysiwygControl
                        key={id + "-WysiwygControl"}
                        id={id}
                        label={label}
                        keys={keys}
                        valueProp={valueProp}
                        objectValue={objectValue}
                        required={required}
                        componentInstance={componentInstance}
                    />
                );
        }
    }
}
