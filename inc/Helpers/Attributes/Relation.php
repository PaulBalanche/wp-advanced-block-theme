<?php

namespace Abt\Helpers\Attributes;

class Relation extends Base {
    
    public static function isValid( &$propInstance ) {
        
        return is_numeric( $propInstance->getValue() );
    }

    public static function format( &$propInstance ) {

        if( $propInstance->isRepeatable() ) {
            return get_posts([
                'post_type' => $propInstance->getSpecs()['entity'],
                'post__in' => $propInstance->getValue(),
                'orderby' => 'post__in'
            ]);
        }
        elseif( ( ! isset($prop['repeatable']) || ! $prop['repeatable'] ) && is_numeric($attributes[$key_prop]) ) {
            return get_post($propInstance->getValue());
        }

        return null;
    }

}