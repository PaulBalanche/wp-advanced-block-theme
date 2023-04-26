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
    required = false,
    defaultValue = null
) {

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

            let label = option.name;
            let disabled = false;

            if( defaultValue?.value?.length ) {

                for( var i in defaultValue.value ) {
                    if( typeof defaultValue.value[i] == 'object' && defaultValue.value[i].value == option.value ) {
                        label += ' (default)';
                        isChecked = true;
                        disabled = true;
                        break;
                    }
                }
            }

            return <CheckboxControl
                key={id + "-" + option.value}
                label={label}
                help={null}
                checked={isChecked}
                disabled={disabled}
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
                    );
                    componentInstance.updatePreview();
                }}
            />
        } ) }
    </Fragment>
}
