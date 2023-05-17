import { registerBlockType } from '@wordpress/blocks';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import edit from './edit';

import { Attributes } from '../../Static/Attributes';

var current_user_can_edit_posts = global_localized.current_user_can_edit_posts;

Object.values(global_localized.components).forEach((element) => {
    var initAttributes = {
        id_component: {
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
        edit: edit(element, current_user_can_edit_posts, theme_spec),
        save: () => {
            return (
                <div {...useBlockProps.save()}>
                    <InnerBlocks.Content />
                </div>
            );
        },
    });
});
