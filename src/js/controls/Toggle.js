import { Fragment } from "@wordpress/element";
import { ToggleControl } from "@wordpress/components";

export function Toggle({id, label, help, value, onChange}) {

    const labelToggleControl = ( typeof help == "object" && Array.isArray(help) && help.length == 2 ) ? !!value ? help[1] : help[0] : null;

    return <Fragment key={id + "-fragment"}>
        <label className="components-base-control__forced_label" key={id + "-label"}>{label}</label>
        <ToggleControl
            key={id}
            label={labelToggleControl}
            checked={value}
            onChange={(newValue) => onChange(newValue)}
        />
    </Fragment>
}
