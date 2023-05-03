
import { Button, Dashicon } from "@wordpress/components";
import { useState } from "@wordpress/element";

import { Sortable } from "./Sortable";
import __ODevices from "../Components/ODevices";
import { Render } from './Render';
import { Attributes } from "./Attributes";
import { BaseControl } from "../controls/BaseControl";

export function Control(props) {

    const id = props.keys.join('-');
    const key = props.blockKey;
    const label = props.label;
    const type = props.type;
    const keys = props.keys;
    const valueProp = props.valueProp;
    const required_field = props.required_field;
    const repeatable = props.repeatable;
    const isResponsive = props.isResponsive;
    const args = props.args;
    const error = props.error;
    const componentInstance = props.componentInstance;
    const isSortableItem = ( typeof props.sortableIndex != 'undefined' );
    const directSubmission = ( [ 'file', 'video', 'gallery', 'image', 'datetime', 'checkbox', 'boolean', 'switch' ].includes(props.type) );

    const [value, setValue] = useState( props.controllerValue );
    const [updating, setUpdating] = useState( false );
    const [editMode, setEditMode] = useState( ( props.controllerValue != null ||  typeof props.args.default == 'undefined' || props.args.default == null || typeof props.args.default.value == 'undefined' ) );
    const [defaultDeviceOverlay, setDefaultDeviceOverlay] = useState( true );

    function onChange(newValue) {

        if( isResponsive ) {
            newValue = { ...value, ...{ [ __ODevices.getInstance().getCurrentDevice() ]: newValue} };
        }
        setValue(newValue);
    
        if( isSortableItem && typeof props.onChange != 'undefined' ) {
            props.onChange( newValue, [props.sortableIndex] );
        }

        if( directSubmission ) {
            directSubmit(newValue);
        }
        else {
            setUpdating(true);
        }
    }
    
    function onSubmit() {

        Attributes.updateAttributes(
            keys,
            valueProp,
            value,
            false,
            componentInstance
        );
        setUpdating(false);
        componentInstance.updatePreview();
    }

    function directSubmit(newValue) {
        Attributes.updateAttributes(
            keys,
            valueProp,
            newValue,
            false,
            componentInstance
        );
        componentInstance.updatePreview();
    }

    // function onCancel() {

    //     setValue(props.controllerValue);
    //     setUpdating(false);
    // }

    function getLabel() {

        if( label == null ) {
            return null;
        }

        let labelFormatted = [ label ];

        if( required_field && label != null ) {
            labelFormatted.push(<span key={getKey() + '-label-required'} className="o-required">*</span>)
        }

        if( error && typeof error == 'object' && typeof error.error == 'string' ) {
            labelFormatted.push(<div key={getKey() + '-label-error'} className="error"> <Dashicon icon="info" /> {error.error} </div>)
        }

        if( error && typeof error == 'object' && typeof error.warning == 'string' ) {
            labelFormatted.push(<div key={getKey() + '-label-warging'} className="warning"><Dashicon icon="info" />{error.warning}</div>)
        }

        return labelFormatted;
    }

    function getKey() {
        let keyFormatted = Object.assign( [], key );

        if( isResponsive ) {
            const currentDevice = __ODevices.getInstance().getCurrentDevice();
            keyFormatted = keyFormatted + "-" + currentDevice;
        }

        return keyFormatted;
    }

    function getKeys( ) {

        let keysFormatted = Object.assign( [], keys );

        if( isResponsive ) {
            const currentDevice = __ODevices.getInstance().getCurrentDevice();
            keysFormatted.push(currentDevice);
        }

        return keysFormatted;
    }

    function getValue() {

        if( ! editMode ) {
            return args.default.value;
        }
    
        if( isResponsive ) {

            const currentDevice = __ODevices.getInstance().getCurrentDevice();
            if( value != null && typeof value == "object" && typeof value[currentDevice] != "undefined" ) {
                return value[currentDevice];
            }
            else {
                return "";
            }
        }

        if( repeatable ) {
            if ( value == null || typeof value != "object" || value.length == 0 ) {
                return [""];
            }
        }
        
        return value;
    }

    function defaultDeviceIsDefined() {

        return ( value != null && typeof value == "object" && typeof value[ __ODevices.getInstance().getDefaultDevice() ] != "undefined" );
    }

    function getContainerClassName() {

        const className = [];
        if( error && error != null && typeof error == 'object' ) {
            if( typeof error.error != 'undefined' ) {
                className.push('has-error')
            }
            else if( typeof error.warning != 'undefined' ) {
                className.push('has-warning')
            }
        }

        if( updating && ! isSortableItem && ! directSubmission ) {
            className.push('updating');
        }

        return ( className.length > 0 ) ? className.join(' ') : '';
    }

    function renderSavedButton() {

        return ( editMode && updating && ! isSortableItem && ! directSubmission ) ?
            <div key={getKey() + "buttonsChangesContainer"} className="buttons-changes-container">
                <Button
                    key={getKey() + "submitChanges-button"}
                    onMouseDown={ () => onSubmit() }
                    variant="primary"
                >
                    <Dashicon icon="saved" /> Apply
                </Button>
                {/* <Button
                    key={getKey() + "cancelChanges-button"}
                    onMouseDown={ () => onCancel() }
                    variant="secondary"
                    className="is-destructive"
                >
                    <Dashicon icon="no" /> Cancel
                </Button> */}
            </div>
        : null;
    }
    
    function renderDefaultValueOverlay() {

        return ( ! editMode && ! isSortableItem ) ?
            <div key={getKey() + "defaultOverlayContainer"} className="default-overlay-container">
                <Button
                    key={getKey() + "defaultOverlayContainer-button"}
                    onMouseDown={ () => { setEditMode(true) } }
                    variant="primary"
                >
                    <Dashicon icon="edit" /> Override default value
                </Button>
            </div>
        : null;
    }

    function renderDefaultDeviceOverlay() {

        return ( isResponsive && defaultDeviceIsDefined() && __ODevices.getInstance().getCurrentDevice() != __ODevices.getInstance().getDefaultDevice() && defaultDeviceOverlay && typeof value[__ODevices.getInstance().getCurrentDevice()] == "undefined") ?
            <div key={getKey() + "defaultDeviceContainer"} className="default-overlay-container">
                <Button
                    key={getKey() + "defaultDeviceContainer-button"}
                    onMouseDown={ () => { setDefaultDeviceOverlay(false) } }
                    variant="primary"
                >
                    <Dashicon icon="edit" /> Override {__ODevices.getInstance().getDefaultDevice()} value
                </Button>
            </div>
        : null;
    }

    function render() {

        /** Rendering */
        let render = [];

        if( repeatable ) {

            const itemsError = ( error && typeof error == 'object' && typeof error.props == 'object' && Object.keys(error.props).length > 0 ) ? error.props : null;

            render.push( <Sortable
                key={getKey() + "-Sortable"}
                id={getKey() + "-Sortable"}
                type={type}
                componentInstance={componentInstance}
                blockKey={getKey()}
                keys={getKeys()}
                valueProp={valueProp}
                value={getValue()}
                required_field={required_field}
                args={args}
                error={itemsError}
                onChange={ (newValue) => onChange(newValue) }
                label={getLabel()}
            /> )
        }
        else {
            
            render.push( <BaseControl
                key={getKey()}
                keys={getKeys()}
                valueProp={valueProp}
                id={getKey()}
                label={getLabel()}
                value={getValue()}
                defaultValue={args.default}
                type={type}
                args={args}
                error={error}
                onChange={ (newValue) => onChange(newValue) }
                onSubmit={ () => onSubmit() }
                componentInstance={componentInstance}
            /> )
        }

        if( isResponsive && defaultDeviceIsDefined() ) {

            const currentDevice = __ODevices.getInstance().getCurrentDevice();

            render = Render.responsiveTabComponent(
                getKey(),
                Object.keys(
                    __ODevices.getInstance().getMediaQueries()
                ).map((layout) => {
                    return {
                        name: layout,
                        title:
                            layout.charAt(0).toUpperCase() +
                            layout.slice(1),
                        className: "tab-" + layout,
                        active: ( currentDevice == layout ) ? true : false
                    };
                }),
                render,
                ( newDevice ) => {
                    componentInstance.setState( { currentEditedProp: id });
                    __ODevices.getInstance().setCurrentDevice(newDevice);
                },
                type
            );
        }
        
        return render;
    }

    return Render.fieldContainer(
        getKey(),
        <>
            {render()}
            {renderSavedButton()}
            {renderDefaultValueOverlay()}
            {renderDefaultDeviceOverlay()}
        </>,
        getContainerClassName()
    ) 
}