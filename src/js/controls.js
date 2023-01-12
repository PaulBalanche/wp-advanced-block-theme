import { renderDateTime } from './controls/DateTime';
export function renderDateTimeControl( componentInstance, id, label, keys, valueProp, objectValue, repeatable = false, required = false ) {
    return renderDateTime( componentInstance, id, label, keys, valueProp, objectValue, repeatable, required );
}

import { renderFile } from './controls/File';
export function renderFileControl( componentInstance, type, id, label, keys, valueProp, objectValue, repeatable = false, required = false, responsive = false ) {
    return renderFile( componentInstance, type, id, label, keys, valueProp, objectValue, repeatable, required, responsive );
}

import { renderImageVideo } from './controls/ImageVideo';
export function renderImageVideoControl( componentInstance, type, args, id, label, keys, valueProp, objectValue, repeatable = false, required = false, responsive = false ) {
    return renderImageVideo( componentInstance, type, args, id, label, keys, valueProp, objectValue, repeatable, required, responsive );
}

import { renderLink } from './controls/Link';
export function renderLinkControl( componentInstance, id, label, keys, valueProp, objectValue, repeatable = false, required = false ) {
    return renderLink( componentInstance, id, label, keys, valueProp, objectValue, repeatable, required );
}

import { renderRadio } from './controls/Radio';
export function renderRadioControl( componentInstance, id, label, options, keys, valueProp, objectValue, repeatable = false, required = false ) {
    return renderRadio( componentInstance, id, label, options, keys, valueProp, objectValue, repeatable, required );
}

import { renderRelation } from './controls/Relation';
export function renderRelationControl( componentInstance, id, label, entity, keys, valueProp, objectValue, repeatable = false, required = false ) {
    return renderRelation( componentInstance, id, label, entity, keys, valueProp, objectValue, repeatable, required );
}

import { renderSelect } from './controls/Select';
export function renderSelectControl( componentInstance, id, label, options, keys, valueProp, attributeValue, repeatable = false, required = false ) {
    return renderSelect( componentInstance, id, label, options, keys, valueProp, attributeValue, repeatable, required );
}

import { renderText } from './controls/Text';
export function renderTextControl( componentInstance, id, label, keys, valueProp, objectValue, isNumber = false, repeatable = false, required = false, responsive = false ) {
    return renderText( componentInstance, id, label, keys, valueProp, objectValue, isNumber, repeatable, required, responsive );
}

import { renderTextarea } from './controls/Textarea';
export function renderTextareaControl( componentInstance, id, label, keys, valueProp, objectValue, repeatable = false, required = false ) {
    return renderTextarea( componentInstance, id, label, keys, valueProp, objectValue, repeatable, required );
}

import { renderToggle } from './controls/Toggle';
export function renderToggleControl( componentInstance, id, label, help, keys, valueProp, objectValue, repeatable = false, required = false ) {
    return renderToggle( componentInstance, id, label, help, keys, valueProp, objectValue, repeatable, required );
}