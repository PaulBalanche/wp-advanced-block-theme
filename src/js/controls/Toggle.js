import { ToggleControl } from "@wordpress/components";

import { Attributes } from "../Static/Attributes";

export function renderToggle(
    componentInstance,
    id,
    label,
    help,
    keys,
    valueProp,
    objectValue,
    required = false
) {
    label = required && label != null ? label + "*" : label;

    return <>
        <label className="components-base-control__forced_label">{label}</label>
        <ToggleControl
            key={id}
            label={
                typeof help == "object" &&
                Array.isArray(help) &&
                help.length == 2
                    ? !!objectValue
                        ? help[1]
                        : help[0]
                    : null
            }
            checked={objectValue}
            onChange={(newValue) =>
                Attributes.updateAttributes(
                    keys,
                    valueProp,
                    newValue,
                    false,
                    componentInstance
                )
            }
        />
    </>;
}
