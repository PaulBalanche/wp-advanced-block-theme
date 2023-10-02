import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { OContext } from '../../Context/OContext';
import { Attributes } from '../../Static/Attributes';
import { EditMode } from './edit';

Object.values(GLOBAL_LOCALIZED.components).forEach((element) => {
    const initAttributes = {
        id_component: {
            type: 'string',
        },
        _node: {
            type: 'string',
        },
    };
    Attributes.initComponentAttributes(initAttributes, element.props);

    registerBlockType('custom/wpe-component-' + element.id, {
        title: element.name,
        category: element.category.slug,
        supports: {
            anchor: true,
        },
        parent: element.parent,
        attributes: initAttributes,
        description: element.description,
        example:
            typeof element.preview == 'string'
                ? {
                      attributes: {
                          editorPreviewImage: element.preview,
                      },
                  }
                : null,
        edit: (props) => {
            return (
                <OContext
                    clientId={props.clientId}
                    name={props.name}
                    blockSpec={element}
                    themeSpec={GLOBAL_LOCALIZED.theme_spec}
                >
                    <EditMode {...props} />
                </OContext>
            );
        },
        save: () => {
            return (
                <div {...useBlockProps.save()}>
                    <InnerBlocks.Content />
                </div>
            );
        },
    });
});
