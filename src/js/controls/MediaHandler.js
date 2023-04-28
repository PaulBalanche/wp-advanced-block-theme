import { MediaPlaceholder } from "@wordpress/block-editor";
import { MediaPreview } from "./MediaPreview"

export function MediaHandler({id, value, onChange}) {

    return <MediaPlaceholder
        key={id + "-MediaPlaceholder"}
        onSelect={(value) => {
            if (typeof value.id != "undefined") {
                onChange(value.id)
            }
        }}
        value={{id: value}}
        disableDropZone={true}
        labels={{ title: null, instructions: null }}
    >
        <MediaPreview
            id={id}
            value={value}
            onChange={ (newValue) => onChange(newValue) }
        />
    </MediaPlaceholder>
}
