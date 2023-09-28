import { registerBlockType } from '@wordpress/blocks';

import {
    InnerBlocks,
    useBlockProps,
    useInnerBlocksProps,
} from '@wordpress/block-editor';

import { ButtonGroup } from '@wordpress/components';
import { OButtonBlockAppender } from '../../Components/OButtonBlockAppender';

import { Attributes } from '../../Static/Attributes';
import EditMode from './edit';

Object.values(GLOBAL_LOCALIZED.components).forEach((element) => {
    var initAttributes = {
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
            return EditMode({
                ...props,
                block_spec: element,
                theme_spec: GLOBAL_LOCALIZED.theme_spec,
            });
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
