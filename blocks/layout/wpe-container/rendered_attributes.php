<?php

// Define data
$data = [
    'anchor' => Abt\Helpers\Anchor::get( 'custom-wpe-container', $content ),
    'content' => $content,
    'align' => ( isset($attributes['align']) ) ? 'align' . $attributes['align'] : '',
    'margin' => apply_filters( 'Abt\block_spacing_formatting', ( isset($attributes['margin']) ) ? $attributes['margin'] : '', 'margin' ),
    'padding' => apply_filters( 'Abt\block_spacing_formatting', ( isset($attributes['padding']) ) ? $attributes['padding'] : '', 'padding' ),
    'style' => ( isset($attributes['style']) ) ? 'st-' . $attributes['style'] : '',
    'container_class_name' => \Abt\Singleton\Config::getInstance()->get('containerClassName'),
    'background' => '',
];

// Background
if( isset($attributes['backgroundFile'], $attributes['backgroundType']) && $attributes['backgroundType'] == 'image' ) {
    $background_image_src = wp_get_attachment_image_src($attributes['backgroundFile'], 'full');
    $data['background'] = $background_image_src[0];
}

return $data;