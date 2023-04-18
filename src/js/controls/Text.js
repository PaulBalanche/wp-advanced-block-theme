import { TextControl } from "@wordpress/components";

import { Attributes } from "../Static/Attributes";

export function renderText(
    componentInstance,
    id,
    label,
    keys,
    valueProp,
    objectValue,
    isNumber = false,
    required = false
) {

    return (
        <TextControl
            key={id}
            label={label}
            type={ !! isNumber ? "number" : "text" }
            value={objectValue}
            onChange={(newValue) =>
                Attributes.updateAttributes(
                    keys,
                    valueProp,
                    newValue,
                    false,
                    componentInstance
                )
            }
            onBlur={(e) => {
                componentInstance.updatePreview();
            }}
        />
    );
}
