import { RadioControl } from "@wordpress/components";

import { withState } from "@wordpress/compose";
import { Attributes } from "../Static/Attributes";

import { useState } from '@wordpress/element';

export function renderRadio(
    componentInstance,
    id,
    label,
    options,
    keys,
    valueProp,
    objectValue,
    required = false
) {
    if (typeof options == "undefined") return null;

    label = required && label != null ? label + "*" : label;

    const MyRadioControl = <RadioControl
        key={id}
        label={label}
        selected={objectValue}
        options={options.map(function (value) {
            return { label: value.name, value: value.value.toString() };
        })}
        onChange={(newValue) => {
            Attributes.updateAttributes(
                keys,
                valueProp,
                newValue,
                false,
                componentInstance
            );
        }}
    />

    return (
        <div
            key={id + "-RadioControlComponentsBaseControl"}
            className="components-base-control"
        >
            <div
                key={id + "-RadioControlComponentsBaseControlField"}
                className="components-base-control__field"
            >
                <div
                    key={id + "-RadioControlContainer"}
                    className="radio-control-container"
                >
                    {MyRadioControl}
                </div>
            </div>
        </div>
    );
}
