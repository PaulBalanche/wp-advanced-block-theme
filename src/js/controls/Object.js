import { Devices } from '../Singleton/Devices';
import { Attributes } from '../Static/Attributes';
import { Render } from '../Static/Render';

export function renderObject( componentInstance, id, label, keys, valueProp, objectValue, required = false ) {

    let fieldsetObject = [];

    if( false ) {

        fieldsetObject.push(
            Render.tabPanelComponent(
                id,
                Object.keys( Devices.getInstance().getMediaQueries() ).map( ( layout ) => {
                    return {
                        name: layout,
                        title: layout.charAt(0).toUpperCase() + layout.slice(1),
                        className: 'tab-' + layout
                    };
                } ),
                function ( tab ) {
                    let tempKeyObjectReponsive = keys.concat(tab.name);
                    let fieldsetObjectResponsive = [];
                    for( const [ keySubProp, valueSubProp ] of Object.entries(objectValue) ) {
                        fieldsetObjectResponsive.push( Attributes.renderProp( valueSubProp, tempKeyObjectReponsive.concat(keySubProp), valueProp, componentInstance ) );
                    }
                    return fieldsetObjectResponsive;
                },
                Devices.getInstance().getCurrentDevice()
            )
        );
    }
    else {
        for( const [keySubProp, valueSubProp] of Object.entries(objectValue) ) {
            fieldsetObject.push( Attributes.renderProp( valueSubProp, keys.concat(keySubProp), valueProp, componentInstance ) );
        }
    }

    if( false ) {

        var labelRepeatble = '#' + ( keyLoop + 1 ) + '.';

        var tempValueProp = valueProp;
        if( typeof tempValueProp == 'object' ) {

            for( var i in keys ) {
                if( typeof tempValueProp[ keys[i] ] != 'undefined' ) {
                    tempValueProp = tempValueProp[ keys[i] ];
                }
            }

            var labelTempValueProp = [];
            if( typeof tempValueProp.title != 'undefined' ) {
                labelTempValueProp.push( tempValueProp.title );
            }
            else if( typeof tempValueProp.name != 'undefined' ) {
                labelTempValueProp.push( tempValueProp.name );
            }
            else if( typeof tempValueProp.id != 'undefined' ) {
                labelTempValueProp.push( tempValueProp.id );
            }
            else {
                for( var i in tempValueProp ) {
                    labelTempValueProp.push(i + ": " + tempValueProp[i]);
                }
            }
            
            labelRepeatble += " " + labelTempValueProp.join(' / ');
        }


        return Render.panelBodyComponent( id, labelRepeatble, fieldsetObject, false, Render.buttonRemoveRepeatableElt( id, () => { Attributes.removeEltRepeatable( keys, valueProp, componentInstance ) } ) )
    }

    return Render.panelComponent( id, label, fieldsetObject, false )
}