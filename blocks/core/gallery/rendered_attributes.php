<?php

if( isset($block['innerBlocks']) && is_array($block['innerBlocks']) && count($block['innerBlocks']) > 0 ) {
    
    // Define data
    $data = [
        'type' => $block['attrs']['galleryType'] ?? null,
        'nb_colums' => $block['attrs']['columns'] ?? null,
        'images' => []
    ];

    foreach( $block['innerBlocks'] as $image ) {
        if( is_array($image) && isset($image['blockName']) && $image['blockName'] == 'core/image' ) {

            preg_match( '/(?:<figcaption[^>]*>((?:(?!<\/figcaption>).)+)<\/figcaption>)/', $image['innerHTML'], $caption );
            $data['images'][] = array_merge(
                Abt\Helpers\Image::get_image_data( $image['attrs']['id'], $image['attrs']['sizeSlug'] ?? null ),
                [
                    'content' => ( count($caption) == 2 ) ? $caption[1] : null
                ]
            );
        }
    }

    return $data;
}

return null;