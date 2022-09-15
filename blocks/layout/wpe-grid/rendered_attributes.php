<?php

// Define data
$data = [
    'content' => $content,
    'margin' => ( is_array($attributes) && isset($attributes['margin']) && is_array($attributes['margin']) ) ? implode(' ', array_map( function ($v, $k) { if( strpos($k, 'm') == 0 ) { return $k . '-' . $v; } }, $attributes['margin'], array_keys($attributes['margin']) )) : '',
    'padding' => ( is_array($attributes) && isset($attributes['padding']) && is_array($attributes['padding']) ) ? implode(' ', array_map( function ($v, $k) { if( strpos($k, 'p') == 0 ) { return $k . '-' . $v; } }, $attributes['padding'], array_keys($attributes['padding']) )) : ''
];

return $data;