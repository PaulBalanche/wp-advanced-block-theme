import { Render } from "../Static/Render";
import { MediaHandler } from "./MediaHandler";

export function Image({id, label, value, onChange}) {

    return Render.fieldContainer(
        id + "_image",
        <MediaHandler
            id={id}
            value={value}
            onChange={ (newValue) => onChange(newValue) }
        />,
        'image'
    )
}
