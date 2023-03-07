import {
    Button,
    DateTimePicker
} from '@wordpress/components';

export function renderDateTime( id, label, keys, valueProp, objectValue, repeatable = false, required = false, clientId ) {

    label = ( required ) ? label + '<span class="o-required">*</span>' : label;

    if( repeatable ) {
        label = (
            <>
                { label }
                <Button
                    key={ id + "-repeatableRemoveElt" }
                    isLink={true}
                    className="removeRepeatable"
                    onClick={ () =>
                        removeEltRepeatable( keys, valueProp )
                    }
                >
                    Remove
                </Button>
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
                updateAttributes( keys, valueProp, newDate, false, clientId );
            } }
            is12Hour={ false }
        />
    ) );

    return (
        <div
            key={ id + "-dateTimeContainer" }
            className="dateTime-container"
        >
            <div className="components-base-control__label" key={ id + "-label" }>{ label }</div>
            <MyDateTimePicker />
        </div>
    );
}