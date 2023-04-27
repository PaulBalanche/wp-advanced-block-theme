import {
    ButtonGroup,
    Button,
    Dashicon,
    Panel,
    PanelBody,
    PanelRow,
    TabPanel,
} from "@wordpress/components";

import { Attributes } from "./Attributes";
import { Controls } from "./Controls";

import { Sortable } from "./Sortable";

import __ODevices from "../Components/ODevices";

export class Render {
    static tabPanelComponent(
        id,
        tabs,
        inner,
        initialTabName = null,
        onSelect = null,
        extraClass = ""
    ) {
        return (
            <TabPanel
                key={id + "-tabPanel"}
                className={"tab-panel-wpe-component " + extraClass}
                activeClass="active-tab"
                initialTabName={initialTabName}
                tabs={tabs}
                onSelect={onSelect}
            >
                {inner}
            </TabPanel>
        );
    }

    static panelComponent(
        id,
        label,
        inner,
        initialOpen = false,
        extraClass = ""
    ) {
        var className = [];
        if (extraClass != "") className.push(extraClass);

        return (
            <Panel key={id + "-panel"} className={className.join(" ")}>
                {this.panelBodyComponent(id, label, inner, initialOpen)}
            </Panel>
        );
    }

    static panelBodyComponent(id, label, inner, initialOpen = false) {
        return (
            <PanelBody
                key={id + "-PanelBody"}
                title={label}
                initialOpen={label != null ? initialOpen : true}
            >
                <PanelRow>{inner}</PanelRow>
            </PanelBody>
        );
    }

    static fieldContainer(id, inner, extraClass = "") {
        const className =
            "basicField" + (extraClass != "" ? " " + extraClass : "");
        return (
            <div key={id + "-basicContainer"} className={className}>
                {inner}
            </div>
        );
    }

    static label(id, inner, extraClass = "") {
        const className =
            "components-base-control__label" +
            (extraClass != "" ? " " + extraClass : "");
        return (
            <div key={id + "-label"} className={className}>
                {inner}
            </div>
        );
    }

    static buttonAddRepeatableElt(
        id,
        keys,
        valueProp,
        controllerValue,
        componentInstance
    ) {
        return (
            <Button
                key={id + "-repeatableAddElt"}
                className="repeatableAddElt"
                onMouseDown={() => {
                    Attributes.addEltToRepeatable(
                        keys,
                        valueProp,
                        controllerValue,
                        false,
                        componentInstance
                    );
                }}
                variant="secondary"
            >
                <Dashicon icon="insert" /> Add
            </Button>
        );
    }

    static buttonRemoveRepeatableElt(id, keys, valueProp, componentInstance) {
        return (
            <Button
                key={id + "-repeatableRemoveElt"}
                className="repeatableRemoveElt"
                onMouseDown={() => {
                    Attributes.removeEltRepeatable(
                        keys,
                        valueProp,
                        componentInstance
                    );
                }}
                variant="secondary"
                isSmall
            >
                <Dashicon icon="no-alt" /> Remove
            </Button>
        );
    }

    static control(
        type,
        componentInstance,
        blockKey,
        label,
        keys,
        valueProp,
        controllerValue,
        repeatable,
        required_field,
        args,
        error = false,
        isResponsive = false
    ) {
        var control = [];

        const keyControl = keys.join('-');
        const currentDevice = __ODevices.getInstance().getCurrentDevice();

        label = ( required_field && label != null ) ? <>{label}<span className="o-required">*</span></> : label;
        label = ( error && typeof error == 'object' && typeof error.error == 'string' ) ? <>{label}<div className="error"><Dashicon icon="info" />{error.error}</div></> : label;
        label = ( error && typeof error == 'object' && typeof error.warning == 'string' ) ? <>{label}<div className="warning"><Dashicon icon="info" />{error.warning}</div></> : label;

        if( isResponsive ) {
            blockKey = blockKey + "-" + currentDevice;
            keys.push(currentDevice);
            controllerValue = ( controllerValue != null && typeof controllerValue == "object" && typeof controllerValue[currentDevice] != "undefined" ) ? controllerValue[currentDevice] : "";
        }

        if (repeatable) {
            if (
                controllerValue == null ||
                typeof controllerValue != "object" ||
                controllerValue.length == 0
            ) {
                controllerValue = [""];
            }

            const itemsError = ( error && typeof error == 'object' && typeof error.props == 'object' && Object.keys(error.props).length > 0 ) ? error.props : null;
            control.push(
                <Sortable
                    key={blockKey + "-Sortable"}
                    type={type}
                    componentInstance={componentInstance}
                    blockKey={blockKey}
                    keys={keys}
                    valueProp={valueProp}
                    controllerValue={controllerValue}
                    required_field={required_field}
                    args={args}
                    error={itemsError}
                />
            );

            control =
                label != null
                    ? Render.panelComponent(
                          blockKey,
                          label,
                          control,
                          true
                      )
                    : control;
        } else {
            control.push(
                Controls.render(
                    type,
                    componentInstance,
                    blockKey,
                    label,
                    keys,
                    valueProp,
                    typeof controllerValue != "undefined"
                        ? controllerValue
                        : "",
                    required_field,
                    args,
                    error
                )
            );
        }

        if( isResponsive ) {
            control = Render.responsiveTabComponent(
                blockKey,
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
                control,
                ( newDevice ) => {
                    componentInstance.setState( { currentEditedProp: keyControl });
                    __ODevices.getInstance().setCurrentDevice(newDevice);
                },
                type
            );
        }

        if( [ 'file', 'video', 'gallery', 'image' ].includes(type) ) {

            control = Render.panelComponent(
                blockKey,
                label,
                control,
                ( componentInstance.getCurrentEditedProp() == keyControl ) ? true : false
            );
        }

        if (label == null) return control;

        return Render.fieldContainer(blockKey, control, ( error && typeof error == 'object' && typeof error.error != 'undefined' ) ? 'has-error' : ( ( error && typeof error == 'object' && typeof error.warning != 'undefined' ) ? 'has-warning' : '' ) );
    }

