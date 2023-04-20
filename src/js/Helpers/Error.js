export class Errors {
    
    static cleanError( errorObject ) {

        for( var i in errorObject ) {
            if( errorObject[i] == null ) {
                delete errorObject[i];
            }
            else if( typeof errorObject[i] == 'object' ) {
                Errors.cleanError(errorObject[i]);
                if( Object.keys(errorObject[i]).length == 0 ) {
                    delete errorObject[i];
                }
            }
        }

        if( Object.keys(errorObject).length == 0 ) {
            errorObject = null;
        }

        return errorObject;
    }
}