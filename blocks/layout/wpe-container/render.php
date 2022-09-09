<?php

function custom_wpe_container_render_callback( $attributes, $content_wrapped ) {

    // Anchor request
    $anchor = false;
    if( preg_match( '/<div(.*)class="wp-block-custom-wpe-container[^"]*"([^>]*)>(.*)<\/div>/s', $content_wrapped, $content ) === 1 ) {

        $class_prev = $content[1];
        $class_next = $content[2];
        $content = $content[3];

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
        $content = $content_wrapped;

    // Define data
    $data = [
        'content' => $content,
        'align' => ( isset($attributes['align']) ) ? 'align' . $attributes['align'] : '',
        'margin' => apply_filters( 'Abt\block_spacing_formatting', ( isset($attributes['margin']) ) ? $attributes['margin'] : '', 'margin' ),
        'padding' => apply_filters( 'Abt\block_spacing_formatting', ( isset($attributes['padding']) ) ? $attributes['padding'] : '', 'padding' ),
        'style' => ( isset($attributes['style']) ) ? 'st-' . $attributes['style'] : '',
        'container_class_name' => \Abt\Singleton\Config::getInstance()->get('containerClassName'),
        'background' => '',
        'anchor' => $anchor
    ];

    // Background
    if( isset($attributes['backgroundFile'], $attributes['backgroundType']) && $attributes['backgroundType'] == 'image' ) {
        $background_image_src = wp_get_attachment_image_src($attributes['backgroundFile'], 'full');
        $data['background'] = $background_image_src[0];
    }

    // Render
    return \Abt\Services\Render::render(
        apply_filters( 'Abt\wpe_container_view_path', 'wpe-container' ),
        apply_filters( 'Abt\wpe_container_data', $data, $attributes )
    );
}