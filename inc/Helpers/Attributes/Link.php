<?php

namespace Abt\Helpers\Attributes;

class Link {
    
    public static function format( &$attributes, $key_prop ) {
        
        if( isset($attributes[$key_prop]) && is_array($attributes[$key_prop]) ) {

            if( isset($attributes[$key_prop]['url'], $attributes[$key_prop]['text']) && ! empty($attributes[$key_prop]['url']) && ! empty($attributes[$key_prop]['text']) ) {
                $attributes[$key_prop] = [
                    'url' => ( isset($attributes[$key_prop]['url']) ) ? $attributes[$key_prop]['url'] : '',
                    'text' => ( isset($attributes[$key_prop]['text']) ) ? $attributes[$key_prop]['text'] : '',
                    'target' => ( isset($attributes[$key_prop]['opensInNewTab']) && $attributes[$key_prop]['opensInNewTab'] == '1' ) ? true : false
                ];
            }
            else {
                $attributes[$key_prop] = null;
            }
        }
    }

}