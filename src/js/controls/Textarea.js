import { 
    TextareaControl,
    Button,
    Dashicon
} from "@wordpress/components";
import { useState } from "@wordpress/element";
import { Attributes } from "../Static/Attributes";

export function renderTextarea(
    componentInstance,
    id,
    label,
    keys,
    valueProp,
    objectValue,
    required = false,
    defaultValue = null
) {

    const StatedControl = ( props ) => {

        const [ value, setValue ] = useState( props.value );
        const [ editMode, setEditMode ] = useState( ( props.value != null || typeof defaultValue?.value == 'undefined' ) );

        const valueToDisplay = ( editMode ) ? ( value != null ) ? value : '' : defaultValue.value
        const needUpdate = ( value != props.value );

        return <>
            <TextareaControl
                key={id}
                label={label}
                value={valueToDisplay}
                onChange={(newValue) => {
                    setValue( newValue );
                }}
            />
            { editMode && needUpdate &&
                <div key={id + "submitChangesContainer"} className="submit-changes-container">
                    <Button
                        key={id + "submitChangesContainer-button"}
                        onMouseDown={ () => props.onSubmitChanges(value) }
                        variant="primary"
                    >
                        <Dashicon icon="saved" /> Save changes
                    </Button>
                </div>
            }
            { ! editMode &&
                <div key={id + "defaultOverlayContainer"} className="default-overlay-container">
                    <Button
                        key={id + "defaultOverlayContainer-button"}
                        onMouseDown={ () => { setEditMode(true) } }
                        variant="primary"
                    >
                        <Dashicon icon="edit" /> Override default value
                    </Button>
                </div>
            }
        </>
    };

    const submitChanges = ( newValue ) => {

        Attributes.updateAttributes(
            keys,
            valueProp,
            newValue,
            false,
            componentInstance
        );
        componentInstance.updatePreview();
    };

    return <StatedControl value={objectValue} onSubmitChanges={submitChanges} />
}
