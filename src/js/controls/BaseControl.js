import { useState } from "@wordpress/element";
import { 
    Button,
    Dashicon
} from "@wordpress/components";

import { Text } from "./Text";
import { Select } from "./Select";
import { Checkbox } from "./Checkbox";
import { Toggle } from "./Toggle";
import { DateTime } from "./DateTime";
import { File } from "./File";
import { Video } from "./Video";
import { PropsObject } from "./PropsObject";

export function BaseControl(props) {

    const [value, setValue] = useState( props.value );
    const [editMode, setEditMode] = useState( ( props.value != null || typeof props.defaultValue?.value == 'undefined' ) );
    const [needUpdate, setNeedUpdate] = useState( false );

    function submitChanges(){

        setNeedUpdate(false);
        props.onSubmit(value);
    }

    function renderSavedButton() {

        return ( editMode && needUpdate ) ?
            <div key={props.id + "submitChangesContainer"} className="submit-changes-container">
                <Button
                    key={props.id + "submitChangesContainer-button"}
                    onMouseDown={ () => submitChanges() }
                    variant="primary"
                >
                    <Dashicon icon="saved" /> Save changes
                </Button>
            </div>
        : null;
    }
    
    function renderDefaultValueOverlay() {

        return ( ! editMode ) ?
            <div key={props.id + "defaultOverlayContainer"} className="default-overlay-container">
                <Button
                    key={props.id + "defaultOverlayContainer-button"}
                    onMouseDown={ () => { setEditMode(true) } }
                    variant="primary"
                >
                    <Dashicon icon="edit" /> Override default value
                </Button>
            </div>
        : null;
    }

    function controlOnChange(newValue) {
        setValue(newValue);
        setNeedUpdate(true);
    }

    function renderControl() {

        switch( props.type ) {
            
            case "string":
            case "number":
            case "integer":
                return <Text
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    type={ !! props.args.isNumber ? "number" : "text" }
                    value={ ( editMode ) ? ( value != null ) ? value : '' : props.defaultValue.value }
                    onChange={ (newValue) => controlOnChange(newValue) }
                />
                break;

            case "select":
            case "color":
            case "spaces":
                return <Select
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    options={props.args.options}
                    value={ ( editMode ) ? ( value != null ) ? value : null : props.defaultValue.value }
                    onChange={ (newValue) => controlOnChange(newValue) }
                />
                break;
            
            case "checkbox":
                return <Checkbox
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    options={props.args.options}
                    value={ ( editMode ) ? ( value != null ) ? value : null : props.defaultValue.value }
                    onChange={ (newValue) => controlOnChange(newValue) }
                />
                break;

            case "boolean":
            case "switch":
                return <Toggle
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    help={props.args.help}
                    value={ ( editMode ) ? ( value != null ) ? value : false : props.defaultValue.value }
                    onChange={ (newValue) => controlOnChange(newValue) }
                />
                break;

            case "date":
            case "datetime":
                return <DateTime
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    type={props.args.type}
                    value={ ( editMode ) ? ( value != null ) ? value : null : props.defaultValue.value }
                    onChange={ (newValue) => controlOnChange(newValue) }
                />
                break;

            case "image":
            case "file":
                return <File
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    value={ ( editMode ) ? ( value != null ) ? value : undefined : props.defaultValue.value }
                    onChange={ (newValue) => controlOnChange(newValue) }
                />
                break;

            case "video":
                return <Video
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    value={ ( editMode ) ? ( value != null ) ? value : undefined : props.defaultValue.value }
                    onChange={ (newValue) => controlOnChange(newValue) }
                />
                break;

            case "object":
                return <PropsObject
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    keys={props.keys}
                    valueProp={props.valueProp}
                    props={props.args.props}
                    onChange={ (newValue) => controlOnChange(newValue) }
                    componentInstance={props.componentInstance}
                />
                break;
        }

        return null;
    }

    return <>
        {renderControl()}
        {renderSavedButton()}
        {renderDefaultValueOverlay()}
    </>
}