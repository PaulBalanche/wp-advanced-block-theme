<?php

if( ! function_exists( 'core_image_render_callback' ) ) {

    function core_image_render_callback( $attributes, $content ) {

        if( isset($attributes['id']) ) {

            $width_img = ( isset($attributes['width']) ) ? $attributes['width'] : null;
            $height_img = ( isset($attributes['height']) ) ? $attributes['height'] : null;
            $size_img = ( isset($attributes['sizeSlug']) ) ? $attributes['sizeSlug'] : 'full';

            $data_image = wp_get_attachment_image_src($attributes['id'], $size_img);
            if( is_array($data_image) && count($data_image) > 0 ) {
                return '<div class="' . \Abt\Singleton\Config::getInstance()->get('containerClassName') . '">
                    <div class="row">
                        <img src="' . $data_image[0] . '" alt="" />
                    </div>
                </div>';
            }
        }
    }

}