import { 
    TextControl,
    Button,
    Dashicon
} from "@wordpress/components";
import { useState } from "@wordpress/element";
import { Attributes } from "../Static/Attributes";

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
    defaultValue = ( objectValue == '' && typeof defaultValue.value != 'undefined' ) ? defaultValue.value : null

    const MyTextControl = ( props ) => {

        const [ hasDefaultOverlay, hideOverlay ] = useState( props.defaultValue != null );
        const valueToDisplay = ( hasDefaultOverlay ) ? props.defaultValue : objectValue

        return <>
            <TextControl
                key={id}
                label={label}
                type={ !! isNumber ? "number" : "text" }
                value={valueToDisplay}
                onChange={(newValue) =>
                    Attributes.updateAttributes(
                        keys,
                        valueProp,
                        newValue,
                        false,
                        componentInstance
                    )
                }
                onBlur={(e) => {
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

    return <MyTextControl defaultValue={defaultValue} />
}
