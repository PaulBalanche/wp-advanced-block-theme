<?php

namespace Abt\Helpers\Attributes;

class Boolean {
    
    public static function format( &$attributes, $key_prop ) {

        if( ! isset( $attributes[ $key_prop ] ) ) {
            $attributes[ $key_prop ] = false;
        }
    }

}