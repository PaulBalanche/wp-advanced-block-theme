<?php

namespace Abt\Helpers\Attributes;

use Abt\Helpers\Attributes;

class RecursiveObject {
    
    public static function format( &$attributes, $key_prop, $prop ) {
        
        if( isset($attributes[$key_prop]) ) {
            if( isset($prop['repeatable']) && $prop['repeatable'] ) {
                foreach( $attributes[$key_prop] as $key => $val ) {
                    $attributes[$key_prop][$key] = Attributes::formatting( $val, $prop );
                    Attributes::responsive( $attributes[$key_prop][$key], $prop );
                }
            }
            else {
                $attributes[$key_prop] = Attributes::formatting( $attributes[$key_prop], $prop );
                Attributes::responsive( $attributes[$key_prop], $prop );
            }
        }
    }

}