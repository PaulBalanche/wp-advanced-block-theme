import { store as blockEditorStore } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { compose } from '@wordpress/compose';
import { WpeComponentBase } from '../../../Components/WpeComponentBase';

import { MenuItem } from '@wordpress/components';

import { plus } from '@wordpress/icons';

import { dispatch, withDispatch, withSelect } from '@wordpress/data';
import { map } from 'lodash';

import __ODevices from '../../../Components/ODevices';

import { Render } from '../../../Static/Render';

import { predefinedLayouts } from './predefinedLayouts';

/**
 * Add some columns in wpe-container based on variation selected
 *
 */
function createBlocksFromInnerBlocksTemplate(innerBlocksTemplate) {
    return map(innerBlocksTemplate, ({ name, attributes }) =>
        createBlock(name, attributes),
    );
}

/**
 * registerBlockType edit function
 */
class WpeGrid extends WpeComponentBase {
    constructor() {
        super(...arguments);
    }

    isEditable() {
        return (
            typeof this.props.inner_blocks == 'object' &&
            this.props.countColumns > 0
        );
    }

    addColumn() {
        // Define rowStart fo the new colums added
        let initLayout = {};
        Object.keys(__ODevices.getInstance().getMediaQueries()).forEach(
            (layout) => {
                initLayout[layout] = {
                    columnStart: 1,
                    width: 1,
                    rowStart: 2,
                    height: 1,
                };
                this.props.inner_blocks.forEach((element) => {
                    if (
                        element.attributes.layout &&
                        element.attributes.layout[layout]
                    ) {
                        let currentRowStart =
                            element.attributes.layout[layout].rowStart &&
                            element.attributes.layout[layout].rowStart
                                ? element.attributes.layout[layout].rowStart
                                : 1;
                        let currentHeight =
                            element.attributes.layout[layout].height &&
                            element.attributes.layout[layout].height
                                ? element.attributes.layout[layout].height
                                : 1;
                        let currentRowEnd = currentRowStart + currentHeight;
                        if (currentRowEnd > initLayout[layout].rowStart) {
                            initLayout[layout].rowStart = currentRowEnd;
                        }
                    }
                });
            },
        );

        let inner_blocks_new = [
            ...this.props.inner_blocks,
            createBlock('custom/wpe-column', {
                layout: initLayout,
            }),
        ];

        this.props.replaceInnerBlocks(
            this.props.clientId,
            inner_blocks_new,
            false,
        );
    }

    renderSpecificTools() {
        return (
            <MenuItem
                key={
                    this.props.clientId +
                    '-toolsDropdownMenu-SpecificTools-addColumn'
                }
                icon={plus}
                onClick={() => this.addColumn()}
            >
                Add column
            </MenuItem>
        );
    }

    renderInspectorControls() {
        const currentDevice = __ODevices.getInstance().getCurrentDevice();
        const defaultDevice = __ODevices.getInstance().getDefaultDevice();
        const currentLayout = this.getLayout();

        return Render.fieldContainer(
            this.props.clientId + '_layout',
            Render.responsiveTabComponent(
                this.props.clientId,
                Object.keys(__ODevices.getInstance().getMediaQueries()).map(
                    (layout) => {
                        return {
                            name: layout,
                            title:
                                layout.charAt(0).toUpperCase() +
                                layout.slice(1),
                            className: 'tab-' + layout,
                            active: currentDevice == layout ? true : false,
                            isDefault: defaultDevice == layout ? true : false,
                        };
                    },
                ),
                <>
                    <label
                        className="components-base-control__forced_label"
                        key={this.props.clientId + '-template-label'}
                    >
                        Layout
                    </label>
                    <div className="items">
                        {predefinedLayouts.map((variation, index) => {
                            if (variation.count == this.props.countColumns) {
                                return (
                                    <span
                                        key={
                                            this.props.clientId +
                                            '-gridInitialLayout-' +
                                            index
                                        }
                                        className={
                                            'item ' +
                                            (currentLayout != null &&
                                            index == currentLayout
                                                ? 'active'
                                                : '')
                                        }
                                        onMouseDown={() =>
                                            this.setLayout(index)
                                        }
                                    >
                                        {variation.icon}
                                    </span>
                                );
                            }
                        })}
                    </div>
                </>,
                (newDevice) => {
                    // __ODevices.getInstance().setCurrentDevice(newDevice);
                },
                'grid-layout',
            ),
        );
    }

    getLayout() {
        if (typeof this.props.attributes.layout == 'undefined') {
            return null;
        }
        if (typeof __ODevices.getInstance() == 'undefined') {
            return null;
        }
        const currentDevice = __ODevices.getInstance().getCurrentDevice();
        if (typeof this.props.attributes.layout[currentDevice] == 'undefined') {
            return null;
        }

        return this.props.attributes.layout[currentDevice];
    }

    setLayout(index) {
        const currentDevice = __ODevices.getInstance().getCurrentDevice();

        if (typeof this.props.attributes.layout == 'undefined') {
            this.props.attributes.layout = {};
        }
        this.props.attributes.layout[currentDevice] = index;

        this.setAttributes({ layout: this.props.attributes.layout });

        for (var i in this.props.inner_blocks) {
            this.props.inner_blocks[i].attributes.layout[currentDevice] =
                predefinedLayouts[index].layout[i];

            dispatch('core/block-editor').updateBlockAttributes(
                this.props.inner_blocks[i].clientId,
                this.props.inner_blocks[i].attributes.layout[currentDevice],
            );
        }
    }

