import { TextareaControl } from "@wordpress/components";

export function Textarea({id, label, value, onChange}) {

    return <TextareaControl
        key={id}
        label={label}
        value={value}
        onChange={(newValue) => onChange(newValue)}
    />
}
