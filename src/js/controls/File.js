import { Render } from "../Static/Render";
import { MediaHandler } from "./MediaHandler";

export function File({id, label, value, onChange, multiple = false}) {

    return Render.fieldContainer(
        id + "_file",
        <MediaHandler
            id={id}
            value={value}
            onChange={ (newValue) => onChange(newValue) }
            multiple={multiple}
        />,
        'file'
    )
}
