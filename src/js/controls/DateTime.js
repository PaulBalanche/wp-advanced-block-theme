import {
    Button,
    DateTimePicker
} from '@wordpress/components';

export function renderDateTime( componentInstance, id, label, keys, valueProp, objectValue, repeatable = false, required = false ) {

    label = ( required ) ? label + '*' : label;

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
                updateAttributes( keys, valueProp, newDate, false, componentInstance );
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