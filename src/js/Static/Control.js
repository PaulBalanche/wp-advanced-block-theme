
import { Dashicon } from "@wordpress/components";
import { Sortable } from "./Sortable";
import __ODevices from "../Components/ODevices";
import { Render } from './Render';
import { Attributes } from "./Attributes";
import { BaseControl } from "../controls/BaseControl";
import WysiwygControl from "../controls/WysiwygControl/WysiwygControl";

export function Control(props){

    const id = props.keys.join('-');
    const key = props.blockKey;
    const label = props.label;
    const type = props.type;
    const keys = props.keys;
    const valueProp = props.valueProp;
    const controllerValue = props.controllerValue;
    const required_field = props.required_field;
    const repeatable = props.repeatable;
    const isResponsive = props.isResponsive;
    const args = props.args;
    const error = props.error;
    const componentInstance = props.componentInstance;

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

    function getControllerValue() {
    
        let controllerValueFormatted = ( controllerValue != null && typeof controllerValue == "object" ) ? Object.assign( [], controllerValue ) : controllerValue;

        if( isResponsive ) {
            const currentDevice = __ODevices.getInstance().getCurrentDevice();
            if( controllerValueFormatted != null && typeof controllerValueFormatted == "object" && typeof controllerValueFormatted[currentDevice] != "undefined" ) {
                controllerValueFormatted = controllerValueFormatted[currentDevice];
            }
        }

        if( repeatable ) {
            if ( controllerValueFormatted == null || typeof controllerValueFormatted != "object" || controllerValueFormatted.length == 0 ) {
                controllerValueFormatted = [""];
            }
        }

        return controllerValueFormatted;
    }

    function renderWysiwyg() {

        return <WysiwygControl
            id={getKey()}
            key={getKey()}
            label={getLabel()}
            keys={getKeys()}
            valueProp={valueProp}
            objectValue={getControllerValue()}
            required={required_field}
            componentInstance={componentInstance}
        />
    }



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
            controllerValue={getControllerValue()}
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
            value={getControllerValue()}
            defaultValue={args.default}
            type={type}
            args={args}
            onSubmit={ (newValue) => {
                Attributes.updateAttributes(
                    getKeys(),
                    valueProp,
                    newValue,
                    false,
                    componentInstance
                );
                componentInstance.updatePreview();
            }}
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

    if( getLabel() == null ) {
        return render;
    }

    return Render.fieldContainer(getKey(), render, ( error && typeof error == 'object' && typeof error.error != 'undefined' ) ? 'has-error' : ( ( error && typeof error == 'object' && typeof error.warning != 'undefined' ) ? 'has-warning' : '' ) );

}