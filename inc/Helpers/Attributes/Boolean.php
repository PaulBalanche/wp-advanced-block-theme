<?php

namespace Abt\Helpers\Attributes;

use Abt\Helpers\Attributes;

class Boolean {
    
    public static function format( &$attributes, $key_prop, $prop ) {

        if( ! isset( $attributes[ $key_prop ] ) ) {
            $attributes[ $key_prop ] = false;
            Attributes::responsive( $attributes[$key_prop], $prop );
        }
    }

}