<?php

namespace Abt\Helpers\Attributes;

class File {
    
    public static function format( &$attributes, $key_prop, $prop ) {
        
        if( isset($attributes[$key_prop]) && is_array($attributes[$key_prop]) ) {

            $files = ( $prop['repeatable'] ) ? $attributes[$key_prop] : [ $attributes[$key_prop] ];
            foreach( $files as $key_file => $current_file ) {

                if( is_array($current_file) && isset($current_file['id']) ) {

                    $attachment_url = wp_get_attachment_url($current_file['id']);
                    $current_file['src'] = $attachment_url;
                    $current_file['url'] = $attachment_url;

                    if( isset($prop['root_prop']) && isset( $current_file[ $prop['root_prop'] ] ) )
                        $files[$key_file] = $current_file[ $prop['root_prop'] ];
                    else
                        $files[$key_file] = (object) $current_file;
                }
            }

            $attributes[$key_prop] = ( $prop['repeatable'] ) ? $files : $files[0];
        }
    }

}