import { 
    TextControl,
    Button,
    Dashicon
} from "@wordpress/components";
import { useState } from "@wordpress/element";
import { Attributes } from "../Static/Attributes";
import { StatedControl } from "../controls/StatedControl";

export function renderText(
    componentInstance,
    id,
    label,
    keys,
    valueProp,
    objectValue,
    isNumber = false,
    defaultValue = null
) {

    const valueToDisplay = ( objectValue != null || typeof defaultValue?.value == 'undefined'  ) ? ( objectValue != null ) ? objectValue : '' : defaultValue.value

    return <StatedControl
        key={id}
        keys={keys}
        valueProp={valueProp}
        defaultValue={defaultValue}
        componentInstance={componentInstance}
        value={objectValue}
    >
        <TextControl
            key={id}
            label={label}
            type={ !! isNumber ? "number" : "text" }
            value={valueToDisplay}
            onChange={(newValue) => {
                setValue( newValue );
            }}
        />
    </StatedControl>
}
