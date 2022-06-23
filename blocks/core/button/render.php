<?php

if( ! function_exists( 'core_button_render_callback' ) ) {

    function core_button_render_callback( $attributes, $content ) {

        preg_match( '/^<div class="wp-block-button([^"]*)"><a class="wp-block-button__link" href="([^"]*)">(.*)<\/a><\/div>$/ms', $content, $matches );

        // Define data
        $data = [
            'content' => $content,
            'style_class' => trim($matches[1]),
            'href' => $matches[2],
            'label' => $matches[3]
        ];

        // Render
        return \Abt\Services\Render::render(
            apply_filters('abt/core_button_view_path', 'core-button'),
            apply_filters('abt/core_button_data', $data, $attributes)
        );
    }

}