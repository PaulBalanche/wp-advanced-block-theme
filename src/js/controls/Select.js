import { SelectControl } from '@wordpress/components';

export function Select({ id, label, options, value, onChange }) {
    if (typeof options == 'undefined' || options == null) return null;

    for (var i in options) {
        if (options[i].value == null) {
            delete options[i];
        }
    }

    return (
        <SelectControl
            key={id}
            label={label}
            value={value}
            options={[
                { label: '--Please choose an option--', value: '' },
            ].concat(
                options.map(function (value) {
                    return { label: value.name, value: value.value };
                }),
            )}
            onChange={(newValue) => {
                if (newValue == '') {
                    newValue = undefined;
                }
                onChange(newValue);
            }}
        />
    );
}
