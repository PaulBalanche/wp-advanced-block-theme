<?php

namespace Abt\Helpers\Attributes;

class Date extends Base {
    
    public static function format( &$propInstance ) {
                    
        $value = $propInstance->getValue();
        
        $date = \DateTime::createFromFormat('Y-m-d\TH:i:s', $value, wp_timezone() );
        if( $date ) {
            return $date->format('U');
        }

        return null;
    }

}