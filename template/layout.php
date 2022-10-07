<?php

$content = '';

if ( have_posts() ) :
    while ( have_posts() ) : the_post();

        $content = apply_filters( 'the_content', get_the_content() );

    endwhile;
endif;

Abt\Main::getInstance()->get_theme_controller()->render( __FILE__, $content );