import {
    ToggleControl,
    Button,
    Dashicon
} from "@wordpress/components";
import { Fragment, useState } from "@wordpress/element";
import { Attributes } from "../Static/Attributes";

export function renderToggle(
    componentInstance,
    id,
    label,
    help,
    keys,
    valueProp,
    objectValue,
    defaultValue
) {
    defaultValue = ( typeof objectValue != 'boolean' && typeof defaultValue.value != 'undefined' ) ? defaultValue.value : null

    const MyToggleControl = ( props ) => {

        const [ hasDefaultOverlay, hideOverlay ] = useState( props.defaultValue != null );
        const valueToDisplay = ( hasDefaultOverlay ) ? props.defaultValue : objectValue
        const labelToggleControl = ( typeof help == "object" && Array.isArray(help) && help.length == 2 ) ? !!valueToDisplay ? help[1] : help[0] : null;

        return <>
            <ToggleControl
                key={id}
                label={labelToggleControl}
                checked={valueToDisplay}
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
            { hasDefaultOverlay &&
                <div key={id + "defaultContainer"} className="default-overlay-container">
                    <Button
                        key={id + "defaultContainer-button"}
                        onMouseDown={ () => { hideOverlay( ( state ) => ! state ) } }
                        variant="primary"
                    >
                        <Dashicon icon="edit" /> Override default value
                    </Button>
                </div>
            }
        </>
    };
    return <Fragment key={id + "-fragment"}>
            <label className="components-base-control__forced_label" key={id + "-label"}>{label}</label>
           <MyToggleControl defaultValue={defaultValue} />
    </Fragment>
}
