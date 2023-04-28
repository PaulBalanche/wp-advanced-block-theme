import { TextControl } from "@wordpress/components";

export function Text({id, label, type, value, onChange}) {

    return <TextControl
        key={id}
        label={label}
        type={type}
        value={value}
        onChange={(newValue) => onChange(newValue)}
    />
}
