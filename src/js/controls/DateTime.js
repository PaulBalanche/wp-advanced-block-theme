import { DateTimePicker, TimePicker, DatePicker } from "@wordpress/components";
import { withState } from "@wordpress/compose";
import { Attributes } from "../Static/Attributes";
import { Render } from "../Static/Render";

export function renderDateTime(
    componentInstance,
    id,
    label,
    keys,
    valueProp,
    objectValue,
    required = false,
    type = null
) {

    let MyDateTimePicker = null;

    switch( type ) {

        case 'date' :
            MyDateTimePicker = withState({
                date: objectValue ? objectValue : new Date(),
            })(({ date, setState }) => (
        
                <DatePicker
                    key={id}
                    currentDate={date}
                    onChange={(newDate) => {
                        setState({ date: newDate });
                        Attributes.updateAttributes(
                            keys,
                            valueProp,
                            newDate,
                            false,
                            componentInstance
                        );
                        componentInstance.updatePreview();
                    }}
                    is12Hour={false}
                    __nextRemoveHelpButton
                    __nextRemoveResetButton
                />
            ));
            break;

        case 'time':
            MyDateTimePicker = withState({
                date: objectValue ? objectValue : new Date(),
            })(({ date, setState }) => (
        
                <TimePicker
                    key={id}
                    currentDate={date}
                    onChange={(newDate) => {
                        setState({ date: newDate });
                        Attributes.updateAttributes(
                            keys,
                            valueProp,
                            newDate,
                            false,
                            componentInstance
                        );
                        componentInstance.updatePreview();
                    }}
                    is12Hour={false}
                    __nextRemoveHelpButton
                    __nextRemoveResetButton
                />
            ));
            break;

        default:
            MyDateTimePicker = withState({
                date: objectValue ? objectValue : new Date(),
            })(({ date, setState }) => (
        
                <DateTimePicker
                    key={id}
                    currentDate={date}
                    onChange={(newDate) => {
                        setState({ date: newDate });
                        Attributes.updateAttributes(
                            keys,
                            valueProp,
                            newDate,
                            false,
                            componentInstance
                        );
                        componentInstance.updatePreview();
                    }}
                    is12Hour={false}
                    __nextRemoveHelpButton
                    __nextRemoveResetButton
                />
            ));
    }

    return Render.panelComponent(
        id,
        label,
        <MyDateTimePicker />
    );
}
