import __ODevices from "../Components/ODevices";
import { Render } from "./Render";

export class Attributes {
    static returnStringOrNumber(value, isNumber = false) {
        return !!isNumber ? parseInt(value, 10) : value;
    }

    static addEltToRepeatable(
        arrayKey,
        currentValueProp,
        currentValueRepeatableField,
        isNumber = false,
        componentInstance
    ) {
        Attributes.updateAttributes(
            arrayKey,
            currentValueProp,
            currentValueRepeatableField.concat(""),
            isNumber,
            componentInstance
        );
    }

    static removeEltRepeatable(arrayKey, currentValueProp, componentInstance) {
        Attributes.updateAttributes(
            arrayKey,
            currentValueProp,
            false,
            false,
            componentInstance
        );
    }

    static fileSizeFormat(filesizeInBytes) {
        if (filesizeInBytes > 1000000)
            return Math.round(filesizeInBytes / 10000) / 100 + " Mo";
        else return Math.round(filesizeInBytes / 1000) + " Ko";
    }

    static updateAttributes(
        arrayKey,
        currentValue,
        newValue,
        isNumber = false,
        componentInstance
    ) {
        const newValueToUpdate = Attributes.recursiveUpdateObjectFromObject(
            arrayKey,
            currentValue,
            newValue,
            isNumber
        );
        componentInstance.setAttributes({
            [arrayKey[0]]: newValueToUpdate[arrayKey[0]],
        });
    }

    static recursiveUpdateObjectFromObject(
        arrayKey,
        fromObject,
        newValue,
        isNumber = false
    ) {
        const currentArrayKey = Object.assign([], arrayKey);
        const firstElement = currentArrayKey.shift();

        if (
            typeof fromObject != "object" ||
            (Array.isArray(fromObject) && isNaN(firstElement)) ||
            (!Array.isArray(fromObject) && typeof firstElement == "number")
        )
            fromObject = isNaN(firstElement) ? {} : [];

        let objectReturned = Array.isArray(fromObject) ? [] : {};

        for (const [key, val] of Object.entries(fromObject)) {
            if (key == firstElement) {
                if (currentArrayKey.length > 0)
                    objectReturned[key] =
                        Attributes.recursiveUpdateObjectFromObject(
                            currentArrayKey,
                            val,
                            newValue,
                            isNumber
                        );
                else if (!!newValue)
                    objectReturned[key] = Attributes.returnStringOrNumber(
                        newValue,
                        isNumber
                    );
            } else objectReturned[key] = val;
        }

        if (typeof objectReturned[firstElement] == "undefined") {
            if (currentArrayKey.length > 0)
                objectReturned[firstElement] =
                    Attributes.recursiveUpdateObjectFromObject(
                        currentArrayKey,
                        undefined,
                        newValue,
                        isNumber
                    );
            else if (!!newValue)
                objectReturned[firstElement] = Attributes.returnStringOrNumber(
                    newValue,
                    isNumber
                );
        }

        // Re-index in case of element suppression
        if (currentArrayKey.length == 0 && !newValue) {
            for (let index = 0; index < objectReturned.length; index++) {
                if (typeof objectReturned[index] == "undefined")
                    objectReturned.splice(index, 1);
            }
        }

        return objectReturned;
    }

    static renderProp(prop, keys, valueProp, componentInstance, error = false) {
        const type = prop.type.toLowerCase();
        const blockKey =
            componentInstance.props.clientId + "-" + keys.join("-");
        const repeatable =
            typeof prop.repeatable != "undefined" && !!prop.repeatable
                ? true
                : false;
        const label =
            typeof prop.label != "undefined"
                ? prop.label
                : typeof prop.title != "undefined"
                ? prop.title
                : keys.slice(-1);
        const required_field =
            typeof prop.required != "undefined" && prop.required ? true : false;

        let currentValueAttribute = valueProp;
        keys.forEach((element) => {
            currentValueAttribute =
                currentValueAttribute != null &&
                typeof currentValueAttribute == "object" &&
                currentValueAttribute.hasOwnProperty(element) &&
                typeof currentValueAttribute[element] != "undefined"
                    ? currentValueAttribute[element]
                    : "";
        });

        var args = {};
        switch (type) {
            case "string":
                args = { isNumber: false };
                break;
            case "number":
                args = { isNumber: false };
                break;
            case "integer":
                args = { isNumber: true };
                break;
            case "boolean":
                args = { help: prop.help };
                break;
            case "select":
            case "color":
                args = {
                    options: prop.options,
                    default:
                        typeof prop.default != "undefined"
                            ? prop.default
                            : null,
                };
                break;
            case "radio":
            case "checkbox":
                args = { options: prop.options };
                break;
            case "relation":
                args = { entity: prop.entity };
                break;
            case "image":
                args = {
                    type: type,
                    args:
                        prop.image && typeof prop.image == "object"
                            ? prop.image
                            : {},
                };
                prop.responsive = true;
                break;
            case "video":
                args = {
                    type: type,
                    args:
                        prop.video && typeof prop.video == "object"
                            ? prop.video
                            : {},
                };
                prop.responsive = true;
                break;
            case "file":
            case "gallery":
                args = { type: type };
                prop.responsive = true;
                break;
            case "object":
                if (typeof prop.props != "object") {
                    return;
                }
                args = { props: prop.props };
                break;
        }

        return Render.control(
            type,
            componentInstance,
            blockKey,
            label,
            keys,
            valueProp,
            currentValueAttribute,
            repeatable,
            required_field,
            args,
            error,
            ( typeof prop.responsive != "undefined" && !!prop.responsive ) ? true : false
        );
    }

    static initComponentAttributes(attributes, props) {
        for (const [key, value] of Object.entries(props)) {
            if (typeof value != "object" || value == null) continue;

            let currentType =
                typeof value.repeatable != "undefined" && value.repeatable && ! ['image', 'video', 'file', 'image'].includes(value.type.toLowerCase())
                    ? "array"
                    : value.type.toLowerCase();
            currentType =
                typeof value.responsive != "undefined" && value.responsive
                    ? "object"
                    : currentType;

            switch (currentType) {
                case "string":
                case "text":
                case "richText":
                case "select":
                case "color":
                case "radio":
                case "relation":
                case "date":
                case "number":
                case "integer":
                    attributes[key] = {
                        type: "string",
                    };
                    break; 

                case "object":
                case "link":
                case "image":
                case "video":
                case "file":
                case "gallery":
                case "wysiwyg":
                    attributes[key] = {
                        type: "object",
                    };
                    break;

                case "array":
                case "checkbox":                    
                    attributes[key] = {
                        type: "array",
                    };
                    break;

                case "boolean":
                    attributes[key] = {
                        type: "boolean",
                    };
                    break;
            }
        }
    }
}
