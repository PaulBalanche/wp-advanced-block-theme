import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { Render } from '../Static/Render';

export function Spaces({ id, label, value, onChange }) {
    const paddingValue =
        typeof value == 'object' && typeof value.padding == 'object'
            ? {
                  top:
                      typeof value.padding.top != 'undefined'
                          ? value.padding.top
                          : undefined,
                  left:
                      typeof value.padding.left != 'undefined'
                          ? value.padding.left
                          : undefined,
                  right:
                      typeof value.padding.right != 'undefined'
                          ? value.padding.right
                          : undefined,
                  bottom:
                      typeof value.padding.bottom != 'undefined'
                          ? value.padding.bottom
                          : undefined,
              }
            : {
                  top: undefined,
                  left: undefined,
                  right: undefined,
                  bottom: undefined,
              };

    const marginValue =
        typeof value == 'object' && typeof value.margin == 'object'
            ? {
                  top:
                      typeof value.margin.top != 'undefined'
                          ? value.margin.top
                          : undefined,
                  left:
                      typeof value.margin.left != 'undefined'
                          ? value.margin.left
                          : undefined,
                  right:
                      typeof value.margin.right != 'undefined'
                          ? value.margin.right
                          : undefined,
                  bottom:
                      typeof value.margin.bottom != 'undefined'
                          ? value.margin.bottom
                          : undefined,
              }
            : {
                  top: undefined,
                  left: undefined,
                  right: undefined,
                  bottom: undefined,
              };

    return Render.panelComponent(
        id,
        label,
        <>
            {Render.fieldContainer(
                id + '_spaces_padding',
                <div
                    key={id + '-SpacesPaddingComponentsBaseControl'}
                    className="components-base-control"
                >
                    <div
                        key={id + '-SpacesPaddingComponentsBaseControlField'}
                        className="components-base-control__field"
                    >
                        <div
                            key={id + '-SpacesPaddingContainer'}
                            className="spaces-control-container"
                        >
                            <BoxControl
                                key={id + '-padding'}
                                id={id + '-padding'}
                                label="Padding"
                                values={paddingValue}
                                onChange={(newValue) => {
                                    let newSpaces = {
                                        padding: newValue,
                                        margin: marginValue,
                                    };
                                    onChange(newSpaces);
                                }}
                            />
                        </div>
                    </div>
                </div>,
            )}
            {Render.fieldContainer(
                id + '_spaces_margin',
                <div
                    key={id + '-SpacesMarginComponentsBaseControl'}
                    className="components-base-control"
                >
                    <div
                        key={id + '-SpacesMarginComponentsBaseControlField'}
                        className="components-base-control__field"
                    >
                        <div
                            key={id + '-SpacesMarginContainer'}
                            className="spaces-control-container"
                        >
                            <BoxControl
                                key={id + '-margin'}
                                id={id + '-margin'}
                                label="Margin"
                                values={marginValue}
                                onChange={(newValue) => {
                                    let newSpaces = {
                                        padding: paddingValue,
                                        margin: newValue,
                                    };
                                    onChange(newSpaces);
                                }}
                            />
                        </div>
                    </div>
                </div>,
            )}
        </>,
        true,
    );

    return (
        <PropsObject
            key={id}
            id={id}
            label={label}
            keys={props.keys}
            valueProp={value}
            props={{
                margin: {
                    type: 'select',
                    title: 'Margin',
                    options: [
                        {
                            id: '---',
                            name: '---',
                            value: null,
                        },
                        {
                            id: '10',
                            name: '10',
                            value: '10',
                        },
                        {
                            id: '20',
                            name: '20',
                            value: '20',
                        },
                        {
                            id: '30',
                            name: '30',
                            value: '30',
                        },
                        {
                            id: '40',
                            name: '40',
                            value: '40',
                        },
                        {
                            id: '50',
                            name: '50',
                            value: '50',
                        },
                        {
                            id: '60',
                            name: '60',
                            value: '60',
                        },
                        {
                            id: '70',
                            name: '70',
                            value: '70',
                        },
                        {
                            id: '80',
                            name: '80',
                            value: '80',
                        },
                        {
                            id: '90',
                            name: '90',
                            value: '90',
                        },
                        {
                            id: '100',
                            name: '100',
                            value: '100',
                        },
                    ],
                },
                padding: {
                    type: 'select',
                    title: 'Padding',
                    options: [
                        {
                            id: '---',
                            name: '---',
                            value: null,
                        },
                        {
                            id: '10',
                            name: '10',
                            value: '10',
                        },
                        {
                            id: '20',
                            name: '20',
                            value: '20',
                        },
                        {
                            id: '30',
                            name: '30',
                            value: '30',
                        },
                        {
                            id: '40',
                            name: '40',
                            value: '40',
                        },
                        {
                            id: '50',
                            name: '50',
                            value: '50',
                        },
                        {
                            id: '60',
                            name: '60',
                            value: '60',
                        },
                        {
                            id: '70',
                            name: '70',
                            value: '70',
                        },
                        {
                            id: '80',
                            name: '80',
                            value: '80',
                        },
                        {
                            id: '90',
                            name: '90',
                            value: '90',
                        },
                        {
                            id: '100',
                            name: '100',
                            value: '100',
                        },
                    ],
                },
            }}
            onChange={(newValue) => onChange(newValue)}
            componentInstance={props.componentInstance}
            error={props.error}
        />
    );
}
