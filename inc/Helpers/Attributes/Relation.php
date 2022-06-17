<?php

namespace Abt\Helpers\Attributes;

class Relation {
    
    public static function format( &$attributes, $key_prop, $prop, $componentId ) {
        
        if( isset($attributes[$key_prop]) ) {
            if( isset($prop['repeatable']) && $prop['repeatable'] && is_array($attributes[$key_prop]) && count($attributes[$key_prop]) > 0 ) {
                $attributes[$key_prop] = get_posts([
                    'post_type' => $prop['entity'],
                    'post__in' => $attributes[$key_prop],
                    'orderby' => 'post__in'
                ]);
            }
            elseif( ( ! isset($prop['repeatable']) || ! $prop['repeatable'] ) && is_numeric($attributes[$key_prop]) ) {
                $attributes[$key_prop] = get_post($attributes[$key_prop]);
            }

            $attributes[$key_prop] = apply_filters('wpextend/pre_render_component_relation', $attributes[$key_prop], $componentId, $key_prop);
        }
    }

}