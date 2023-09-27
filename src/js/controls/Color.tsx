import { ColorPicker, ColorIndicator } from '@wordpress/components';
import { Render } from '../Static/Render';
import { useState, useEffect } from '@wordpress/element';

export function Color({ id, label, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            key={`${id}-ColorPickerComponentsBaseControl`}
            className="components-base-control"
        >
            <div
                key={`${id}-ColorPickerComponentsBaseControlField`}
                className="components-base-control__field"
            >
                {Render.label(id, label)}

                {!isOpen && (
                    <ColorIndicator
                        key={`${id}-ColorIndicatorBaseControlField`}
                        colorValue={value}
                        onMouseDown={() => setIsOpen(true)}
                    />
                )}
                {isOpen && (
                    <ColorPicker
                        color={value != '' ? value : null}
                        onChange={(newValue) => onChange(newValue)}
                        enableAlpha
                    />
                )}
            </div>
        </div>
    );
}
