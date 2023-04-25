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
    required = false,
    defaultValue = null
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
            placeholder={ ( defaultValue != null && typeof defaultValue == 'object' ) ? defaultValue.value : null }
        />
    );
}
