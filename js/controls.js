import { renderDateTime } from './controls/DateTime';
export function renderDateTimeControl( id, label, keys, valueProp, objectValue, repeatable = false, required = false, clientId ) {
    return renderDateTime( id, label, keys, valueProp, objectValue, repeatable, required, clientId );
}

// import { renderFile } from './controls/File';
// export function renderFileControl( type, id, label, keys, valueProp, objectValue, repeatable = false, required = false, clientId ) {
//     return renderFile( type, id, label, keys, valueProp, objectValue, repeatable, required, clientId );
// }

// import { renderImageVideo } from './controls/ImageVideo';
// export function renderImageVideoControl( type, args, id, label, keys, valueProp, objectValue, repeatable = false, required = false, clientId ) {
//     return renderImageVideo( type, args, id, label, keys, valueProp, objectValue, repeatable, required, clientId );
// }

import { renderLink } from './controls/Link';
export function renderLinkControl( id, label, keys, valueProp, objectValue, repeatable = false, required = false, clientId ) {
    return renderLink( id, label, keys, valueProp, objectValue, repeatable, required, clientId );
}

import { renderRadio } from './controls/Radio';
export function renderRadioControl( id, label, options, keys, valueProp, objectValue, repeatable = false, required = false, clientId ) {
    return renderRadio( id, label, options, keys, valueProp, objectValue, repeatable, required, clientId );
}

import { renderRelation } from './controls/Relation';
export function renderRelationControl( id, label, entity, keys, valueProp, objectValue, repeatable = false, required = false, clientId ) {
    return renderRelation( id, label, entity, keys, valueProp, objectValue, repeatable, required, clientId );
}

import { renderSelect } from './controls/Select';
export function renderSelectControl( id, label, options, keys, valueProp, attributeValue, repeatable = false, required = false, clientId ) {
    return renderSelect( id, label, options, keys, valueProp, attributeValue, repeatable, required, clientId );
}

import { renderText } from './controls/Text';
export function renderTextControl( id, label, keys, valueProp, objectValue, isNumber = false, repeatable = false, required = false, clientId ) {
    return renderText( id, label, keys, valueProp, objectValue, isNumber, repeatable, required, clientId );
}

import { renderTextarea } from './controls/Textarea';
export function renderTextareaControl( id, label, keys, valueProp, objectValue, repeatable = false, required = false, clientId ) {
    return renderTextarea( id, label, keys, valueProp, objectValue, repeatable, required, clientId );
}

// import { renderToggle } from './controls/Toggle';
// export function renderToggleControl( id, label, help, keys, valueProp, objectValue, repeatable = false, required = false, clientId ) {
//     return renderToggle( id, label, help, keys, valueProp, objectValue, repeatable, required, clientId );
// }

// import { renderWysiwyg } from './controls/Wysiwyg';
// export function renderWysiwygControl( id, label, keys, valueProp, objectValue, repeatable = false, required = false, clientId ) {
//     return renderWysiwyg( id, label, keys, valueProp, objectValue, repeatable, required, clientId );
// }