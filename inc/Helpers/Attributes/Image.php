<?php

namespace Abt\Helpers\Attributes;

use Abt\Helpers\Attributes;

class Image {
    
    public static function format( &$attributes, $key_prop, $prop ) {
        
        if( isset($attributes[$key_prop]) && is_array($attributes[$key_prop]) ) {

            $images = ( $prop['repeatable'] ) ? $attributes[$key_prop] : [ $attributes[$key_prop] ];
            foreach( $images as $key_image => $current_image ) {

                if( is_array($current_image) ) {

                    if( is_array($current_image) && isset($current_image['id']) ) {

                        $image_size = ( isset($prop['image']) && is_array($prop['image']) && isset($prop['image']['image_size_identifier']) && is_array($prop['image']['image_size_identifier']) && isset($prop['image']['image_size_identifier']['default']) ) ? $prop['image']['image_size_identifier']['default'] : 'large';
                        $attachment_image_src = wp_get_attachment_image_src($current_image['id'], $image_size);
                        if( is_array($attachment_image_src) ) {

                            $current_image['src'] = $attachment_image_src[0];
                            $current_image['url'] = $attachment_image_src[0];
                            $current_image['alt'] = trim( strip_tags( get_post_meta( $current_image['id'], '_wp_attachment_image_alt', true ) ) );

                            unset($current_image['id']);
                            unset($current_image['preview']);
                        }
                    }
                    else
                        $current_image = null;

                    if( ! is_null($current_image) ) {
                        if( isset($prop['root_prop']) && isset( $current_image[ $prop['root_prop'] ] ) )
                            $images[$key_image] = $current_image[ $prop['root_prop'] ];
                        else
                            $images[$key_image] = (object) $current_image;
                    }
                    else
                        unset( $images[$key_image] );
                }
            }

            $attributes[$key_prop] = ( $prop['repeatable'] ) ? $images : $images[0];
            Attributes::responsive( $attributes[$key_prop], $prop );
        }
    }

}