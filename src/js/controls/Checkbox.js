import { CheckboxControl } from "@wordpress/components";

export function Checkbox({id, label, options, value, onChange}) {

    return <>
        <label key={id + "-label"} className="components-base-control__forced_label">{label}</label>
        { options.map( (option) => {

            let isChecked = false;
            if( value != null && typeof value == 'object' ) {
                value.forEach(element => {
                    if( element.value == option.value ) {
                        isChecked = true;
                        return;
                    }
                });
            }

            return <CheckboxControl
                key={id + "-checkbox-" + option.value}
                label={option.name}
                help={null}
                checked={isChecked}
                onChange={ (checked) => {

                    const newObjectValue = [];

                    if( checked ) {
                        
                        if( value != null && typeof value == 'object' ) {
                            value.forEach(element => {
                                newObjectValue.push(element);
                            });
                        }
                        newObjectValue.push( { value: option.value } );
                    }
                    else {
                        if( value != null && typeof value == 'object' ) {

                            value.forEach(element => {
                                if( element.value != option.value ) {
                                    newObjectValue.push(element);
                                }
                            });
                        }
                    }

                    onChange(newObjectValue);
                }}
            />
        } ) }
    </>
}
