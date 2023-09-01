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
        add_filter( 'Abt\attributes_spaces_formatting', [ $this, 'attributes_spaces_formatting'], 10, 1 );
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


    public function attributes_spaces_formatting( $spaces ) {

        $newSpaces = null;

        $configMedia = $this->get_config()->get_spec('media');
        $defaultDevice = ( $configMedia && is_array($configMedia) && isset($configMedia['defaultMedia']) ) ? $configMedia['defaultMedia'] : 'desktop';
        if( is_array($spaces) && isset($spaces[$defaultDevice]) ) {
            
            $newSpaces = [];
            if( is_array($spaces[$defaultDevice]) && isset($spaces[$defaultDevice]['padding']) && is_array($spaces[$defaultDevice]['padding']) ) {

                if( isset($spaces[$defaultDevice]['padding']['top']) ) { $newSpaces['paddingTop'] = str_replace('px', '', $spaces[$defaultDevice]['padding']['top']); }
                if( isset($spaces[$defaultDevice]['padding']['left']) ) { $newSpaces['paddingLeft'] = str_replace('px', '', $spaces[$defaultDevice]['padding']['left']); }
                if( isset($spaces[$defaultDevice]['padding']['right']) ) { $newSpaces['paddingRight'] = str_replace('px', '', $spaces[$defaultDevice]['padding']['right']); }
                if( isset($spaces[$defaultDevice]['padding']['bottom']) ) { $newSpaces['paddingBottom'] = str_replace('px', '', $spaces[$defaultDevice]['padding']['bottom']); }
            }

            if( is_array($spaces[$defaultDevice]) && isset($spaces[$defaultDevice]['margin']) && is_array($spaces[$defaultDevice]['margin']) ) {

                if( isset($spaces[$defaultDevice]['margin']['top']) ) { $newSpaces['marginTop'] = str_replace('px', '', $spaces[$defaultDevice]['margin']['top']); }
                if( isset($spaces[$defaultDevice]['margin']['left']) ) { $newSpaces['marginLeft'] = str_replace('px', '', $spaces[$defaultDevice]['margin']['left']); }
                if( isset($spaces[$defaultDevice]['margin']['right']) ) { $newSpaces['marginRight'] = str_replace('px', '', $spaces[$defaultDevice]['margin']['right']); }
                if( isset($spaces[$defaultDevice]['margin']['bottom']) ) { $newSpaces['marginBottom'] = str_replace('px', '', $spaces[$defaultDevice]['margin']['bottom']); }
            }
        }

        return $newSpaces;
    }

}