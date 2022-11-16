<?php

namespace Abt\Helpers\Attributes;

use Abt\Helpers\Attributes;

class Video {
    
    public static function format( &$attributes, $key_prop, $prop ) {
        
        if( isset($attributes[$key_prop]) && is_array($attributes[$key_prop]) ) {

            $files = ( $prop['repeatable'] ) ? $attributes[$key_prop] : [ $attributes[$key_prop] ];
            foreach( $files as $key_file => $current_file ) {

                if( is_array($current_file) ) {

                    foreach( $current_file as $responsive_key => $responsive_file ) {

                        if( is_array($responsive_file) && isset($responsive_file['type']) ) {

                            switch( $responsive_file['type'] ) {

                                case 'file':

                                    if( isset($responsive_file['file']) && is_array($responsive_file['file']) && isset($responsive_file['file']['id']) ) {

                                        $video_url = wp_get_attachment_url($responsive_file['file']['id']);
                                        $responsive_file['src'] = $video_url;
                                    }
                                    else
                                        $responsive_file = null;

                                    break;

                                case 'embed':

                                    if( isset($responsive_file['embed']) && is_array($responsive_file['embed']) && isset($responsive_file['embed']['url']) ) {

                                        $responsive_file['url'] = $responsive_file['embed']['url'];
                                    }
                                    else
                                        $responsive_file = null;

                                    break;
                            }
                        }
                        else
                            $responsive_file = null;
                        
                        if( ! is_null($responsive_file) ) {
                            if( isset($prop['root_prop']) && isset( $responsive_file[ $prop['root_prop'] ] ) )
                                $files[$key_file][$responsive_key] = $responsive_file[ $prop['root_prop'] ];
                            else
                                $files[$key_file][$responsive_key] = (object) $responsive_file;
                        }
                        else
                            unset( $files[$key_file][$responsive_key] );
                    }
                }
            }

            $attributes[$key_prop] = ( $prop['repeatable'] ) ? $files : $files[0];

            if( count($attributes[$key_prop]) == 1 && isset($attributes[$key_prop]['default']) ) {
                $attributes[$key_prop] = $attributes[$key_prop]['default'];
            }

            Attributes::responsive( $attributes[$key_prop], $prop );
        }
    }

}