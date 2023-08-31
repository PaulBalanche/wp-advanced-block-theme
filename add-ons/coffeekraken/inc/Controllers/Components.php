<?php

namespace Abt\Coffeekraken\Controllers;

use Abt\Controllers\ControllerBase;

class Components extends ControllerBase {

    private $frontspecJsonFileName = 'frontspec.json';

    public function __construct() {
        parent::__construct();

        $this->add_filters();
    }

    /**
     * Add Wordpress filters
     * 
     */
    public function add_filters() {

        add_filter( 'Abt\get_components', [ $this, 'get_components' ], 10, 1 );
        add_filter( 'Abt\pre_get_component_viewspec', [ $this, 'pre_get_component_viewspec' ], 10, 2 );
        add_filter( 'Abt\get_component_viewspec', [ $this, 'get_component_viewspec' ], 10, 2 );
    }



    public function get_components_dir( $path ) {
        
        $path = str_replace( './', '', $path );
        $path = trim( $path, '/' );

        return get_stylesheet_directory() . '/' . $this->get_config()->get_front_end_file_path( $path ) . '/';
    }


    public function get_components_namespace_settings( $namespace, $path ) {

        $path = ( strpos($path, '/') === 0 ) ? $path : $this->get_components_dir( $path );

        $namespace_settings = [
            'namespaces' => [
                $namespace => [ rtrim( $path, '/' ) ]
            ],
            'previewUrl' => function ($args) {
                return (isset($args->path) && file_exists($args->path) ) ? str_replace( WP_HOME, '', str_replace( WP_CONTENT_DIR, WP_CONTENT_URL, $args->path)) : null;
            }
        ];

        return $namespace_settings;
    }


    public function get_front_blocks() {

        $blocks = [];

        $specs = $this->get_config()->get_spec( 'specs' );
        if( $specs && is_array($specs) && isset($specs['namespaces']) && is_array($specs['namespaces']) ) {

            foreach( $specs['namespaces'] as $namespace => $paths ) {

                if( strpos($namespace, 'sugar') !== false ) {
                    continue;
                }

                foreach( $paths as $path ) {

                    $namespaceSpecs = \Sugar\specs\listSpecs( [ $namespace ], $this->get_components_namespace_settings( $namespace, $path ) );
  
                    foreach( $namespaceSpecs as $namespaceSpec ) {
                        $blocks[] = $namespaceSpec;
                    }
                }
            }
        }

        return $blocks;
    }

    public function get_components( $components ) {

        $components = [];
        foreach( $this->get_front_blocks() as $block ) {
            $components[] = str_replace( get_stylesheet_directory() . '/' . $this->get_config()->get_front_end_file_path( $this->get_config()->get('templateViewsLocation') ) , '', $block['dir'] );
        }
        
        return $components;
    }

    /**
     * Filter get_component_viewspec method in order to merge component attributes with override-spec JSON file
     * 
     */
    public function pre_get_component_viewspec( $component_viewspec, $component ) {

        foreach( $this->get_front_blocks() as $block ) {
            if( str_replace( get_stylesheet_directory() . '/' . $this->get_config()->get_front_end_file_path( $this->get_config()->get('templateViewsLocation') ) , '', $block['dir'] ) == $component ) {

                $namespace_settings = $this->get_components_namespace_settings( str_replace('/', '.', $component ), $this->get_config()->get('templateViewsLocation') );
                $component_viewspec = json_decode(json_encode( \SViews\specs\readViewsSpec( str_replace('/', '.', $component ), $namespace_settings ) ), true);
                break;
            }
        }

        return $component_viewspec;
    }



    public function get_component_viewspec( $component_viewspec, $component ) {

        if( ! isset($component_viewspec['path']) && isset($component_viewspec['viewPath']) ) {
            $component_viewspec['path'] = $component_viewspec['viewPath'];
        }

        return $component_viewspec;
    }

}