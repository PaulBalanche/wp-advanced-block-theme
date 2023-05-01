import { MediaPlaceholder } from "@wordpress/block-editor";
import { MediaPreview } from "./MediaPreview"

export function MediaHandler({id, value, onChange, multiple = false}) {

    return <MediaPlaceholder
        key={id + "-MediaPlaceholder"}
        onSelect={(value) => {
            if( ! multiple ) {
                if (typeof value.id != "undefined") {
                    onChange(value.id)
                }
            }
            else {
                const values = [];
                value.forEach((singleMedia) => {

                    if (typeof singleMedia.id != "undefined") {
                        values.push(singleMedia.id);
                    }
                });
                onChange(values)
            }
        }}
        value={{id: value}}
        multiple={multiple}
        addToGallery={multiple}
        disableDropZone={true}
        labels={{ title: null, instructions: null }}
    >
        <MediaPreview
            id={id}
            value={value}
            onChange={ (newValue) => onChange(newValue) }
            multiple={multiple}
        />
    </MediaPlaceholder>
}