    setInitialLayout(index) {
        const mediaQueries = __ODevices.getInstance().getMediaQueries();

        const gridLayoutAttribute = {};
        for (var i in mediaQueries) {
            gridLayoutAttribute[i] = index;
        }
        this.setAttributes({ layout: gridLayoutAttribute });

        const innerBlocks = [];
        predefinedLayouts[index].layout.forEach((layout) => {
            const columnLayoutAttribute = {};
            for (var i in mediaQueries) {
                columnLayoutAttribute[i] = layout;
            }
            innerBlocks.push({
                name: 'custom/wpe-column',
                attributes: {
                    layout: columnLayoutAttribute,
                },
            });
        });
        this.props.replaceInnerBlocks(
            this.props.clientId,
            createBlocksFromInnerBlocksTemplate(innerBlocks),
            false,
        );
    }

    getToolbar() {
        const tootlBar = [];

        const currentLayout = this.getLayout();
        if (
            currentLayout &&
            typeof predefinedLayouts[currentLayout] == 'object' &&
            typeof predefinedLayouts[currentLayout].icon != 'undefined'
        ) {
            tootlBar.push(
                <div key={this.props.clientId + '_toolBarSvg'} className="svg">
                    {predefinedLayouts[currentLayout].icon}
                </div>,
            );
        }

        tootlBar.push(
            <span
                key={this.props.clientId + '_toolBarInstruction'}
                className="instruction"
            >
                Edit layout
            </span>,
        );

        return tootlBar;
    }

    liveRendering() {
        var { clientId, inner_blocks, countColumns } = this.props;

        const { children, ...innerBlocksProps } = this.props.innerBlocksProps;
        innerBlocksProps.key = 'innerBlocksProps_' + clientId;
        /**
         * Define innerBlocks
         */
        if (
            typeof inner_blocks != 'object' ||
            (typeof inner_blocks == 'object' && countColumns == 0)
        ) {
            return (
                <div {...innerBlocksProps}>
                    <div
                        key={this.props.clientId + '-placeholder'}
                        className="wpe-block-placeholder"
                    >
                        <div className="inner">
                            <h2>Grid</h2>
                            <label
                                className="components-base-control__forced_label"
                                key={this.props.clientId + '-template-label'}
                            >
                                Choose a layout
                            </label>
                            <div className="grid-layout">
                                {Render.tabPanelComponent(
                                    clientId + '-gridLayout',
                                    [
                                        {
                                            name: 'cols-2',
                                            title: '2 columns',
                                            value: 2,
                                        },
                                        {
                                            name: 'cols-3',
                                            title: '3 columns',
                                            value: 3,
                                        },
                                        {
                                            name: 'cols-4',
                                            title: '4 columns',
                                            value: 4,
                                        },
                                        {
                                            name: 'cols-5',
                                            title: '5 columns',
                                            value: 5,
                                        },
                                        {
                                            name: 'cols-6',
                                            title: '6 columns',
                                            value: 6,
                                        },
                                    ],
                                    (tabPanel) => {
                                        return (
                                            <div className="items">
                                                {predefinedLayouts.map(
                                                    (variation, index) => {
                                                        if (
                                                            variation.count ==
                                                            tabPanel.value
                                                        ) {
                                                            return (
                                                                <span
                                                                    key={
                                                                        clientId +
                                                                        '-gridInitialLayout-' +
                                                                        index
                                                                    }
                                                                    className="item"
                                                                    onMouseDown={() =>
                                                                        this.setInitialLayout(
                                                                            index,
                                                                        )
                                                                    }
                                                                >
                                                                    {
                                                                        variation.icon
                                                                    }
                                                                </span>
                                                            );
                                                        }
                                                    },
                                                )}
                                            </div>
                                        );
                                    },
                                    null,
                                    null,
                                    'initialGridLayout',
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div {...innerBlocksProps}>
                    {this.renderEditFormZone(this.getToolbar(), false)}
                    <div
                        key={this.props.clientId + '_gridContainer'}
                        className="o-grid-container"
                    >
                        {children}
                    </div>
                    {/* <div
                        className="o-grid-add-column"
                        onClick={() => this.addColumn()}
                    >
                        <Dashicon icon="plus" />
                        Add column
                    </div> */}
                </div>
            );
        }
    }
}

export const EditMode = compose([
    withSelect((select, props) => {
        const parentsBlock = [];
        const getBlockParents = select('core/block-editor').getBlockParents(
            props.clientId,
        );
        if (getBlockParents.length > 0) {
            for (var i in getBlockParents) {
                parentsBlock.push(
                    select('core/block-editor').getBlock(getBlockParents[i]),
                );
            }
        }

        return {
            inner_blocks: select('core/block-editor').getBlocks(props.clientId),
            countColumns: select('core/block-editor').getBlockCount(
                props.clientId,
            ),
            blockVariations: select('core/blocks').getBlockVariations(
                props.name,
                'block',
            ),
            blockType: select('core/blocks').getBlockType(props.name),
            parentsBlock,
        };
    }),
    withDispatch((dispatch) => {
        const {
            replaceInnerBlocks,
            removeBlock,
            duplicateBlocks,
            moveBlocksUp,
            moveBlocksDown,
        } = dispatch(blockEditorStore);

        return {
            replaceInnerBlocks,
            removeBlock,
            duplicateBlocks,
            moveBlocksUp,
            moveBlocksDown,
        };
    }),
])(WpeGrid);
