<?php

namespace Abt\Coffeekraken\Controllers;

use Abt\Controllers\ControllerBase;

class Twig extends ControllerBase {

    public function __construct() {
        parent::__construct();
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
        
        add_filter( 'Abt\localize_editor_script', [ $this, 'localize_editor_script' ], 10, 3 );
    }

    /**
     * Init Twig template
     *      Tiwg filters, ...
     * 
     */
    public function initSugarTwig( $twig ) {

        // init twig with Sugar power
        $twig = \SViews\twig\initTwig( $twig );

        return $twig;
    }


    public function timber_locations( $locations ) {

        $locations = array_merge( $locations, \SViews\twig\getDefaultViewDirs() );

        return $locations;
    }



    public function localize_editor_script( $spec, $block, $js_variable ) {

        if( $js_variable == 'theme_spec' && isset($spec['margin']) && is_array($spec['margin']) ) {

            $new_margin = [];
            foreach( array_keys($spec['margin']) as $val ) {
                $new_margin[] = [
                    'label' => $val,
                    'value' => $val
                ];
            }
            $spec['margin'] = $new_margin;
        }

        return $spec;
    }
}