<?php

namespace Abt\Helpers\Attributes;

class Boolean extends Base {

    public static function isValid( &$propInstance ) {

        if( empty($propInstance->getValue()) && $propInstance->getValue() !== false ) {
            return $propInstance->falseWithError( 'Required' );
        }

        return true;
    }
}