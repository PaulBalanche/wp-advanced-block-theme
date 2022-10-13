<?php

// Anchor request
$anchor = false;
if( preg_match( '/<div(.*)class="wp-block-custom-wpe-grid[^"]*"([^>]*)>(.*)<\/div>/s', $content, $content_transformed ) === 1 ) {

    $class_prev = $content_transformed[1];
    $class_next = $content_transformed[2];
    $content_transformed = $content_transformed[3];

    if( strpos($class_prev, 'id="') !== false ) {

        preg_match( '/id="(.*)"/', $class_prev, $match_anchor );
        if( is_array($match_anchor) && count($match_anchor) == 2 ) {
            $anchor = $match_anchor[1];
        }
    }
    elseif( strpos($class_next, 'id="') !== false ) {

        preg_match( '/id="(.*)"/', $class_next, $match_anchor );
        if( is_array($match_anchor) && count($match_anchor) == 2 ) {
            $anchor = $match_anchor[1];
        }
    }
}
else
    $content_transformed = $content;

// Define data
$data = [
    'content' => $content_transformed,
    'margin' => apply_filters( 'Abt\block_spacing_formatting', ( isset($attributes['margin']) ) ? $attributes['margin'] : '', 'margin' ),
    'padding' => apply_filters( 'Abt\block_spacing_formatting', ( isset($attributes['padding']) ) ? $attributes['padding'] : '', 'padding' ),
    'anchor' => $anchor
];

unset($attributes['margin']);
unset($attributes['padding']);

return array_merge( $data, $attributes );