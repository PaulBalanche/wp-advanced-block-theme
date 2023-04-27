import { TextControl } from "@wordpress/components";

import { __experimentalLinkControl as LinkControl } from "@wordpress/block-editor";

import { Attributes } from "../Static/Attributes";
import { Render } from "../Static/Render";

export function renderLink(
    componentInstance,
    id,
    label,
    keys,
    valueProp,
    objectValue,
    required = false
) {

    if( objectValue == null || typeof objectValue == "undefined" || typeof objectValue == "string") {
        objectValue = {
            text: ''
        };
    }
    else if(typeof objectValue == "object" && typeof objectValue.text == "undefined") {
        objectValue.text = '';
    }

    let inner = Render.fieldContainer(
        id + "_link",
        <div
            key={id + "-LinkControlComponentsBaseControl"}
            className="components-base-control"
        >
            <div
                key={id + "-LinkControlComponentsBaseControlField"}
                className="components-base-control__field"
            >
                <div
                    key={id + "-LinkControlContainer"}
                    className="link-control-container"
                >
                    <TextControl
                        key={id + "-text"}
                        label={"Text"}
                        type={"text"}
                        value={objectValue.text}
                        onChange={(newValue) => {
                            Attributes.updateAttributes(
                                keys.concat("text"),
                                valueProp,
                                newValue,
                                false,
                                componentInstance
                            );
                        }}
                        onBlur={(e) => {
                            componentInstance.updatePreview();
                        }}
                    />
                    <LinkControl
                        key={id + "-LinkControl"}
                        className="wp-block-navigation-link__inline-link-input"
                        value={objectValue}
                        settings={[
                            {
                                id: "url",
                                title: "URL ...",
                            },
                            {
                                id: "opensInNewTab",
                                title: "Open in new tab",
                            },
                        ]}
                        onChange={({
                            url: newURL,
                            opensInNewTab: newOpensInNewTab,
                        }) => {
                            let newObjectValue =
                                typeof newURL == "string"
                                    ? {
                                          text: objectValue.text,
                                          url: newURL,
                                          opensInNewTab: newOpensInNewTab,
                                      }
                                    : { text: objectValue.text };
                            Attributes.updateAttributes(
                                keys,
                                valueProp,
                                newObjectValue,
                                false,
                                componentInstance
                            );
                            componentInstance.updatePreview();
                        }}
                    />
                </div>
            </div>
        </div>
    );

    return Render.panelComponent(id, label, inner, false);
}
