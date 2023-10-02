import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { Render } from '../Static/Render';

export function Spaces({ id, label, description, value, onChange }) {
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
                                label={Render.innerLabel(id, 'Padding')}
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
                                label={Render.innerLabel(id, 'Margin')}
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
        '',
        description,
    );
}
