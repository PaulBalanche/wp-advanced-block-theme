import { CheckboxControl } from "@wordpress/components";
import { Fragment } from "@wordpress/element";
import { Attributes } from "../Static/Attributes";

export function renderCheckbox(
    componentInstance,
    id,
    label,
    options,
    keys,
    valueProp,
    objectValue,
    required = false
) {
    label = required && label != null ? label + "*" : label;

    return <Fragment key={id + "-fragment"}>
        <label className="components-base-control__forced_label" key={id + "-label"}>{label}</label>
        { options.map( (option) => {

            let isChecked = false;
            if( typeof objectValue == 'object' ) {
                objectValue.forEach(element => {
                    if( element.value == option.value ) {
                        isChecked = true;
                        return;
                    }
                });
            }

            return <CheckboxControl
                key={id + "-" + option.value}
                label={option.name}
                help={null}
                checked={isChecked}
                onChange={(newValue) => {

                    const newObjectValue = [];

                    if( newValue ) {
                        
                        if( typeof objectValue != 'object' ) {
                            objectValue = [];
                        }
                        
                        objectValue.forEach(element => {
                            newObjectValue.push(element);
                        });
                        newObjectValue.push( { value: option.value } );
                    }
                    else {
                        if( typeof objectValue == 'object' ) {

                            objectValue.forEach(element => {
                                if( element.value != option.value ) {
                                    newObjectValue.push(element);
                                }
                            });
                        }
                    }

                    Attributes.updateAttributes(
                        keys,
                        valueProp,
                        newObjectValue,
                        false,
                        componentInstance
                    )
                } }
            />
        } ) }
    </Fragment>
}
