import { ColorPicker } from '@wordpress/components';
import { Render } from '../Static/Render';

export function Color({ id, label, value, onChange }) {
    return (
        <div
            key={id + '-ColorPickerComponentsBaseControl'}
            className="components-base-control"
        >
            <div
                key={id + '-ColorPickerComponentsBaseControlField'}
                className="components-base-control__field"
            >
                {Render.label(id, label)}
                <ColorPicker
                    color={value != '' ? value : null}
                    label={label}
                    onChange={(newValue) => onChange(newValue)}
                    enableAlpha
                />
            </div>
        </div>
    );
}
