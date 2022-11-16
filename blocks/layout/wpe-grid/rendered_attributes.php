<?php

// Define data
$data = [
    'anchor' => Abt\Helpers\Anchor::get( 'custom-wpe-grid', $content ),
    'content' => $content,
    // 'margin' => apply_filters( 'Abt\block_spacing_formatting', ( isset($attributes['margin']) ) ? $attributes['margin'] : '', 'margin' ),
    // 'padding' => apply_filters( 'Abt\block_spacing_formatting', ( isset($attributes['padding']) ) ? $attributes['padding'] : '', 'padding' ),
];

// unset($attributes['margin']);
// unset($attributes['padding']);

return array_merge( $data, $attributes );