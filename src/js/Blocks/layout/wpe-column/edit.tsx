/**
 * WordPress dependencies
 */
import { store as blockEditorStore } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { WpeComponentBase } from '../../../Components/WpeComponentBase';

import { RangeControl } from '@wordpress/components';

import { withDispatch, withSelect } from '@wordpress/data';

import __ODevices from '../../../Components/ODevices';
import { Render } from '../../../Static/Render';

/**
 * registerBlockType edit function
 *
 */
class WpeColumn extends WpeComponentBase {
    constructor() {
        super(...arguments);

        if (typeof this.getAttribute('id_component') == 'undefined') {
            this.setAttributes({ id_component: '' + this.props.columnIndex });
        }
    }

    getLayout(key, device) {
        if (typeof this.props.attributes.layout == 'undefined') {
            return 1;
        }
        if (typeof this.props.attributes.layout[device] == 'undefined') {
            return 1;
        }
        if (typeof this.props.attributes.layout[device][key] == 'undefined') {
            return 1;
        }

        return this.props.attributes.layout[device][key];
    }

    setLayout(key, value, device) {
        let curentLayout =
            typeof this.props.attributes.layout == 'undefined'
                ? {}
                : this.props.attributes.layout;
        if (typeof curentLayout[device] == 'undefined') {
            curentLayout[device] = {};
        }
        curentLayout[device][key] = value;

        this.setAttributes({ layout: null });
        this.setAttributes({ layout: curentLayout });
    }

    renderInspectorControls() {
        const currentDevice = __ODevices.getInstance().getCurrentDevice();
        const defaultDevice = __ODevices.getInstance().getDefaultDevice();

        return Render.fieldContainer(
            this.props.clientId + '_layout',
            Render.panelComponent(
                this.props.clientId + '_layout',
                'Layout',
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
                                isDefault:
                                    defaultDevice == layout ? true : false,
                            };
                        },
                    ),
                    <>
                        <div className="flex">
                            {Render.fieldContainer(
                                this.props.clientId +
                                    '_columnStart_' +
                                    currentDevice,
                                <RangeControl
                                    label="Column start"
                                    value={this.getLayout(
                                        'columnStart',
                                        currentDevice,
                                    )}
                                    onChange={(value) =>
                                        this.setLayout(
                                            'columnStart',
                                            Number.parseInt(value),
                                            currentDevice,
                                        )
                                    }
                                    min={1}
                                    max={
                                        this.getLayout(
                                            'columnStart',
                                            currentDevice,
                                        ) + 1
                                    }
                                />,
                            )}
                            {Render.fieldContainer(
                                this.props.clientId + '_width_' + currentDevice,
                                <RangeControl
                                    label="Width"
                                    value={this.getLayout(
                                        'width',
                                        currentDevice,
                                    )}
                                    onChange={(value) =>
                                        this.setLayout(
                                            'width',
                                            Number.parseInt(value),
                                            currentDevice,
                                        )
                                    }
                                    min={1}
                                    max={
                                        this.getLayout('width', currentDevice) +
                                        1
                                    }
                                />,
                            )}
                        </div>
                        <div className="flex">
                            {Render.fieldContainer(
                                this.props.clientId +
                                    '_rowStart_' +
                                    currentDevice,
                                <RangeControl
                                    label="Row start"
                                    value={this.getLayout(
                                        'rowStart',
                                        currentDevice,
                                    )}
                                    onChange={(value) =>
                                        this.setLayout(
                                            'rowStart',
                                            Number.parseInt(value),
                                            currentDevice,
                                        )
                                    }
                                    min={1}
                                    max={
                                        this.getLayout(
                                            'rowStart',
                                            currentDevice,
                                        ) + 1
                                    }
                                />,
                            )}
                            {Render.fieldContainer(
                                this.props.clientId +
                                    '_height_' +
                                    currentDevice,
                                <RangeControl
                                    label="Height"
                                    value={this.getLayout(
                                        'height',
                                        currentDevice,
                                    )}
                                    onChange={(value) =>
                                        this.setLayout(
                                            'height',
                                            Number.parseInt(value),
                                            currentDevice,
                                        )
                                    }
                                    min={1}
                                    max={
                                        this.getLayout(
                                            'height',
                                            currentDevice,
                                        ) + 1
                                    }
                                />,
                            )}
                        </div>
                    </>,
                    (newDevice) => {
                        __ODevices.getInstance().setCurrentDevice(newDevice);
                    },
                    'column-layout',
                ),
                true,
            ),
        );
    }

    liveRendering() {
        const { children, ...innerBlocksProps } = this.props.innerBlocksProps;
        innerBlocksProps.key = 'innerBlocksProps_' + this.props.clientId;

        if (this.props.countColumns == 0) {
            innerBlocksProps.className += ' is-empty';
        }

        if (typeof __ODevices.getInstance() != 'undefined') {
            const currentDevice = __ODevices.getInstance().getCurrentDevice();

            innerBlocksProps.style = {
                gridColumnStart: this.getLayout('columnStart', currentDevice),
                gridColumnEnd:
                    this.getLayout('columnStart', currentDevice) +
                    this.getLayout('width', currentDevice),
                gridRowStart: this.getLayout('rowStart', currentDevice),
                gridRowEnd:
                    this.getLayout('rowStart', currentDevice) +
                    this.getLayout('height', currentDevice),
            };
        }

        return (
            <div {...innerBlocksProps}>
                {this.renderEditFormZone()}
                <div
                    key={this.props.clientId + '_columnContainer'}
                    className="o-column-container"
                >
                    {children}
                </div>
            </div>
        );
    }
}

export const EditMode = compose([
    withSelect((select, props) => {
        const getBlockParents = select('core/block-editor').getBlockParents(
            props.clientId,
        );
        const parentBlockId = getBlockParents[getBlockParents.length - 1];
        const fatherBlocks =
            select('core/block-editor').getBlockOrder(parentBlockId);
        const indexOf = fatherBlocks.indexOf(props.clientId);

        return {
            countColumns: select('core/block-editor').getBlockCount(
                props.clientId,
            ),
            columnIndex: indexOf,
        };
    }),
    withDispatch((dispatch) => {
        const { removeBlock } = dispatch(blockEditorStore);

        return {
            removeBlock,
        };
    }),
])(WpeColumn);
