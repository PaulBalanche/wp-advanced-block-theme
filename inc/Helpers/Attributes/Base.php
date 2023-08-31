<?php

namespace Abt\Helpers\Attributes;

class Base {
    
    public static function isValid( &$propInstance ) {

        if( empty($propInstance->getValue()) ) {
            return $propInstance->falseWithError( 'Required' );
        }

        return true;
    }

    public static function format( &$propInstance ) {
        
        return $propInstance->getValue();
    }
}