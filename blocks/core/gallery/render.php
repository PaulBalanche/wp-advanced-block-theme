<?php

if( ! function_exists( 'core_gallery_render_callback' ) ) {

    function core_gallery_render_callback( $attributes, $content ) {

        if( isset($attributes['ids']) && is_array($attributes['ids']) ) {

            preg_match_all( '/<img src="([^"]+)"[^>]*>(?:<figcaption[^>]*>((?:(?!<\/figcaption>).)+)<\/figcaption>)*/', $content, $slides, PREG_SET_ORDER );

            // Define data
            $data = [
                'content' => $content,
                'slides' => $slides,
                'container_class_name' => \Abt\Singleton\Config::getInstance()->get('containerClassName'),
                'ids_images' => $attributes['ids'],
                'nb_colums' => ( isset($attributes['columns']) ) ? $attributes['columns'] : 1,
                'size_img' => ( isset($attributes['sizeSlug']) ) ? $attributes['sizeSlug'] : 'full',
            ];

            $view_path = ( isset($attributes['galleryType']) && $attributes['galleryType'] != 'default' ) ? 'core-gallery-' . $attributes['galleryType'] : 'core-gallery';

            // Render
            return \Abt\Services\Render::render(
                apply_filters( 'Abt\core_gallery_view_path', $view_path ),
                apply_filters( 'Abt\core_gallery_data', $data, $attributes )
            );
        }
    }

}