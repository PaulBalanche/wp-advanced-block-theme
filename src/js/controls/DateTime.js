import { DateTimePicker } from "@wordpress/components";
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
    required = false
) {

    const MyDateTimePicker = withState({
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

    return Render.panelComponent(
        id,
        label,
        <MyDateTimePicker />
    );
}
