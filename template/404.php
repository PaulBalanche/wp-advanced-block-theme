<?php
$content = '<h1>404</h1><p>Page introuvable...</p>';

Abt\Main::getInstance()->get_theme_controller()->render( __FILE__, $content );