import { Button, Dashicon } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

import __ODevices from '../Components/ODevices';
import { BaseControl } from '../controls/BaseControl';
import { Attributes } from './Attributes';
import { Render } from './Render';
import { Sortable } from './Sortable';

export function Control(props) {
    const id = props.keys.join('-');
    const key = props.blockKey;
    const label = props.label;
    const description =
        typeof props.description != 'undefined' ? props.description : null;
    const type = props.type;
    const keys = props.keys;
    const valueProp = props.valueProp;
    const required_field = props.required_field;
    const repeatable = props.repeatable;
    const isResponsive = props.isResponsive;
    const args = props.args;
    const error = props.error;
    const componentInstance = props.componentInstance;
    const isSortableItem = typeof props.sortableIndex != 'undefined';
    const directSubmission = ![
        'string',
        'number',
        'integer',
        'text',
        'richText',
        'wysiwyg',
    ].includes(props.type);

    const [value, setValue] = useState(props.controllerValue);
    const [updating, setUpdating] = useState(false);
    const [editMode, setEditMode] = useState(null);

    useEffect(() => {
        if (
            !!editMode &&
            editMode != __ODevices.getInstance().getCurrentDevice()
        ) {
            setEditMode(null);
        }
    });

    function haveToDisplayDefaultValue() {
        if (
            !!editMode &&
            editMode == __ODevices.getInstance().getCurrentDevice()
        ) {
            return false;
        }

        if (
            isSortableItem ||
            (repeatable &&
                getDefaultValue() != null &&
                typeof getDefaultValue() != 'object')
        ) {
            return false;
        }

        if (value == null && getDefaultValue() != null) {
            return true;
        }

        if (
            isResponsive &&
            __ODevices.getInstance().getCurrentDevice() !=
                __ODevices.getInstance().getDefaultDevice() &&
            defaultDeviceIsDefined() &&
            typeof value[__ODevices.getInstance().getCurrentDevice()] ==
                'undefined'
        ) {
            return true;
        }

        return false;
    }

    function getDefaultValue() {
        if (
            isResponsive &&
            __ODevices.getInstance().getCurrentDevice() !=
                __ODevices.getInstance().getDefaultDevice() &&
            defaultDeviceIsDefined() &&
            typeof value[__ODevices.getInstance().getCurrentDevice()] ==
                'undefined'
        ) {
            return value[__ODevices.getInstance().getDefaultDevice()];
        }

        if (default_value_is_defined()) {
            return args.default.value;
        }

        return null;
    }

    function default_value_is_defined() {
        return (
            typeof args.default != 'undefined' &&
            args.default != null &&
            typeof args.default.value != 'undefined'
        );
    }

    function defaultDeviceIsDefined() {
        return (
            value != null &&
            typeof value == 'object' &&
            typeof value[__ODevices.getInstance().getDefaultDevice()] !=
                'undefined'
        );
    }

    function onChange(newValue, directSubmit = false) {
        if (isResponsive) {
            newValue = {
                ...value,
                ...{ [__ODevices.getInstance().getCurrentDevice()]: newValue },
            };
        }
        setValue(newValue);

        if (isSortableItem && typeof props.onChange != 'undefined') {
            props.onChange(newValue, [props.sortableIndex]);
        }

        if (directSubmit || directSubmission) {
            onDirectSubmit(newValue);
        } else {
            setUpdating(true);
        }
    }

    function onSubmit() {
        Attributes.updateAttributes(
            keys,
            valueProp,
            value,
            false,
            componentInstance,
        );
        setUpdating(false);
        componentInstance.updatePreview();
    }

    function onDirectSubmit(newValue) {
        Attributes.updateAttributes(
            keys,
            valueProp,
            newValue,
            false,
            componentInstance,
        );
        componentInstance.updatePreview();
    }

    function getLabel() {
        if (label == null) {
            return null;
        }

        let labelFormatted = [label];

        if (required_field && label != null) {
            labelFormatted.push(
                <span key={getKey() + '-label-required'} className="o-required">
                    *
                </span>,
            );
        }

        if (
            error &&
            typeof error == 'object' &&
            typeof error.error == 'string'
        ) {
            labelFormatted.push(
                <div key={getKey() + '-label-error'} className="error">
                    {' '}
                    <Dashicon icon="info" /> {error.error}{' '}
                </div>,
            );
        }

        if (
            error &&
            typeof error == 'object' &&
            typeof error.warning == 'string'
        ) {
            labelFormatted.push(
                <div key={getKey() + '-label-warging'} className="warning">
                    <Dashicon icon="info" />
                    {error.warning}
                </div>,
            );
        }

        labelFormatted.push(renderSavedButton());

        if (value != null && type != 'object') {
            labelFormatted.push(
                <Button
                    key={getKey() + 'defaultOverlayContainer-button'}
                    onMouseDown={() => {
                        onChange(undefined, true);
                        setEditMode(null);
                    }}
                    className="resetDefault"
                    variant="link"
                >
                    <Dashicon icon="editor-removeformatting" />
                    Reset
                </Button>,
            );
        }

        labelFormatted = Render.innerLabel(
            getKey(),
            labelFormatted,
            typeof props.description != 'undefined' &&
                props.description != null &&
                props.description != '' &&
                !['object', 'spaces'].includes(type)
                ? props.description
                : null,
        );

        return labelFormatted;
    }

    function getKey() {
        let keyFormatted = key;

        if (isResponsive) {
            const currentDevice = __ODevices.getInstance().getCurrentDevice();
            keyFormatted = keyFormatted + '-' + currentDevice;
        }

        return keyFormatted;
    }

    function getKeys() {
        let keysFormatted = Object.assign([], keys);

        if (isResponsive) {
            const currentDevice = __ODevices.getInstance().getCurrentDevice();
            keysFormatted.push(currentDevice);
        }

        return keysFormatted;
    }

    function getValue() {
        if (haveToDisplayDefaultValue()) {
            return getDefaultValue();
        }

        if (isResponsive) {
            const currentDevice = __ODevices.getInstance().getCurrentDevice();
            if (
                value != null &&
                typeof value == 'object' &&
                typeof value[currentDevice] != 'undefined'
            ) {
                return value[currentDevice];
            } else {
                return '';
            }
        }

        if (repeatable) {
            if (
                value == null ||
                typeof value != 'object' ||
                value.length == 0
            ) {
                return [''];
            }
        }

        return value;
    }

    function getContainerClassName() {
        const className = [];
        if (error && error != null && typeof error == 'object') {
            if (typeof error.error != 'undefined') {
                className.push('has-error');
            } else if (typeof error.warning != 'undefined') {
                className.push('has-warning');
            }
        }

        if (updating && !isSortableItem && !directSubmission) {
            className.push('updating');
        }

        return className.length > 0 ? className.join(' ') : '';
    }

    function renderSavedButton() {
        return !haveToDisplayDefaultValue() &&
            updating &&
            !isSortableItem &&
            !directSubmission ? (
            <Button
                key={getKey() + 'submitChanges-button'}
                onMouseDown={() => onSubmit()}
                variant="link"
            >
                <Dashicon icon="saved" /> Apply
            </Button>
        ) : null;
    }

    function renderDefaultValueOverlay() {
        const text =
            isResponsive && defaultDeviceIsDefined() ? (
                <>
                    {'Define '}
                    <b>{getLabel()}</b>
                    {' for '}
                    {__ODevices.getInstance().getCurrentDevice()}
                </>
            ) : (
                'Override default value'
            );
        const extraClass =
            isResponsive && defaultDeviceIsDefined() ? 'isResponsive' : null;

        return haveToDisplayDefaultValue() && !isSortableItem ? (
            <div
                key={getKey() + 'defaultOverlayContainer'}
                className={'default-overlay-container ' + extraClass}
            >
                <Button
                    key={getKey() + 'defaultOverlayContainer-button'}
                    onMouseDown={() => {
                        setEditMode(
                            __ODevices.getInstance().getCurrentDevice(),
                        );
                    }}
                    variant="primary"
                >
                    <Dashicon icon="edit" />
                    {text}
                </Button>
            </div>
        ) : null;
    }

    function render() {
        /** Rendering */
        let render = [];

        if (repeatable) {
            const itemsError =
                error &&
                typeof error == 'object' &&
                typeof error.props == 'object' &&
                Object.keys(error.props).length > 0
                    ? error.props
                    : null;

            render.push(
                <Sortable
                    key={getKey() + '-Sortable'}
                    id={getKey() + '-Sortable'}
                    type={type}
                    componentInstance={componentInstance}
                    blockKey={getKey()}
                    keys={getKeys()}
                    controllerValue={props.controllerValue}
                    valueProp={valueProp}
                    value={getValue()}
                    required_field={required_field}
                    args={args}
                    error={itemsError}
                    onChange={(newValue, directSubmit) =>
                        onChange(newValue, directSubmit)
                    }
                    label={getLabel()}
                />,
            );
        } else {
            render.push(
                <BaseControl
                    key={getKey()}
                    keys={getKeys()}
                    valueProp={valueProp}
                    id={getKey()}
                    label={getLabel()}
                    description={description}
                    value={getValue()}
                    type={type}
                    args={args}
                    error={error}
                    onChange={(newValue) => onChange(newValue)}
                    onSubmit={() => onSubmit()}
                    componentInstance={componentInstance}
                />,
            );
        }

        if (isResponsive && defaultDeviceIsDefined()) {
            const currentDevice = __ODevices.getInstance().getCurrentDevice();
            const defaultDevice = __ODevices.getInstance().getDefaultDevice();

            render = Render.responsiveTabComponent(
                getKey(),
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
                            isValid:
                                typeof value[layout] != 'undefined'
                                    ? true
                                    : false,
                        };
                    },
                ),
                render,
                (newDevice) => {
                    componentInstance.setState({ currentEditedProp: id });
                    __ODevices.getInstance().setCurrentDevice(newDevice);
                },
                type,
            );
        }

        return render;
    }

    return Render.fieldContainer(
        getKey(),
        <>
            {render()}
            {renderDefaultValueOverlay()}
        </>,
        getContainerClassName(),
    );
}
