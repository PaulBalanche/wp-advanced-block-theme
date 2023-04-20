<?php

namespace Abt\Helpers\Attributes;

class Gallery extends Base {
    
    public static function format( &$propInstance ) {
        
        $images = $propInstance->getValue();
        if( is_array($images) ) {

            foreach( $images as $key_image => $current_image ) {

                if( is_array($current_image) && isset($current_image['id']) ) {
                    $attachment_image_src = wp_get_attachment_image_src($current_image['id'], 'large');
                    if( is_array($attachment_image_src) ) {

                        $current_image['src'] = $attachment_image_src[0];
                        $current_image['url'] = $attachment_image_src[0];
                        $current_image['alt'] = trim( strip_tags( get_post_meta( $current_image['id'], '_wp_attachment_image_alt', true ) ) );

                        if( isset($prop['root_prop']) && isset( $current_image[ $prop['root_prop'] ] ) )
                            $images[$key_image] = $current_image[ $prop['root_prop'] ];
                        else
                            $images[$key_image] = (object) $current_image;
                    }
                }
            }

            return $images;
        }

        return null;
    }

}