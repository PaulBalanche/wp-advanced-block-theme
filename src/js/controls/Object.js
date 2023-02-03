import { Attributes } from '../Static/Attributes';
import { Render } from '../Static/Render';

export function renderObject( componentInstance, id, label, keys, valueProp, objectValue, required = false ) {

    let fieldsetObject = [];

    for( const [keySubProp, valueSubProp] of Object.entries(objectValue) ) {
        fieldsetObject.push( Attributes.renderProp( valueSubProp, keys.concat(keySubProp), valueProp, componentInstance ) );
    }

    if( label == null )
        return fieldsetObject;

    return Render.panelComponent( id, label, fieldsetObject, false )
}