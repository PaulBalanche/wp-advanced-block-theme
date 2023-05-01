import { useState } from "@wordpress/element";
import { 
    Button,
    Dashicon
} from "@wordpress/components";

import { Render } from '../Static/Render';

import { Checkbox } from "./Checkbox";
import { DateTime } from "./DateTime";
import { File } from "./File";
import { Link } from "./Link";
import { PropsObject } from "./PropsObject";
import { Radio } from "./Radio";
import { Relation } from "./Relation";
import { Select } from "./Select";
import { Text } from "./Text";
import { Textarea } from "./Textarea";
import { Toggle } from "./Toggle";
import { Video } from "./Video";
import WysiwygControl from "./WysiwygControl/WysiwygControl";


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
                    value={ ( editMode ) ? ( value != null ) ? value : undefined : props.defaultValue.value }
                    onChange={ (newValue) => controlOnChange(newValue) }
                />
                break;
            
            case "checkbox":
                return <Checkbox
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    options={props.args.options}
                    value={ ( editMode ) ? value : props.defaultValue.value }
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
                    value={ ( editMode ) ? value : props.defaultValue.value }
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

            case "gallery":
                return <File
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    value={ ( editMode ) ? ( value != null ) ? value : undefined : props.defaultValue.value }
                    multiple={true}
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

            case "richText":
            case "wysiwyg":
                return <WysiwygControl
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    keys={props.keys}
                    valueProp={props.valueProp}
                    objectValue={ ( value != null ) ? value : '' }
                    componentInstance={props.componentInstance}
                />
                break;

            case "text":
                return <Textarea
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    value={ ( editMode ) ? ( value != null ) ? value : '' : props.defaultValue.value }
                    onChange={ (newValue) => controlOnChange(newValue) }
                />
                break;

            case "link":
                return <Link
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    value={ ( editMode ) ? value : props.defaultValue.value }
                    onChange={ (newValue) => controlOnChange(newValue) }
                />
                break;

            case "radio":
                return <Radio
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    options={props.args.options}
                    value={ ( editMode ) ? value : props.defaultValue.value }
                    onChange={ (newValue) => controlOnChange(newValue) }
                />
                break;

            case "relation":
                return <Relation
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    entity={props.args.entity}
                    relations={props.componentInstance.props.relations[props.args.entity]}
                    value={ ( editMode ) ? ( value != null ) ? value : undefined : props.defaultValue.value }
                    onChange={ (newValue) => controlOnChange(newValue) }
                />
                break;
        }

        return null;
    }

    function getContainerClass() {

        const className = [];
        if( props.error && props.error != null && typeof props.error == 'object' ) {
            if( typeof props.error.error != 'undefined' ) {
                className.push('has-error')
            }
            else if( typeof props.error.warning != 'undefined' ) {
                className.push('has-warning')
            }
        }

        if( needUpdate ) {
            className.push('updating');
        }

        return ( className.length > 0 ) ? className.join(' ') : '';
    }

    function render() {

        const inner = <>
            {renderControl()}
            {renderSavedButton()}
            {renderDefaultValueOverlay()}
        </>

        if( props.label == null ) {
            return inner;
        }
    
        return Render.fieldContainer( props.id, inner, getContainerClass() );
    }
    
    return render();
}