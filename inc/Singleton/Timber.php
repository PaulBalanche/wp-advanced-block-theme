<?php

namespace Abt\Singleton;

class Timber {

    private static $_instance;
    private $template_locations = null;

    public function __construct() {
        $this->init();

        $this->add_filters();
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
     * Add Wordpress filters
     * 
     */
    public function add_filters() {

        add_filter( 'timber/twig', [ $this, 'addGlobal' ] );
    }



    /**
     * Initialize Timber
     * 
     */
    public function init() {

        new \Timber\Timber();

        $this->template_locations  = [
            get_stylesheet_directory() . '/' . Config::getInstance()->get_front_end_file_path( Config::getInstance()->get('templateViewsLocation') ),
            ABT_PLUGIN_DIR . 'views/'
        ];

        \Timber\Timber::$locations = apply_filters( 'Abt\timber_locations', $this->template_locations );
    }


    public function addGlobal( $twig ) {

        $twig->addGlobal('frontspec', Config::getInstance()->get_spec() );

        return $twig;
    }



    /**
     * Timber render method
     * 
     */
    public function render( $twig_view, $context ) {
        
        if( class_exists("\Timber\Timber", false) ) {

            $path_view = ( strpos($twig_view, '.twig') !== false ) ? $twig_view : $twig_view . '/' . $twig_view . '.twig';

            $twig_template_exists = false;
            foreach( $this->template_locations as $location) {
                if( file_exists($location . $path_view) ) {
                    $twig_template_exists = true;
                    break;
                }
            }

            if( $twig_template_exists ) {
                if ( defined('TIMBER_RENDER_ECHOES') && TIMBER_RENDER_ECHOES ) {
                    \Timber\Timber::render( $path_view, $context );
                }
                else {
                    return \Timber\Timber::compile( $path_view, $context );
                }
            }
        }
    }

}