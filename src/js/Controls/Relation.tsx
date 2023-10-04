import { SelectControl } from '@wordpress/components';
import { useContext } from '@wordpress/element';
import { OBlockEditorContext } from '../Context/Providers/OBlockEditorProvider';

export function Relation({ id, label, entity, value, onChange }) {
    if (typeof entity == 'undefined') {
        return null;
    }

    const { relations } = useContext(OBlockEditorContext);

    return (
        <SelectControl
            key={id}
            label={label}
            value={value}
            options={[
                { label: '--Please choose a ' + entity + ' --', value: '' },
            ].concat(
                relations[entity].map(function (value) {
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
