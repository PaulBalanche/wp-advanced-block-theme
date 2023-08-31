<?php

namespace Abt\Coffeekraken\Controllers;

use Abt\Controllers\ControllerBase;

class Config extends ControllerBase {

    private $frontspecJsonFileName = 'frontspec.json',
            $frontSpecData = null;

    public function __construct() {
        parent::__construct();

        $_ENV['S_FRONTSPEC_PATH'] = get_stylesheet_directory() . '/' . $this->get_config()->get_front_end_file_path( $this->frontspecJsonFileName );
        $_ENV['S_FRONTEND_DIR'] = get_stylesheet_directory() . '/' . rtrim($this->get_config()->get_front_end_file_path(''), '/');

        $this->add_filters();
    }

    /**
     * Add Wordpress filters
     * 
     */
    public function add_filters() {

        add_filter( 'Abt\get_spec', [ $this, 'get_spec' ], 10, 1 );
        add_filter( 'Abt\get_props_categories', [ $this, 'get_props_categories' ], 10, 1 );
    }

    public function get_front_spec( $data = false ) {

        // If specData propertie is still emtpy, load spec files
        if( is_null( $this->frontSpecData ) ) {
            $this->frontSpecData = $this->get_config()->spec_file_get_contents( $this->get_config()->get_front_end_file_path($this->frontspecJsonFileName) );
        }

        if ( $data ) {

            if( array_key_exists($data, $this->frontSpecData) )
                return $this->frontSpecData[$data];
            else
                return null;
        }
        else
            return $this->frontSpecData;
    }


    public function get_spec( $theme_spec ) {

        return array_replace_recursive( $this->get_front_spec(), $theme_spec);
    }


    public function get_props_categories( $props_categories ) {

        $front_props_categories = $this->get_front_spec( 'categories' );
        return array_replace_recursive( $front_props_categories, $props_categories);
    }

}