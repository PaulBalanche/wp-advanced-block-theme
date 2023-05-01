
import { Button, Dashicon } from "@wordpress/components";
import { useState } from "@wordpress/element";

import { Sortable } from "./Sortable";
import __ODevices from "../Components/ODevices";
import { Render } from './Render';
import { Attributes } from "./Attributes";
import { BaseControl } from "../controls/BaseControl";

export function Control(props){

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

    const [value, setValue] = useState( props.controllerValue );
    const [updating, setUpdating] = useState( false );
    const [editMode, setEditMode] = useState( ( props.controllerValue != null ||  typeof props.args.default == 'undefined' || props.args.default == null || typeof props.args.default.value == 'undefined' ) );

    function onChange(newValue) {

        setValue(newValue);
        setUpdating(true);
    }

    function onSubmit() {

        Attributes.updateAttributes(
            getKeys(),
            valueProp,
            value,
            false,
            componentInstance
        );
        setUpdating(false);
        componentInstance.updatePreview();
    }

    function onCancel() {

        setValue(props.controllerValue);
        setUpdating(false);
    }

    function getLabel() {

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

    function getKeys() {

        let keysFormatted = Object.assign( [], keys );

        if( isResponsive ) {
            const currentDevice = __ODevices.getInstance().getCurrentDevice();
            keysFormatted.push(currentDevice);
        }

        return keysFormatted;
    }

    function getValue() {
    
        let getValue = ( value != null && typeof value == "object" ) ? Object.assign( [], value ) : value;

        if( isResponsive ) {
            const currentDevice = __ODevices.getInstance().getCurrentDevice();
            if( getValue != null && typeof getValue == "object" && typeof getValue[currentDevice] != "undefined" ) {
                getValue = getValue[currentDevice];
            }
        }

        if( repeatable ) {
            if ( getValue == null || typeof getValue != "object" || getValue.length == 0 ) {
                getValue = [""];
            }
        }

        if( ! editMode ) {
            getValue = args.default.value;
        }
        
        return getValue;
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

        if( updating ) {
            className.push('updating');
        }

        return ( className.length > 0 ) ? className.join(' ') : '';
    }

    function renderSavedButton() {

        return ( editMode && updating ) ?
            <div key={getKey() + "buttonsChangesContainer"} className="buttons-changes-container">
                <Button
                    key={getKey() + "submitChanges-button"}
                    onMouseDown={ () => onSubmit() }
                    variant="primary"
                >
                    <Dashicon icon="saved" /> Save changes
                </Button>
                <Button
                    key={getKey() + "cancelChanges-button"}
                    onMouseDown={ () => onCancel() }
                    variant="secondary"
                    className="is-destructive"
                >
                    <Dashicon icon="no" /> Cancel
                </Button>
            </div>
        : null;
    }
    
    function renderDefaultValueOverlay() {

        return ( ! editMode ) ?
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

    function render() {

        /** Rendering */
        let render = [];

        if( repeatable ) {

            const itemsError = ( error && typeof error == 'object' && typeof error.props == 'object' && Object.keys(error.props).length > 0 ) ? error.props : null;

            render.push( <Sortable
                key={getKey() + "-Sortable"}
                type={type}
                componentInstance={componentInstance}
                blockKey={getKey()}
                keys={getKeys()}
                valueProp={valueProp}
                controllerValue={getValue()}
                required_field={required_field}
                args={args}
                error={itemsError}
            /> )

            render =
                getLabel() != null
                    ? Render.panelComponent(
                        getKey(),
                        getLabel(),
                        render,
                        true
                        )
                    : render;
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

        if( isResponsive ) {

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

        if( [ 'file', 'video', 'gallery', 'image' ].includes(type) ) {

            render = Render.panelComponent(
                getKey(),
                getLabel(),
                render,
                ( componentInstance.getCurrentEditedProp() == id ) ? true : false
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
        </>,
        getContainerClassName()
    ) 
}