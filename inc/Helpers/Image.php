<?php

namespace Abt\Helpers;

class Image {
    
    /**
     * Get object with image data
     * 
     */
    public static function get_image_data( $id_attachment, $image_size = 'large' ) {

        if( ! in_array( get_post_mime_type($id_attachment), [ 'image/jpeg', 'image/png', 'image/webp' ] ) ) {
            $image_size = 'full';
        }

        $image_data = null;

        $attachment_image_src = wp_get_attachment_image_src($id_attachment, $image_size );
        if( $attachment_image_src && is_array($attachment_image_src) ) {

            $image_data = [
                'src' => $attachment_image_src[0],
                'url' => $attachment_image_src[0],
                'alt' => trim( strip_tags( get_post_meta( $id_attachment, '_wp_attachment_image_alt', true ) ) )
            ];
        }

        return $image_data;
    }

}