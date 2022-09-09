<?php

function custom_wpe_grid_render_callback( $attributes, $content ) {

    // Define data
    $data = [
        'content' => $content,
        'margin' => ( isset($attributes['margin']) && is_array($attributes['margin']) ) ? implode(' ', array_map( function ($v, $k) { if( strpos($k, 'm') == 0 ) { return $k . '-' . $v; } }, $attributes['margin'], array_keys($attributes['margin']) )) : '',
        'padding' => ( isset($attributes['padding']) && is_array($attributes['padding']) ) ? implode(' ', array_map( function ($v, $k) { if( strpos($k, 'p') == 0 ) { return $k . '-' . $v; } }, $attributes['padding'], array_keys($attributes['padding']) )) : ''
    ];

    // Render
    return \Abt\Services\Render::render(
        apply_filters( 'Abt\wpe_grid_view_path', 'wpe-grid' ),
        apply_filters( 'Abt\wpe_grid_data', $data, $attributes )
    );
}