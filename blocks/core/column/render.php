<?php

if( ! function_exists( 'core_column_render_callback' ) ) {

    function core_column_render_callback( $attributes, $content ) {
        
        preg_match( '/^<div class="wp-block-column[^"]*">(.*)<\/div>$/ms', $content, $matches );
        if( count($matches) == 2 ) {
            return '<div class="col">' . $matches[1] . '</div>';
        }
    }

}