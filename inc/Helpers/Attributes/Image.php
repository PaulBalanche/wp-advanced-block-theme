<?php

namespace Abt\Helpers\Attributes;

class Image {
    
    public static function format( &$attributes, $key_prop, $prop ) {
        
        if( isset($attributes[$key_prop]) && is_array($attributes[$key_prop]) ) {

            $images = ( $prop['repeatable'] ) ? $attributes[$key_prop] : [ $attributes[$key_prop] ];
            foreach( $images as $key_image => $current_image ) {

                if( is_array($current_image) ) {

                    foreach( $current_image as $responsive_key => $responsive_image ) {

                        if( is_array($responsive_image) && isset($responsive_image['id']) ) {

                            $image_size = ( isset($prop['image']) && is_array($prop['image']) && isset($prop['image']['image_size_identifier']) && is_array($prop['image']['image_size_identifier']) && isset($prop['image']['image_size_identifier'][$responsive_key]) ) ? $prop['image']['image_size_identifier'][$responsive_key] : 'large';
                            $attachment_image_src = wp_get_attachment_image_src($responsive_image['id'], $image_size);
                            if( is_array($attachment_image_src) ) {

                                $responsive_image['src'] = $attachment_image_src[0];
                                $responsive_image['url'] = $attachment_image_src[0];
                                $responsive_image['alt'] = trim( strip_tags( get_post_meta( $responsive_image['id'], '_wp_attachment_image_alt', true ) ) );

                                unset($responsive_image['id']);
                                unset($responsive_image['preview']);
                            }
                        }
                        else
                            $responsive_image = null;

                        if( ! is_null($responsive_image) ) {
                            if( isset($prop['root_prop']) && isset( $responsive_image[ $prop['root_prop'] ] ) )
                                $images[$key_image][$responsive_key] = $responsive_image[ $prop['root_prop'] ];
                            else
                                $images[$key_image][$responsive_key] = (object) $responsive_image;
                        }
                        else
                            unset( $images[$key_image][$responsive_key] );
                    }

                    // If default only, define it as root
                    if( count($images[$key_image]) == 1 && isset($images[$key_image]['default']) ) {
                        $images[$key_image] = $images[$key_image]['default'];
                    }
                }
            }

            $attributes[$key_prop] = ( $prop['repeatable'] ) ? $images : $images[0];
        }
    }

}