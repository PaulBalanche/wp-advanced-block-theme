<?php

namespace Abt\Helpers\Attributes;

use Abt\Helpers\Attributes;

class Wysiwyg {
    
    public static function format( &$attributes, $key_prop, $prop ) {
                    
        if( isset($attributes[$key_prop]) && is_array($attributes[$key_prop]) && isset($attributes[$key_prop]['html']) ) {

            $attributes[$key_prop] = $attributes[$key_prop]['html'];
            Attributes::responsive( $attributes[$key_prop], $prop );
        }
    }

}