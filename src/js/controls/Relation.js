import { SelectControl } from "@wordpress/components";

export function Relation({id, label, entity, relations, value, onChange}) {

    if (
        typeof entity == "undefined" ||
        typeof relations == "undefined" ||
        relations == null ||
        Object.keys(relations).length == 0
    ) {
        return null;
    }


    return <SelectControl
        key={id}
        label={label}
        value={value}
        help={"Choose an item inside " + entity + " post type"}
        options={relations.map(function (value) {
            return { label: value.title.raw, value: value.id };
        })}
        onChange={(newValue) => onChange(newValue)}
    />
}
