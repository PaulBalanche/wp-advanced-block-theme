<?php

namespace Abt\Helpers\Attributes;

class Form extends Base {
    
    public static function isValid( &$propInstance ) {
        
        return is_numeric( $propInstance->getValue() );
    }

    public static function format( &$propInstance ) {

        if( is_numeric( $propInstance->getValue() ) ) {
            $formattedForm = apply_filters( 'Abt\attribute_format_form', $propInstance->getValue() );

            if( is_array($formattedForm) ) {
                return $formattedForm;
            }
        }

        return null;
    }

}