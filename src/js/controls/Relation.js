import { SelectControl } from "@wordpress/components";

import { Attributes } from "../Static/Attributes";

export function renderRelation(
    componentInstance,
    id,
    label,
    entity,
    keys,
    valueProp,
    objectValue,
    required = false
) {
    if (
        typeof entity == "undefined" ||
        typeof componentInstance.props.relations[entity] == "undefined" ||
        componentInstance.props.relations[entity] == null ||
        Object.keys(componentInstance.props.relations[entity]).length == 0
    )
        return null;

    label = required && label != null ? label + "*" : label;

    return <SelectControl
        key={id}
        label={label}
        value={objectValue}
        help={"Choose an item inside " + entity + " post type"}
        options={componentInstance.props.relations[entity].map(function (value) {
            return { label: value.title.raw, value: value.id };
        })}
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
}
