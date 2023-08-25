<?php
$content = '';

if ( have_posts() ) :
    while ( have_posts() ) : the_post();

        $content = apply_filters( 'the_content', get_the_content() );

    endwhile;
endif;

do_action('Abt\layout_header');
Abt\Main::getInstance()->get_theme_controller()->render( __FILE__, $content );
do_action('Abt\layout_footer');