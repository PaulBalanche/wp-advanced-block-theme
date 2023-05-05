import { SelectControl } from "@wordpress/components";

export function Select({id, label, options, value, onChange}) {

    if( typeof options == "undefined" || options == null) return null;

    return <SelectControl
        key={id}
        label={label}
        value={value}
        options={[{ label: "--Please choose an option--", value: "" }].concat(
            options.map(function (value) {
                return { label: value.name, value: value.value };
            })
        )}
        onChange={(newValue) => onChange(newValue)}
    />
}