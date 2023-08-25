<?php
$content = '<h1>404</h1><p>Page introuvable...</p>';

do_action('Abt\layout_header');
Abt\Main::getInstance()->get_theme_controller()->render( __FILE__, $content );
do_action('Abt\layout_footer');