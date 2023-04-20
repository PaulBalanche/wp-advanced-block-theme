<?php

namespace Abt\Helpers\Attributes;

class File extends Base {
    
    public static function format( &$propInstance ) {
                    
        $value = $propInstance->getValue();
        if( is_array($value) ) {

            $files = ( $prop['repeatable'] ) ? $value : [ $value ];
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

            return ( $prop['repeatable'] ) ? $files : $files[0];
        }

        return null;
    }

}