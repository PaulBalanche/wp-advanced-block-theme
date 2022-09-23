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
    'margin' => ( is_array($attributes) && isset($attributes['margin']) && is_array($attributes['margin']) ) ? implode(' ', array_map( function ($v, $k) { if( strpos($k, 'm') == 0 ) { return $k . '-' . $v; } }, $attributes['margin'], array_keys($attributes['margin']) )) : '',
    'padding' => ( is_array($attributes) && isset($attributes['padding']) && is_array($attributes['padding']) ) ? implode(' ', array_map( function ($v, $k) { if( strpos($k, 'p') == 0 ) { return $k . '-' . $v; } }, $attributes['padding'], array_keys($attributes['padding']) )) : '',
    'anchor' => $anchor
];

return $data;