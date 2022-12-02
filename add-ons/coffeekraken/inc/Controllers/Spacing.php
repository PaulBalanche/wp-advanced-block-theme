<?php

namespace Abt\Coffeekraken\Controllers;

use Abt\Controllers\ControllerBase;

class Spacing extends ControllerBase {

    function __construct() {
        parent::__construct();

        $this->add_filters();
    }



    /**
     * Add Wordpress filters
     * 
     */
    public function add_filters() {

        // add_filter( 'Abt\block_spacing_formatting', [ $this, 'coffeekraken_spacing_formatting'], 11, 2 );
    }



    /**
     * Bootstrap spacing formatting
     * 
     */
    public function coffeekraken_spacing_formatting( $spacing, $type = 'padding' ) {
        
        if( $spacing && is_array($spacing) ) {

            $coffeekraken_spacing = [];

            foreach( $spacing as $breakpoint_key => $breakpoint_value ) {
                if( is_array($breakpoint_value) ) {

                    if( isset($breakpoint_value['all']) ) {
                        $coffeekraken_spacing['all'] = $breakpoint_value['all'];
                    }
                    
                    if( isset($breakpoint_value['y']) ) {
                        $coffeekraken_spacing['block'] = $breakpoint_value['y'];
                    }

                    if( isset($breakpoint_value['x']) ) {
                        $coffeekraken_spacing['inline'] = $breakpoint_value['x'];
                    }

                    if( isset($breakpoint_value['top']) ) {
                        $coffeekraken_spacing['blockStart'] = $breakpoint_value['top'];
                    }

                    if( isset($breakpoint_value['bottom']) ) {
                        $coffeekraken_spacing['blockEnd'] = $breakpoint_value['bottom'];
                    }

                    if( isset($breakpoint_value['left']) ) {
                        $coffeekraken_spacing['inlineStart'] = $breakpoint_value['left'];
                    }

                    if( isset($breakpoint_value['right']) ) {
                        $coffeekraken_spacing['inlineEnd'] = $breakpoint_value['right'];
                    }
                }
            }
            
            $spacing = $coffeekraken_spacing;
        }

        return $spacing;
    }

}