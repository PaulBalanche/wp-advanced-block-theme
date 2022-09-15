<?php

preg_match( '/^<figure[^>]*">(.*)<\/figure>$/ms', $block_content, $matches );

// Define data
$data = [
    'content' => ( count($matches) == 2 ) ? $matches[1] : null
];

return $data;