import { Control } from './Control';

export class Attributes {
    static returnStringOrNumber(value, isNumber = false) {
        return !!isNumber ? parseInt(value, 10) : value;
    }

    static addEltToRepeatable(
        arrayKey,
        currentValueProp,
        currentValueRepeatableField,
        isNumber = false,
        componentInstance,
    ) {
        Attributes.updateAttributes(
            arrayKey,
            currentValueProp,
            currentValueRepeatableField.concat(''),
            isNumber,
            componentInstance,
        );
    }

    static removeEltRepeatable(arrayKey, currentValueProp, componentInstance) {
        Attributes.updateAttributes(
            arrayKey,
            currentValueProp,
            false,
            false,
            componentInstance,
        );
    }

    static fileSizeFormat(filesizeInBytes) {
        if (filesizeInBytes > 1000000)
            return Math.round(filesizeInBytes / 10000) / 100 + ' Mo';
        else return Math.round(filesizeInBytes / 1000) + ' Ko';
    }

    static updateAttributes(
        arrayKey,
        currentValue,
        newValue,
        isNumber = false,
        componentInstance,
    ) {
        const newValueToUpdate = Attributes.recursiveUpdateObjectFromObject(
            arrayKey,
            currentValue,
            newValue,
            isNumber,
        );
        componentInstance.setAttributes({
            [arrayKey[0]]: newValueToUpdate[arrayKey[0]],
        });
    }

