<?php

namespace Abt\Coffeekraken\Controllers;

use Abt\Controllers\ControllerBase;

class Twig extends ControllerBase {

    public function __construct() {
        parent::__construct();

        $_ENV['S_FRONTSPEC_PATH'] = get_stylesheet_directory() . '/' . $this->get_config()->get_front_end_file_path( $this->get_config()->get('frontspecJsonFileName') );

        $this->add_filters();
    }

    /**
     * Add Wordpress filters
     * 
     */
    public function add_filters() {

        // Init Twig template
        add_filter( 'timber/twig', [ $this, 'initSugarTwig' ] );
        add_filter( 'Abt\timber_locations', [ $this, 'timber_locations' ] );
    }

    /**
     * Init Twig template
     *      Tiwg filters, ...
     * 
     */
    public function initSugarTwig( $twig ) {

        // init twig with Sugar power
        $twig = \Sugar\twig\initTwig( $twig );

        return $twig;
    }


    public function timber_locations( $locations ) {

        $locations = array_merge( $locations, \Sugar\twig\getDefaultViewDirs() );

        return $locations;
    }

}