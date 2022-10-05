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
            $cellsLayout[] = ( $innerBlock['attrs']['layout'] ) ?? null;
        }

        // Generate Coffeekraken CSS layout string
        $layout = [
            'default' => Css::generate_coffeekraken_css_layout( $cellsLayout, 'mobile' )
        ];
        $media = \Abt\Singleton\Config::getInstance()->get_spec('media');
        if( $media && is_array($media) && isset($media['queries']) ) {
            foreach( $media['queries'] as $device => $query ) {

                $layout[$device] = Css::generate_coffeekraken_css_layout( $cellsLayout, $device );
            }
        }
    
        // Generate grid ID
        $grid_id = ( isset($pre_rendered_attributes['anchor']) && ! empty($pre_rendered_attributes['anchor']) ) ? $pre_rendered_attributes['anchor'] : 'grid_' . mt_rand();
    
        // Prepare data
        $pre_rendered_attributes = array_merge( $pre_rendered_attributes, [
            'id' => $grid_id,
            'layout' => $layout,
            'frontspec' => [
                'mediaSettings' => $media
            ]
        ] );
    
        // Return
        return $pre_rendered_attributes;
    }

}