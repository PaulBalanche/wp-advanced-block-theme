import { Attributes } from "../Static/Attributes";
import { Render } from "../Static/Render";

export function renderObject(
    componentInstance,
    id,
    label,
    keys,
    valueProp,
    objectValue,
    initialOpen = false,
    required = false
) {
    let fieldsetObject = [];

    for (const [keySubProp, valueSubProp] of Object.entries(objectValue)) {
        fieldsetObject.push(
            Attributes.renderProp(
                valueSubProp,
                keys.concat(keySubProp),
                valueProp,
                componentInstance
            )
        );
    }

    if (label == null) return fieldsetObject;

    // let currentValueAttribute = valueProp;
    // keys.forEach( element => { currentValueAttribute = ( currentValueAttribute != null && typeof currentValueAttribute == 'object' && currentValueAttribute.hasOwnProperty(element) && typeof currentValueAttribute[element] != "undefined" ) ? currentValueAttribute[element] : ""; } );
    // if( currentValueAttribute == '' ) {
    //     initialOpen = true;
    // }

    return Render.panelComponent(id, label, fieldsetObject, initialOpen);
}
