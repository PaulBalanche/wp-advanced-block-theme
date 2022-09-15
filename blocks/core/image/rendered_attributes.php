<?php

preg_match( '/(?:<figcaption[^>]*>((?:(?!<\/figcaption>).)+)<\/figcaption>)/', $block_content, $caption );

// Define data
$data = array_merge(
    Abt\Helpers\Image::get_image_data( $block['attrs']['id'], $block['attrs']['sizeSlug'] ?? null ),
    [
        'content' => ( count($caption) == 2 ) ? $caption[1] : null
    ]
);

return $data;