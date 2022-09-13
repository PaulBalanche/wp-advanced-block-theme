<?php

if( ! function_exists( 'core_gallery_render_callback' ) ) {

    function core_gallery_render_callback( $block, $content ) {        

        if( isset($block['innerBlocks']) && is_array($block['innerBlocks']) && count($block['innerBlocks']) > 0 ) {
            // echo '<pre>';print_r($block);
            $data = [
                'type' => $block['attrs']['galleryType'] ?? null,
                'nb_colums' => $block['attrs']['columns'] ?? null,
                'images' => []
            ];

            foreach( $block['innerBlocks'] as $image ) {
                if( is_array($image) && isset($image['blockName']) && $image['blockName'] == 'core/image' ) {

                    preg_match( '/(?:<figcaption[^>]*>((?:(?!<\/figcaption>).)+)<\/figcaption>)/', $image['innerHTML'], $caption );
                    $data['images'][] = [
                        'id' => $image['attrs']['id'],
                        'size' => $image['attrs']['sizeSlug'] ?? null,
                    ];
                }
            }

            // echo '<pre>';print_r($data);
            return $data;

            // $view_path = ( isset($attributes['galleryType']) && $attributes['galleryType'] != 'default' ) ? 'core-gallery-' . $attributes['galleryType'] : 'core-gallery';

            // // Render
            // return \Abt\Services\Render::render(
            //     apply_filters( 'Abt\core_gallery_view_path', $view_path ),
            //     apply_filters( 'Abt\core_gallery_data', $data, $attributes )
            // );
        }

        return null;
    }

}