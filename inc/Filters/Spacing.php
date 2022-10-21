<?php

namespace Abt\Filters;

class Spacing extends FiltersBase {

    function __construct() {
        parent::__construct();

        $this->add_filters();
    }



    /**
     * Add Wordpress filters
     * 
     */
    public function add_filters() {

        add_filter( 'Abt\block_spacing_formatting', [ $this, 'wpe_gutenberg_blocks_spacing_formatting'], 10, 2 );
    }



    /**
     * Bootstrap spacing formatting
     * 
     */
    public function wpe_gutenberg_blocks_spacing_formatting( $spacing, $type = 'padding' ) {
                
        if( $spacing && is_array($spacing) ) {

            $config_spacing = $this->get_config()->get_spec('spacing');
            if( is_null($config_spacing) ) {

                $spacing_formatted = '';
                foreach( $spacing as $breakpoint_key => $breakpoint_value ) {
                    if( is_array($breakpoint_value) ) {
                        foreach( $breakpoint_value as $key => $val ) {
                            $spacing_formatted .= $breakpoint_key;
                            $spacing_formatted .= '-';
                            $spacing_formatted .= ( ( $type == 'margin' ) ? 'm' : 'p' );
                            $spacing_formatted .= '-' . $key . '-' . $val . ' ';
                        }
                    }
                }
                $spacing = trim( $spacing_formatted );
            }
            else {
                switch( $config_spacing ) {

                    case 'bootstrap':
                        $spacing_formatted = '';
                        foreach( $spacing as $breakpoint_key => $breakpoint_value ) {
                            if( is_array($breakpoint_value) ) {
                                foreach( $breakpoint_value as $key => $val ) {
                                    $spacing_formatted .= ( $type == 'margin' ) ? ' m' : ' p';
                                    $spacing_formatted .= str_replace( [ 'top', 'right', 'bottom', 'left', 'all' ], [ 't', 'e', 'b', 's', '' ], $key );
                                    $spacing_formatted .= '-';
                                    $spacing_formatted .= str_replace( [ 'mobile', 'tablet', 'desktop' ], [ '', 'sm-', 'lg-' ], $breakpoint_key );
                                    $spacing_formatted .= $val;
                                }
                            }
                        }
                        $spacing = trim( $spacing_formatted );
                        break;
                }
            }
        }

        return $spacing;
    }
    
}