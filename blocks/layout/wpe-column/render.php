<?php

function custom_wpe_column_render_callback( $attributes, $content ) {

    $className = '';
    foreach( [ 'Desktop', 'Tablet', 'Mobile' ] as $device ) {

        // Column
        $startColumn = ( isset($attributes['columnStart' . $device]) ) ? intval($attributes['columnStart' . $device]) : 1;
        $endColumn = ( isset($attributes['width' . $device]) ) ? $startColumn + intval($attributes['width' . $device]) : $startColumn + 1;
        $className .= ' gridColumnStart' . $device . '-' . $startColumn . ' gridColumnEnd' . $device . '-' . $endColumn;
        
        // Row
        $startRow = ( isset($attributes['rowStart' . $device]) ) ? intval($attributes['rowStart' . $device]) : 1;
        $endRow = ( isset($attributes['height' . $device]) ) ? $startRow + intval($attributes['height' . $device]) : $startRow + 1;
        $className .= ' gridRowStart' . $device . '-' . $startRow . ' gridRowEnd' . $device . '-' . $endRow;
    }

    // Define data
    $data = [
        'content' => $content,
        'className' => $className
    ];

    // Render
    return \Abt\Services\Render::render(
        apply_filters('wpextend/wpe_column_view_path', 'wpe-column'),
        apply_filters('wpextend/wpe_column_data', $data, $attributes)
    );
}