import { SelectControl } from "@wordpress/components";

import { Attributes } from "../Static/Attributes";

export function renderSelect(
    componentInstance,
    id,
    label,
    options,
    defaultValue,
    keys,
    valueProp,
    objectValue,
    required = false
) {
    if (typeof options == "undefined") return null;

    label = required && label != null ? label + "*" : label;

    const defaultLabel =
        defaultValue != null ? "Default (" + defaultValue + ")" : "Default";

    return (
        <SelectControl
            key={id}
            label={label}
            value={objectValue}
            options={[{ label: defaultLabel, value: "" }].concat(
                options.map(function (value) {
                    return { label: value.name, value: value.value };
                })
            )}
            onChange={(newValue) => {
                Attributes.updateAttributes(
                    keys,
                    valueProp,
                    newValue,
                    false,
                    componentInstance
                );
                componentInstance.updatePreview();
            }}
        />
    );
}
