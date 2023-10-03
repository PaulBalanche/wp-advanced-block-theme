import { Button, Dashicon, Tooltip } from '@wordpress/components';
import { useEffect, useState, useContext } from '@wordpress/element';
import { Devices } from './Devices';
import { BaseControl } from '../controls/BaseControl';
import { Attributes } from './Attributes';
import { Render } from './Render';
import { Sortable } from './Sortable';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { useDispatch } from '@wordpress/data';
import { ODeviceContext } from '../Context/Providers/ODeviceProvider';

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
    const clientId = props.clientId;
    const isSortableItem = typeof props.sortableIndex != 'undefined';

    const [value, setValue] = useState(props.controllerValue);
    const [editMode, setEditMode] = useState(null);

    const currentDevice = useContext(ODeviceContext);

    useEffect(() => {
        if (!!editMode && editMode != currentDevice) {
            setEditMode(null);
        }
    });

    function haveToDisplayDefaultValue() {
        if (!!editMode && editMode == currentDevice) {
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

        if (props.type == 'color' && value == null) {
            return true;
        }

        if (value == null && getDefaultValue() != null) {
            return true;
        }

        if (
            isResponsive &&
            currentDevice != Devices.getDefaultDevice() &&
            defaultDeviceIsDefined() &&
            typeof value[currentDevice] == 'undefined'
        ) {
            return true;
        }

        return false;
    }

    function getDefaultValue() {
        if (
            isResponsive &&
            currentDevice != Devices.getDefaultDevice() &&
            defaultDeviceIsDefined() &&
            typeof value[currentDevice] == 'undefined'
        ) {
            return value[Devices.getDefaultDevice()];
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
            typeof value[Devices.getDefaultDevice()] != 'undefined'
        );
    }

    function onChange(newValue) {
        if (isResponsive) {
            newValue = {
                ...value,
                ...{ [currentDevice]: newValue },
            };
        }
        setValue(newValue);

        if (isSortableItem && typeof props.onChange != 'undefined') {
            props.onChange(newValue, [props.sortableIndex]);
        }

        Attributes.updateAttributes(
            keys,
            valueProp,
            newValue,
            false,
            props.updateBlockAttributes,
            clientId,
        );
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

        if (description != null) {
            labelFormatted.push(
                <Tooltip
                    key={id + '-tooltip'}
                    text={description}
                    delay="0"
                    position="top"
                >
                    <div className="label-tooltip">
                        <Dashicon icon="info" />
                    </div>
                </Tooltip>,
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

        if (
            value != null &&
            ![
                'object',
                'spaces',
                'link',
                'image',
                'textarea',
                'richText',
                'wysiwyg',
            ].includes(type)
        ) {
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
            keyFormatted = keyFormatted + '-' + currentDevice;
        }

        return keyFormatted;
    }

    function getKeys() {
        let keysFormatted = Object.assign([], keys);

        if (isResponsive) {
            keysFormatted.push(currentDevice);
        }

        return keysFormatted;
    }

    function getValue() {
        if (haveToDisplayDefaultValue()) {
            return getDefaultValue();
        }

        if (isResponsive) {
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

        return className.length > 0 ? className.join(' ') : '';
    }

    function renderDefaultValueOverlay() {
        const text =
            isResponsive && defaultDeviceIsDefined()
                ? `Define ${label} for ${currentDevice}`
                : 'Override default value';
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
                        setEditMode(currentDevice);
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

        if (repeatable && type != 'node') {
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
                    clientId={clientId}
                    blockKey={getKey()}
                    keys={getKeys()}
                    controllerValue={props.controllerValue}
                    valueProp={valueProp}
                    value={getValue()}
                    required_field={required_field}
                    args={args}
                    error={itemsError}
                    onChange={(newValue) => onChange(newValue)}
                    label={getLabel()}
                    updateBlockAttributes={props.updateBlockAttributes}
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
                    clientId={clientId}
                />,
            );
        }

        if (isResponsive && defaultDeviceIsDefined()) {
            const defaultDevice = Devices.getDefaultDevice();

            render = Render.responsiveTabComponent(
                getKey(),
                Object.keys(Devices.getMediaQueries()).map((layout) => {
                    return {
                        name: layout,
                        title: layout.charAt(0).toUpperCase() + layout.slice(1),
                        className: 'tab-' + layout,
                        active: currentDevice == layout ? true : false,
                        isDefault: defaultDevice == layout ? true : false,
                        isValid:
                            typeof value[layout] != 'undefined' ? true : false,
                    };
                }),
                render,
                (newDevice) => Devices.setCurrentDevice(newDevice),
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
