<?php

namespace Abt\Coffeekraken\Controllers;

class Twig {

    private $config;

    public function __construct() {

        $this->config = \Abt\Singleton\Config::getInstance();

        $this->add_filters();
    }

    /**
     * Add Wordpress filters
     * 
     */
    public function add_filters() {

        // Init Twig template
        add_filter( 'timber/twig', [ $this, 'initSugarTwig' ] );

        add_filter( 'Abt\get_components', [ $this, 'get_components' ], 10, 1 );
        add_filter( 'Abt\pre_get_component_viewspec', [ $this, 'pre_get_component_viewspec' ], 10, 2 );
    }

    /**
     * Init Twig template
     *      Tiwg filters, ...
     * 
     */
    public function initSugarTwig( $twig ) {
        
        // init twig with Sugar power
        $twig = \Sugar\twig\initTwig($twig);

        return $twig;
    }


    public function get_components_dir( $path ) {
        
        $path = str_replace( './', '', $path );
        $path = trim( $path, '/' );

        return get_stylesheet_directory() . '/' . $this->config->get_front_end_file_path( $path ) . '/';
    }


    public function get_components_namespace_settings( $namespace, $path ) {

        $path = ( strpos($path, '/') === 0 ) ? $path : $this->get_components_dir( $path );

        $namespace_settings = [
            'namespaces' => [
                $namespace => [ rtrim( $path, '/' ) ]
            ]
        ];

        return $namespace_settings;
    }


    public function get_front_blocks() {

        $blocks = [];

        $specs = $this->config->get_spec( 'specs' );
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
            $components[] = str_replace( get_stylesheet_directory() . '/' . $this->config->get_front_end_file_path( $this->config->get('templateViewsLocation') ) , '', $block['dir'] );
        }
        
        return $components;
    }

    /**
     * Filter get_component_viewspec method in order to merge component attributes with override-spec JSON file
     * 
     */
    public function pre_get_component_viewspec( $component_viewspec, $component ) {

        foreach( $this->get_front_blocks() as $block ) {
            if( str_replace( get_stylesheet_directory() . '/' . $this->config->get_front_end_file_path( $this->config->get('templateViewsLocation') ) , '', $block['dir'] ) == $component ) {

                $namespace_settings = $this->get_components_namespace_settings( $block['namespace'], pathinfo($block['dir'])['dirname'] );
                $component_viewspec = json_decode(json_encode( \Sugar\specs\readSpec( $block['dotpath'], $namespace_settings ) ), true);
                break;
            }
        }

        return $component_viewspec;
    }

}