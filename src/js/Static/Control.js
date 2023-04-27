import { Component } from "@wordpress/element";
import { Dashicon } from "@wordpress/components";
import { Sortable } from "./Sortable";
import __ODevices from "../Components/ODevices";
import { Render } from './Render';

import { Text } from "../controls/Text";
import { Select } from "../controls/Select";
import WysiwygControl from "../Controls/WysiwygControl/WysiwygControl";

export class Control extends Component {

    constructor() {
        super(...arguments);

        this.id = this.props.keys.join('-')
        this.key = this.props.blockKey
        this.label = this.props.label
        this.type = this.props.type
        this.keys = this.props.keys
        this.valueProp = this.props.valueProp
        this.controllerValue = this.props.controllerValue
        this.required_field = this.props.required_field
        this.repeatable = this.props.repeatable
        this.isResponsive = this.props.isResponsive
        this.args = this.props.args
        this.error = this.props.error
        this.componentInstance = this.props.componentInstance
    }

    getLabel() {

        let labelFormatted = [ this.label ];

        if( this.required_field && this.label != null ) {
            labelFormatted.push(<span key={this.getKey() + '-label-required'} className="o-required">*</span>)
        }

        if( this.error && typeof this.error == 'object' && typeof this.error.error == 'string' ) {
            labelFormatted.push(<div key={this.getKey() + '-label-error'} className="error"> <Dashicon icon="info" /> {this.error.error} </div>)
        }

        if( this.error && typeof this.error == 'object' && typeof this.error.warning == 'string' ) {
            labelFormatted.push(<div key={this.getKey() + '-label-warging'} className="warning"><Dashicon icon="info" />{this.error.warning}</div>)
        }

        return labelFormatted;
    }

    getKey() {
        let keyFormatted = Object.assign( [], this.key );

        if( this.isResponsive ) {
            const currentDevice = __ODevices.getInstance().getCurrentDevice();
            keyFormatted = keyFormatted + "-" + currentDevice;
        }

        return keyFormatted;
    }

    getKeys() {

        let keysFormatted = Object.assign( [], this.keys );

        if( this.isResponsive ) {
            const currentDevice = __ODevices.getInstance().getCurrentDevice();
            keysFormatted.push(currentDevice);
        }

        return keysFormatted;
    }

    getControllerValue() {
    
        let controllerValueFormatted = ( this.controllerValue != null && typeof this.controllerValue == "object" ) ? Object.assign( [], this.controllerValue ) : this.controllerValue;

        if( this.isResponsive ) {
            const currentDevice = __ODevices.getInstance().getCurrentDevice();
            if( controllerValueFormatted != null && typeof controllerValueFormatted == "object" && typeof controllerValueFormatted[currentDevice] != "undefined" ) {
                controllerValueFormatted = controllerValueFormatted[currentDevice];
            }
        }

        if( this.repeatable ) {
            if ( controllerValueFormatted == null || typeof controllerValueFormatted != "object" || controllerValueFormatted.length == 0 ) {
                controllerValueFormatted = [""];
            }
        }

        return controllerValueFormatted;
    }

    renderText() {

        return <Text
            key={this.getKey()}
            label={this.getLabel()}
            keys={this.getKeys()}
            valueProp={this.valueProp}
            objectValue={this.getControllerValue()}
            isNumber={this.args.isNumber}
            defaultValue={this.args.default}
            componentInstance={this.componentInstance}
        />
    }
    
    renderSelect() {

        return <Select
            key={this.getKey()}
            label={this.getLabel()}
            keys={this.getKeys()}
            valueProp={this.valueProp}
            objectValue={this.getControllerValue()}
            options={this.args.options}
            defaultValue={this.args.default}
            componentInstance={this.componentInstance}
        />
    }

    renderWysiwyg() {

        return <WysiwygControl
            id={this.getKey()}
            key={this.getKey()}
            label={this.getLabel()}
            keys={this.getKeys()}
            valueProp={this.valueProp}
            objectValue={this.getControllerValue()}
            required={this.required_field}
            componentInstance={this.componentInstance}
        />
    }
    
    render() {

        let render = [];

        if( this.repeatable ) {

            const itemsError = ( this.error && typeof this.error == 'object' && typeof this.error.props == 'object' && Object.keys(this.error.props).length > 0 ) ? this.error.props : null;

            render.push( <Sortable
                key={this.getKey() + "-Sortable"}
                type={this.type}
                componentInstance={this.componentInstance}
                blockKey={this.getKey()}
                keys={this.getKeys()}
                valueProp={this.valueProp}
                controllerValue={this.getControllerValue()}
                required_field={this.required_field}
                args={this.args}
                error={itemsError}
            /> )

            render =
                this.getLabel() != null
                    ? Render.panelComponent(
                        this.getKey(),
                        this.getLabel(),
                        render,
                        true
                      )
                    : render;
        }
        else {
            
            switch( this.props.type ) {

                case "string":
                case "number":
                case "integer":
                    render.push( this.renderText() )
                    break;

                case "richText":
                case "wysiwyg":
                    render.push( this.renderWysiwyg() )
                    break;

                case "select":
                case "color":
                case "spaces":
                    render.push( this.renderSelect() )
                    break;
        }
        }

        if( this.isResponsive ) {

            const currentDevice = __ODevices.getInstance().getCurrentDevice();

            render = Render.responsiveTabComponent(
                this.getKey(),
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
                    this.componentInstance.setState( { currentEditedProp: this.id });
                    __ODevices.getInstance().setCurrentDevice(newDevice);
                },
                this.type
            );
        }

        if( [ 'file', 'video', 'gallery', 'image' ].includes(this.type) ) {

            render = Render.panelComponent(
                this.getKey(),
                this.getLabel(),
                render,
                ( this.componentInstance.getCurrentEditedProp() == this.id ) ? true : false
            );
        }

        if( this.getLabel() == null ) {
            return render;
        }

        return Render.fieldContainer(this.getKey(), render, ( this.error && typeof this.error == 'object' && typeof this.error.error != 'undefined' ) ? 'has-error' : ( ( this.error && typeof this.error == 'object' && typeof this.error.warning != 'undefined' ) ? 'has-warning' : '' ) );
    }

}