<?php

namespace Abt\Filters;

class Blocks extends FiltersBase {

    function __construct() {
        parent::__construct();

        $this->add_filters();
    }



    /**
     * Add Wordpress filters
     * 
     */
    public function add_filters() {

        // Filters the allowed block types for all editor types.
        add_filter( 'allowed_block_types_all', [ $this, 'allowed_block_types_all' ], 10, 2 );
    }



    /**
     * Filters the allowed block types for all editor types.
     * 
     */
    public function allowed_block_types_all( $allowed_block_types, $post ) {

        $allowed_block_types_theme = $this->get_config()->get_spec('allowed_block_types');
        if( ! is_null($allowed_block_types_theme) ) {

            // Add core/block for reusable-blocks support
            $allowed_block_types = array_merge( $allowed_block_types_theme, [ 'core/block' ] );

            $allowed_block_types = apply_filters( 'Abt\allowed_block_types_all', $allowed_block_types );
        }

        return $allowed_block_types;
    }
    
}