<?php

if( ! function_exists( 'core_media_text_render_callback' ) ) {

    function core_media_text_render_callback( $attributes, $content ) {

        // $attributes['isStackedOnMobile']
        // $attributes['verticalAlignment']
        // $attributes['imageFill']

        if( isset($attributes['mediaId'], $attributes['mediaType']) ) {

            if( $attributes['mediaType'] == 'image' ) {
                
                $data_image = wp_get_attachment_image_src($attributes['mediaId'], 'large');
                $html_media = '<img src="' . $data_image[0] . '" alt="" />';
            }
            else if( $attributes['mediaType'] == 'video' ) {

                preg_match( '/<figure class="wp-block-media-text__media[^"]*">(.*)<\/figure>/ms', $content, $matches );
                if( count($matches) == 2 ) {

                    $html_media = $matches[1];
                }
            }

            $mediaPosition = ( isset($attributes['mediaPosition']) ) ? $attributes['mediaPosition'] : 'left';

            preg_match( '/<div class="wp-block-media-text__content[^"]*">(.*)<\/div><\/div>/ms', $content, $matches );
            if( count($matches) == 2 ) {
                
                $return = '<div class="block-media-text ' . \Abt\Singleton\Config::getInstance()->get('containerClassName') . '">
                    <div class="row box">';

                if( $mediaPosition == 'left' ) {

                    $return .= '<div class="col media">' . $html_media . '</div>
                        <div class="col">' . $matches[1] . '</div>';
                }
                else {
                    $return .= '<div class="col">' . $matches[1] . '</div>
                        <div class="col media">' . $html_media . '</div>';
                }

                $return .= '</div>
                </div>';

                return $return;
            }
        }
    }
}