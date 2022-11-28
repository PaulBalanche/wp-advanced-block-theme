<?php

// Define data
$data = [
    'anchor' => Abt\Helpers\Anchor::get( 'custom-wpe-container', $content ),
    'content' => $content,
    'container_class_name' => \Abt\Singleton\Config::getInstance()->get('containerClassName')
];

return $data;