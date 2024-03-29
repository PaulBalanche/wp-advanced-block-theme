import {
    InnerBlocks,
    useBlockProps,
    useInnerBlocksProps,
} from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { ButtonGroup } from '@wordpress/components';
import { Attributes } from '../../../Static/Attributes';

import { WpeSlide } from './edit';

import { OButtonBlockAppender } from '../../../Components/OButtonBlockAppender';

let attributes = {};
if (
    GLOBAL_LOCALIZED.blocks_spec['wpe-slide'] != null &&
    typeof GLOBAL_LOCALIZED.blocks_spec['wpe-slide'] == 'object' &&
    typeof GLOBAL_LOCALIZED.blocks_spec['wpe-slide'].props == 'object'
) {
    Attributes.initComponentAttributes(
        attributes,
        GLOBAL_LOCALIZED.blocks_spec['wpe-slide'].props,
    );
}

registerBlockType('custom/wpe-slide', {
    title: 'Slide',
    category: 'wpe-layout',
    icon: (
        <svg
            enableBackground="new 0 0 24 24"
            height="24px"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 24 24"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g>
                <g>
                    <g>
                        <g>
                            <path d="M12,10.9c-0.1,0-0.2,0-0.2-0.1L3.5,6.1C3.4,6,3.3,5.8,3.3,5.6c0-0.2,0.1-0.3,0.2-0.4l8.2-4.7c0.2-0.1,0.3-0.1,0.5,0      l8.2,4.7c0.2,0.1,0.2,0.3,0.2,0.4S20.6,6,20.5,6.1l-8.2,4.7C12.2,10.8,12.1,10.9,12,10.9z M4.8,5.6L12,9.8l7.2-4.2L12,1.5      L4.8,5.6z" />
                        </g>
                        <g>
                            <path d="M10.4,23.6c-0.1,0-0.2,0-0.2-0.1l-8.2-4.7c-0.2-0.1-0.3-0.3-0.3-0.4V8.9c0-0.2,0.1-0.3,0.2-0.4c0.2-0.1,0.3-0.1,0.5,0      l8.2,4.7c0.2,0.1,0.2,0.3,0.2,0.4v9.5c0,0.2-0.1,0.3-0.2,0.4C10.5,23.6,10.5,23.6,10.4,23.6z M2.7,18.1l7.2,4.2v-8.3L2.7,9.8      V18.1z" />
                        </g>
                        <g>
                            <path d="M13.6,23.6c-0.1,0-0.2,0-0.2-0.1c-0.2-0.1-0.2-0.3-0.2-0.4v-9.5c0-0.2,0.1-0.3,0.2-0.4l8.2-4.7c0.2-0.1,0.3-0.1,0.5,0      c0.2,0.1,0.2,0.3,0.2,0.4v9.5c0,0.2-0.1,0.3-0.3,0.4l-8.2,4.7C13.8,23.6,13.7,23.6,13.6,23.6z M14.1,13.9v8.3l7.2-4.2V9.8      L14.1,13.9z" />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    ),
    supports: {
        lightBlockWrapper: true,
    },
    parent: ['custom/wpe-slider'],
    attributes: attributes,
    edit: (props) => {
        const innerBlocksProps = useInnerBlocksProps(
            useBlockProps({ className: '' }),
            {
                renderAppender: () => (
                    <ButtonGroup className="inspectorButtonInsertNew">
                        <OButtonBlockAppender rootClientId={props.clientId} />
                    </ButtonGroup>
                ),
            },
        );

        return (
            <WpeSlide
                {...props}
                innerBlocksProps={innerBlocksProps}
                blocks_spec={GLOBAL_LOCALIZED.blocks_spec['wpe-slide']}
                theme_spec={GLOBAL_LOCALIZED.theme_spec}
            />
        );
    },
    save: () => {
        return <InnerBlocks.Content />;
    },
});
