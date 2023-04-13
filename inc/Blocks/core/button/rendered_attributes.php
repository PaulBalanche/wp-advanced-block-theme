<?php

preg_match( '/<a class="wp-block-button__link"[^>]*(?:href="([^"]*)")?[^>]*(?:target="([^"]*)")?[^>]*>(.*)<\/a>/', $block_content, $matches );

// Define data
$data = [
    'style_class' => $block['attrs']['className'] ?? null,
    'href' => $matches[1],
    'target' => ( in_array($matches[2], [ '_self', '_blank' ]) ) ? $matches[2] : null,
    'label' => $matches[3]
];

return $data;