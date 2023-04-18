import { TextareaControl } from "@wordpress/components";

import { Attributes } from "../Static/Attributes";

export function renderTextarea(
    componentInstance,
    id,
    label,
    keys,
    valueProp,
    objectValue,
    required = false
) {

    return (
        <TextareaControl
            key={id}
            label={label}
            value={objectValue}
            onChange={(newValue) => {
                Attributes.updateAttributes(
                    keys,
                    valueProp,
                    newValue,
                    false,
                    componentInstance
                );
            }}
            onBlur={(e) => {
                componentInstance.updatePreview();
            }}
        />
    );
}
