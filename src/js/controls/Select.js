import { SelectControl } from "@wordpress/components";

import { Attributes } from "../Static/Attributes";

export function renderSelect(
    componentInstance,
    id,
    label,
    options,
    keys,
    valueProp,
    objectValue,
    required = false,
    defaultValue = null
) {

    if (typeof options == "undefined" || options == null) return null;

    const defaultLabel = ( defaultValue?.value?.length ) ? "Default" : '--';

    return (
        <SelectControl
            key={id}
            label={label}
            value={objectValue}
            options={[{ label: defaultLabel, value: "" }].concat(
                options.map(function (value) {

                    let currentLabel = value.name;

                    if( defaultValue?.value?.length ) {

                        for( var i in defaultValue.value ) {
                            if( typeof defaultValue.value[i] == 'object' && defaultValue.value[i].value == value.value ) {
                                currentLabel += ' (default)';
                                break;
                            }
                        }
                    }

                    return { label: currentLabel, value: value.value };
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
