<?php

namespace Abt\Services;

class Localization extends ServiceBase {

    function __construct() {
        parent::__construct();

        $this->add_actions();
    }
    


    /**
     * Add Wordpress actions
     * 
     */
    public function add_actions() {

        // Internationalization text domain
        add_action( 'after_setup_theme', [ $this, 'theme_text_domain_setup' ] );        
    }



    /**
     * Internationalization text domain
     * 
     */
    public function theme_text_domain_setup(){

        $text_domain = $this->get_config()->get_spec('text_domain');
        if( ! is_null($text_domain) && ! empty($text_domain) ) {

            define( 'THEME_TEXT_DOMAIN', $text_domain );
            load_theme_textdomain( $text_domain, get_stylesheet_directory() . '/languages' );
        }
        else {
            define( 'THEME_TEXT_DOMAIN', 'my-theme' );
        }
    }

}