<?php

namespace Abt\Coffeekraken\Controllers;

use Abt\Coffeekraken\Helpers\Css;

class Grid {

    public function __construct() {

        $this->add_filters();
    }

    /**
     * Add Wordpress filters
     * 
     */
    public function add_filters() {

        add_filter( 'Abt\pre_render_attributes_layout_wpe-grid', [ $this, 'handle_grid' ], 10, 4 );
    }

    public function handle_grid( $pre_rendered_attributes, $attributes, $content, $block_instance ) {

        // Get all cells grid informations
        $cellsLayout = [];
        foreach( $block_instance->parsed_block['innerBlocks'] as $innerBlock ) {

            if( $innerBlock['blockName'] != 'custom/wpe-column' ) {
                continue;
            }
            $cellsLayout[] = $innerBlock['attrs'];
        }

        // Generate Coffeekraken CSS layout string
        $layout = Css::generate_coffeekraken_css_layout( $cellsLayout );
    
        // Generate grid ID
        $grid_id = ( isset($pre_rendered_attributes['anchor']) && ! empty($pre_rendered_attributes['anchor']) ) ? $pre_rendered_attributes['anchor'] : 'grid_' . mt_rand();
    
        // Prepare data
        $pre_rendered_attributes = array_merge( $pre_rendered_attributes, [
            'attributes' => [
                'id' => $grid_id,
                'attr-layout' => $layout
            ],
            'css' => \Sugar\css\layoutCss( $layout, [ 'selector' => '#' . $grid_id ] )
        ] );
    
        // Return
        return $pre_rendered_attributes;
    }

}