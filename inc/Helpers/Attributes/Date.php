<?php

namespace Abt\Helpers\Attributes;

class Date {
    
    public static function format( &$attributes, $key_prop ) {
        
        if( isset($attributes[$key_prop]) ) {

            $date = \DateTime::createFromFormat('Y-m-d\TH:i:s', $attributes[$key_prop], wp_timezone() );
            if( $date ) {
                $attributes[$key_prop] = $date->format('U');
            }
        }
    }

}