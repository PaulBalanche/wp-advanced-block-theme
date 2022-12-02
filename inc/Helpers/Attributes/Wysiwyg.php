<?php

namespace Abt\Helpers\Attributes;

use Abt\Helpers\Attributes;
use Abt\Helpers\DraftJsToHtml;

class Wysiwyg {
    
    public static function format( &$attributes, $key_prop, $prop ) {
                    
        if( isset($attributes[$key_prop]) ) {

            $attributes[$key_prop] = DraftJsToHtml::rawToHtml( $attributes[$key_prop] );
            Attributes::responsive( $attributes[$key_prop], $prop );
        }
    }

}