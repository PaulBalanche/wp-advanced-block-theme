import { useState } from "@wordpress/element";

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

    // const [value, setValue] = useState( props.value );

    function onChange(newValue) {
        // setValue(newValue);
        props.onChange(newValue);
    }

    function render() {

        switch( props.type ) {
            
            case "string":
            case "number":
            case "integer":
                return <Text
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    type={ !! props.args.isNumber ? "number" : "text" }
                    value={ ( props.value != null ) ? props.value : '' }
                    onChange={ (newValue) => onChange(newValue) }
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
                    value={ ( props.value != null ) ? props.value : undefined }
                    onChange={ (newValue) => onChange(newValue) }
                />
                break;
            
            case "checkbox":
                return <Checkbox
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    options={props.args.options}
                    value={ props.value }
                    onChange={ (newValue) => onChange(newValue) }
                />
                break;

            case "boolean":
            case "switch":
                return <Toggle
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    help={props.args.help}
                    value={ ( props.value != null ) ? props.value : false }
                    onChange={ (newValue) => onChange(newValue) }
                />
                break;

            case "date":
            case "datetime":
                return <DateTime
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    type={props.args.type}
                    value={ props.value }
                    onChange={ (newValue) => onChange(newValue) }
                />
                break;

            case "image":
            case "file":
                return <File
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    value={ ( props.value != null ) ? props.value : undefined }
                    onChange={ (newValue) => onChange(newValue) }
                />
                break;

            case "gallery":
                return <File
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    value={ ( props.value != null ) ? props.value : undefined }
                    multiple={true}
                    onChange={ (newValue) => onChange(newValue) }
                />
                break;

            case "video":
                return <Video
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    value={ ( props.value != null ) ? props.value : undefined }
                    onChange={ (newValue) => onChange(newValue) }
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
                    onChange={ (newValue) => onChange(newValue) }
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
                    objectValue={ ( props.value != null ) ? props.value : '' }
                    componentInstance={props.componentInstance}
                />
                break;

            case "text":
                return <Textarea
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    value={ ( props.value != null ) ? props.value : '' }
                    onChange={ (newValue) => onChange(newValue) }
                />
                break;

            case "link":
                return <Link
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    value={ props.value }
                    onChange={ (newValue) => onChange(newValue) }
                />
                break;

            case "radio":
                return <Radio
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    options={props.args.options}
                    value={ props.value }
                    onChange={ (newValue) => onChange(newValue) }
                />
                break;

            case "relation":
                return <Relation
                    key={props.id}
                    id={props.id}
                    label={props.label}
                    entity={props.args.entity}
                    relations={props.componentInstance.props.relations[props.args.entity]}
                    value={ ( props.value != null ) ? props.value : undefined }
                    onChange={ (newValue) => onChange(newValue) }
                />
                break;
        }

        return null;
    }
    
    return render();
}