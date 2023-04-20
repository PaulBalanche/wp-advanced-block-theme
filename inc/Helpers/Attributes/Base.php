<?php

namespace Abt\Helpers\Attributes;

class Base {
    
    public static function isValid( &$propInstance ) {
        return true;
    }

    public static function format( &$propInstance ) {
        
        return [
            'value' => $propInstance->getValue()
        ];
    }
}