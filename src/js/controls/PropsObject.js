import { Attributes } from "../Static/Attributes";
import { Render } from "../Static/Render";

export function PropsObject({id, label, props, keys, valueProp, componentInstance}) {
    
    let fieldsetObject = [];

    for (const [keySubProp, valueSubProp] of Object.entries(props)) {

        // const subPropError = ( error && typeof error == 'object' && error != null && typeof error.props == 'object' && typeof error.props[keySubProp] != 'undefined' ) ? error.props[keySubProp] : false;
        const subPropError = false;

        fieldsetObject.push(
            Attributes.renderProp(
                valueSubProp,
                keys.concat(keySubProp),
                valueProp,
                componentInstance,
                subPropError
            )
        );
    }

    if (label == null) return fieldsetObject;

    return Render.panelComponent(id, label, fieldsetObject, false);
}