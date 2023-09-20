import { registerBlockType } from '@wordpress/blocks';

import {
    InnerBlocks,
    useBlockProps,
    useInnerBlocksProps,
} from '@wordpress/block-editor';

import { ButtonGroup } from '@wordpress/components';
import { OButtonBlockAppender } from '../../Components/OButtonBlockAppender';

import { Attributes } from '../../Static/Attributes';
import { EditMode } from './edit';

var current_user_can_edit_posts = GLOBAL_LOCALIZED.current_user_can_edit_posts;

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
    console.log(element);
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
            const innerBlocksProps =
                typeof element.inner_blocks != 'undefined' &&
                element.inner_blocks !== false
                    ? useInnerBlocksProps(
                          useBlockProps({
                              className:
                                  element.inner_blocks == null
                                      ? 'hidden'
                                      : true,
                          }),
                          {
                              renderAppender: () => (
                                  <ButtonGroup className="inspectorButtonInsertNew">
                                      <OButtonBlockAppender
                                          rootClientId={props.clientId}
                                      />
                                  </ButtonGroup>
                              ),
                          },
                      )
                    : null;

            return (
                <EditMode
                    {...props}
                    innerBlocksProps={innerBlocksProps}
                    block_spec={element}
                    current_user_can_edit_posts={current_user_can_edit_posts}
                    theme_spec={GLOBAL_LOCALIZED.theme_spec}
                />
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