    static repeatableObjectLabelFormatting(blockKey, valueProp, keyLoop) {
        var labelKey = Attributes.returnStringOrNumber(keyLoop, true) + 1;
        labelKey = labelKey < 10 ? "0" + labelKey : labelKey;
        labelKey = "#" + labelKey;

        var itemsProp = null;

        var valueProp = valueProp[keyLoop];
        if (
            valueProp != null &&
            typeof valueProp == "object" &&
            Object.keys(valueProp).length > 0
        ) {
            itemsProp = [];

            if (typeof valueProp.title != "undefined") {
                itemsProp.push(
                    <li key={blockKey + "-repeatableObjectLabel-key"}>
                        <span className="value">{valueProp.title}</span>
                    </li>
                );
            } else if (typeof valueProp.name != "undefined") {
                itemsProp.push(
                    <li key={blockKey + "-repeatableObjectLabel-key"}>
                        <span className="value">{valueProp.name}</span>
                    </li>
                );
            } else if (typeof valueProp.id != "undefined") {
                itemsProp.push(
                    <li key={blockKey + "-repeatableObjectLabel-key"}>
                        <span className="value">{valueProp.id}</span>
                    </li>
                );
            } else {
                for (var i in valueProp) {
                    itemsProp.push(
                        <li key={blockKey + "-repeatableObjectLabel-key-" + i}>
                            <span className="key">{i + ": "}</span>
                            <span className="value">{valueProp[i]} </span>
                        </li>
                    );
                }
            }

            itemsProp = (
                <ul
                    key={blockKey + "-repeatableObjectLabel-ul"}
                    className="props"
                >
                    {itemsProp}
                </ul>
            );
        }

        return (
            <div
                key={blockKey + "-repeatableObjectLabel"}
                className="repeatableObjectLabel"
            >
                <div
                    key={blockKey + "-repeatableObjectLabel-id"}
                    className="id"
                >
                    {labelKey}
                </div>
                {itemsProp}
            </div>
        );
    }

    static responsiveTabComponent(
        id,
        tabs,
        inner,
        onSelect = null,
        type
    ) {

        return (
            <div
                key={id + "-responsiveTabPanel"}
                className={"responsive-tab-panel-wpe-component " + type}
            >
                <div className="responsive-buttons-container">
                    <ButtonGroup>
                        { tabs.map((layout) => {

                            return <Button
                                key={id + "-responsiveTabPanel-Button-" + layout.name}
                                onMouseDown={() => {
                                    onSelect(layout.name)
                                }}
                                isPressed={(layout.active)}
                            >{Render.getDeviceLabel(layout.name)}</Button>
                        }) }
                    </ButtonGroup>
                </div>
                {inner}
            </div>
        );
    }

    static getDeviceLabel( device ) {

        const icons = {
            mobile: 'smartphone',
            tablet: 'tablet',
            desktop: 'laptop',
            wide: 'desktop'
        };
        
        return ( typeof icons[device] != 'undefined' ) ? <Dashicon icon={icons[device]} /> : device.charAt(0).toUpperCase() + device.slice(1);
    }
}
