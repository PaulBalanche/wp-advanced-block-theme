<?php

namespace Abt\Services;

class Localization extends ServiceBase {

    function __construct() {
        parent::__construct();

        $this->add_actions();
        $this->add_filters();
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
     * Add Wordpress filters
     * 
     */
    public function add_filters() {

        // Retrieves all i18n theme data
        add_filter( 'Abt\get_i18n_theme_data', [ $this, 'get_i18n_theme_data' ], 10, 2 );
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




    /**
     * Internationalization text domain
     * 
     */
    public function get_i18n_theme_data( $initiale_value, $key ){

        $i18n = $this->get_config()->get_spec('i18n');
        if( is_array($i18n) && isset($i18n[$key]) && ! empty($i18n[$key]) ) {

            $initiale_value = $i18n[$key];
        }
        
        return $initiale_value;
    }

}