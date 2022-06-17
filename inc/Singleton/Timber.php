<?php

namespace Abt\Singleton;

class Timber {

    private static $_instance;

    public function __construct() {
        $this->init();
    }



    /**
     * Utility method to retrieve the main instance of the class.
     * The instance will be created if it does not exist yet.
     * 
     */
    public static function getInstance() {

        if( is_null(self::$_instance) ) {
            self::$_instance = new Timber();
        }
        return self::$_instance;
    }



    /**
     * Initialize Timber
     * 
     */
    public function init() {

        new \Timber\Timber();

        // Template Locations
        \Timber\Timber::$locations = [
            get_stylesheet_directory() . Config::getInstance()->get('templateViewsLocation'),
            ABT_PLUGIN_DIR . 'views'
        ];
    }



    /**
     * Timber render method
     * 
     */
    public function render( $twig_view, $context ) {
        
        if( class_exists("\Timber\Timber", false) ) {

            $path_view = ( strpos($twig_view, '.twig') !== false ) ? $twig_view : $twig_view . '/' . $twig_view . '.twig';

            if ( defined('TIMBER_CONTROLLERS_STRING_OUTPUT') && TIMBER_CONTROLLERS_STRING_OUTPUT ) {
               return \Timber\Timber::compile( $path_view, $context );
            }
            else {
                \Timber\Timber::render( $path_view, $context );
            }
        }
    }

}