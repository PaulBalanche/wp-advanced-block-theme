<?php

preg_match( '/<div class="wp-block-media-text__content[^"]*">(.*)<\/div><\/div>/ms', $block_content, $matches );

// Define data
$data = [
    'media' => [
        Abt\Helpers\Image::get_image_data( $block['attrs']['mediaId'], $block['attrs']['mediaSizeSlug'] ?? null ),
        [
            'type' => $block['attrs']['mediaType']
        ]
    ],
    'side' => $block['attrs']['mediaPosition'] ?? 'left',
    'content' => ( count($matches) == 2 ) ? $matches[1] : null,
    'isStackedOnMobile' => $block['attrs']['isStackedOnMobile'] ?? true,
    'verticalAlignment' => $block['attrs']['verticalAlignment'] ?? null,
    'imageFill' => $block['attrs']['imageFill'] ?? null,
];

return $data;