    static recursiveUpdateObjectFromObject(
        arrayKey,
        fromObject,
        newValue,
        isNumber = false,
    ) {
        const currentArrayKey = Object.assign([], arrayKey);
        const firstElement = currentArrayKey.shift();
        if (
            typeof fromObject != 'object' ||
            fromObject == null ||
            (Array.isArray(fromObject) && isNaN(firstElement)) ||
            (!Array.isArray(fromObject) && typeof firstElement == 'number')
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
                            isNumber,
                        );
                // else if (!!newValue)
                else
                    objectReturned[key] = Attributes.returnStringOrNumber(
                        newValue,
                        isNumber,
                    );
            } else objectReturned[key] = val;
        }

        if (typeof objectReturned[firstElement] == 'undefined') {
            if (currentArrayKey.length > 0)
                objectReturned[firstElement] =
                    Attributes.recursiveUpdateObjectFromObject(
                        currentArrayKey,
                        undefined,
                        newValue,
                        isNumber,
                    );
            else if (!!newValue)
                objectReturned[firstElement] = Attributes.returnStringOrNumber(
                    newValue,
                    isNumber,
                );
        }

        // Re-index in case of element suppression
        if (currentArrayKey.length == 0 && !newValue) {
            for (let index = 0; index < objectReturned.length; index++) {
                if (typeof objectReturned[index] == 'undefined')
                    objectReturned.splice(index, 1);
            }
        }

        return objectReturned;
    }

    static renderProp(prop, keys, valueProp, componentInstance, error = false) {
        const type = prop.type.toLowerCase();
        const blockKey =
            componentInstance.props.clientId + '-' + keys.join('-');
        const repeatable =
            typeof prop.repeatable != 'undefined' && !!prop.repeatable
                ? true
                : false;
        const label =
            typeof prop.label != 'undefined'
                ? prop.label
                : typeof prop.title != 'undefined'
                ? prop.title
                : keys.slice(-1);
        const description =
            typeof prop.description != 'undefined' ? prop.description : null;
        const required_field =
            typeof prop.required != 'undefined' && prop.required ? true : false;

        let currentValueAttribute = valueProp;
        keys.forEach((element) => {
            currentValueAttribute =
                currentValueAttribute != null &&
                typeof currentValueAttribute == 'object' &&
                currentValueAttribute.hasOwnProperty(element) &&
                typeof currentValueAttribute[element] != 'undefined'
                    ? currentValueAttribute[element]
                    : null;
        });

        var args = {
            default: typeof prop.default != 'undefined' ? prop.default : null,
        };
        switch (type) {
            case 'text':
            case 'richText':
            case 'textarea':
            case 'wysiwyg':
            case 'spaces':
            case 'node':
            case 'html':
                break;
            case 'string':
                args.isNumber = false;
                break;
            case 'number':
                args.isNumber = false;
                break;
            case 'integer':
                args.isNumber = true;
                break;
            case 'boolean':
            case 'switch':
                args.help = typeof prop.help != 'undefined' ? prop.help : null;
                break;
            case 'select':
            case 'color':
                args.options =
                    typeof prop.options != 'undefined' ? prop.options : null;
                break;
            case 'radio':
            case 'checkbox':
                args.options =
                    typeof prop.options != 'undefined' ? prop.options : null;
                break;
            case 'relation':
            case 'form':
                args.entity =
                    typeof prop.entity != 'undefined' ? prop.entity : null;
                break;
            case 'image':
                args.type = typeof prop.type != 'undefined' ? prop.type : null;
                args.args =
                    prop.image && typeof prop.image == 'object'
                        ? prop.image
                        : {};
                prop.responsive = true;
                break;
            case 'video':
                args.type = typeof prop.type != 'undefined' ? prop.type : null;
                args.args =
                    prop.video && typeof prop.video == 'object'
                        ? prop.video
                        : {};
                prop.responsive = true;
                break;
            case 'file':
            case 'gallery':
                args.type = typeof prop.type != 'undefined' ? prop.type : null;
                prop.responsive = true;
                break;
            case 'object':
                if (typeof prop.props != 'object') {
                    return;
                }
                args.props = prop.props;
                break;
            case 'link':
                if (typeof prop.props == 'object') {
                    args.props = prop.props;
                }
                break;
            case 'date':
            case 'datetime':
                if (
                    typeof prop.format != 'undefined' &&
                    prop.format == 'YYYY-MM-DD'
                ) {
                    args.type = 'date';
                } else if (
                    typeof prop.format != 'undefined' &&
                    prop.format == 'HH:mm'
                ) {
                    args.type = 'time';
                } else {
                    args.type = 'datetime';
                }
                break;

            default:
                return;
        }

        return (
            <Control
                key={blockKey + '-Control'}
                keys={keys}
                blockKey={blockKey}
                label={label}
                description={description}
                type={type}
                valueProp={valueProp}
                controllerValue={currentValueAttribute}
                required_field={required_field}
                repeatable={repeatable}
                isResponsive={
                    typeof prop.responsive != 'undefined' && !!prop.responsive
                        ? true
                        : false
                }
                args={args}
                error={error}
                componentInstance={componentInstance}
            />
        );
    }

    static initComponentAttributes(attributes, props) {
        for (const [key, value] of Object.entries(props)) {
            if (typeof value != 'object' || value == null) continue;

            let currentType =
                typeof value.repeatable != 'undefined' &&
                value.repeatable &&
                !['image', 'video', 'file', 'image'].includes(
                    value.type.toLowerCase(),
                )
                    ? 'array'
                    : value.type.toLowerCase();
            currentType =
                typeof value.responsive != 'undefined' && value.responsive
                    ? 'object'
                    : currentType;

            switch (currentType) {
                case 'string':
                case 'text':
                case 'select':
                case 'color':
                case 'radio':
                case 'relation':
                case 'date':
                case 'datetime':
                case 'number':
                case 'integer':
                case 'form':
                    attributes[key] = {
                        type: 'string',
                    };
                    break;

                case 'object':
                case 'link':
                case 'image':
                case 'video':
                case 'file':
                case 'gallery':
                case 'wysiwyg':
                case 'richText':
                case 'textarea':
                case 'spaces':
                    attributes[key] = {
                        type: 'object',
                    };
                    break;

                case 'array':
                case 'checkbox':
                    attributes[key] = {
                        type: 'array',
                    };
                    break;

                case 'boolean':
                case 'switch':
                    attributes[key] = {
                        type: 'boolean',
                    };
                    break;
            }
        }

        attributes.editorPreviewImage = {
            type: 'boolean',
        };
    }
}
