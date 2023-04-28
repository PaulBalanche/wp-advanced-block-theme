import { DateTimePicker, TimePicker, DatePicker } from "@wordpress/components";

export function DateTime({id, label, value, type, onChange}) {

    switch( type ) {

        case 'date' :
            return <DatePicker
                key={id}
                currentDate={value}
                onChange={(newValue) => onChange(newValue)}
                __nextRemoveHelpButton
                __nextRemoveResetButton
            />
            break;

        case 'time':
            return <TimePicker
                key={id}
                currentDate={value}
                onChange={(newValue) => onChange(newValue)}
                is12Hour={false}
                __nextRemoveHelpButton
                __nextRemoveResetButton
            />
            break;

        default:
            return <DateTimePicker
                key={id}
                currentDate={value}
                onChange={(newValue) => onChange(newValue)}
                is12Hour={false}
                __nextRemoveHelpButton
                __nextRemoveResetButton
            />
            break;
    }
}
