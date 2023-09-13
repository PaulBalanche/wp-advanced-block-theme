import { SelectControl } from '@wordpress/components';

export function Relation({ id, label, entity, relations, value, onChange }) {
    if (
        typeof entity == 'undefined' ||
        typeof relations == 'undefined' ||
        relations == null ||
        Object.keys(relations).length == 0
    ) {
        return null;
    }

    return (
        <SelectControl
            key={id}
            label={label}
            value={value}
            options={[
                { label: '--Please choose a ' + entity + ' --', value: '' },
            ].concat(
                relations.map(function (value) {
                    return { label: value.title.raw, value: value.id };
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
