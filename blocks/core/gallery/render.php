<?php

if( ! function_exists( 'abt_core_gallery_render_callback' ) ) {

    function abt_core_gallery_render_callback( $block_content, $block ) {        

        if( isset($block['innerBlocks']) && is_array($block['innerBlocks']) && count($block['innerBlocks']) > 0 ) {
            
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

            return $data;
        }

        return null;
    }

}