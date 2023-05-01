import { Fragment } from "@wordpress/element";
import { DateTimePicker, TimePicker, DatePicker } from "@wordpress/components";

export function DateTime({id, label, value, type, onChange}) {

    let control = null;
    switch( type ) {

        case 'date' :
            control = <DatePicker
                key={id}
                currentDate={value}
                onChange={(newValue) => onChange(newValue)}
                __nextRemoveHelpButton
                __nextRemoveResetButton
            />
            break;

        case 'time':
            control = <TimePicker
                key={id}
                currentDate={value}
                onChange={(newValue) => onChange(newValue)}
                is12Hour={false}
                __nextRemoveHelpButton
                __nextRemoveResetButton
            />
            break;

        default:
            control = <DateTimePicker
                key={id}
                currentDate={value}
                onChange={(newValue) => onChange(newValue)}
                is12Hour={false}
                __nextRemoveHelpButton
                __nextRemoveResetButton
            />
            break;
    }

    return <Fragment key={id + "-fragment"}>
        <label className="components-base-control__forced_label" key={id + "-label"}>{label}</label>
        {control}
    </Fragment>
}