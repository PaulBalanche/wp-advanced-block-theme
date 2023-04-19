<?php

namespace Abt\Helpers\Attributes;

use Abt\Helpers\Attributes;

class RecursiveObject {
    
    public static function format( &$attributes, $key_prop, $prop, &$error = null ) {
        
        if( isset($attributes[$key_prop]) ) {
            
            if( isset($prop['repeatable']) && $prop['repeatable'] ) {

                if( ! is_array($error) ) {
                    $error = [];
                }

                foreach( $attributes[$key_prop] as $key => $val ) {

                    $error[$key] = null;

                    $attributes[$key_prop][$key] = Attributes::formatting( $val, $prop, $error[$key] );
                    Attributes::responsive( $attributes[$key_prop][$key], $prop );
                }
            }
            else {
                $attributes[$key_prop] = Attributes::formatting( $attributes[$key_prop], $prop, $error );
                Attributes::responsive( $attributes[$key_prop], $prop );
            }
        }
    }

}