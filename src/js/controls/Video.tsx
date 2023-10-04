import { TextControl } from '@wordpress/components';
import { Fragment } from 'react';
import { Render } from '../Static/Render';
import { File } from './File';

export function Video({ id, label, value, onChange }) {
    const typeVideoPanel = [];

    // File
    typeVideoPanel.push({
        name: 'file',
        title: 'File',
        content: (
            <File
                key={id}
                id={id}
                label={label}
                value={value?.file ? value.file : null}
                onChange={(newValue) => {
                    newValue = {
                        file: newValue,
                    };
                    if (value?.embed) {
                        newValue.embed = value.embed;
                    }
                    onChange(newValue);
                }}
            />
        ),
    });

    // Embed
    typeVideoPanel.push({
        name: 'embed',
        title: 'Embed',
        content: Render.fieldContainer(
            id + '_embed',
            <TextControl
                key={id + '-embedLink'}
                label={'Embed link'}
                type={'text'}
                value={value?.embed ? value.embed : ''}
                onChange={(newValue) => {
                    newValue = {
                        embed: newValue,
                    };
                    if (value?.file) {
                        newValue.file = value.file;
                    }
                    onChange(newValue);
                }}
            />,
        ),
    });

    return (
        <Fragment key={id + '-fragment'}>
            <div key={id + '-instructions'}>
                Upload a media file or pick one from your media library.
            </div>
            {Render.tabPanelComponent(
                id + '-videoType',
                typeVideoPanel,
                function (typeVideoPanel) {
                    return typeVideoPanel.content;
                },
                null,
                null,
                'videoType',
            )}
        </Fragment>
    );
}
