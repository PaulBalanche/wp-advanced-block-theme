import {
    Button,
    DateTimePicker
} from '@wordpress/components';

import { Attributes } from '../Static/Attributes';
import { Render } from '../Static/Render';

export function renderDateTime( componentInstance, id, label, keys, valueProp, objectValue, repeatable = false, required = false ) {

    label = ( required ) ? label + '*' : label;

    if( repeatable ) {
        label = (
            <>
                { label }
                { Render.buttonRemoveRepeatableElt( id, () => { Attributes.removeEltRepeatable( keys, valueProp, componentInstance ) } ) }
            </>
        );
    }

    const MyDateTimePicker = withState( {
        date: ( objectValue ) ? objectValue : new Date(),
    } )( ( { date, setState } ) => (
        <DateTimePicker
            key={ id }
            currentDate={ date }
            onChange={ ( newDate ) => {
                setState( { date: newDate } );
                Attributes.updateAttributes( keys, valueProp, newDate, false, componentInstance );
            } }
            is12Hour={ false }
        />
    ) );

    return (
        <div
            key={ id + "-dateTimeContainer" }
            className="dateTime-container"
        >
            { Render.label( id, label ) }
            <MyDateTimePicker />
        </div>
    );
}