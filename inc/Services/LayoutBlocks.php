<?php

namespace Abt\Services;

use Abt\Models\LayoutBlock;

class LayoutBlocks extends ServiceBase {

    function __construct() {
        parent::__construct();
    }



    /**
     * Register custom blocks
     * 
     */
    public function register_layout_blocks() {

        foreach( $this->get_layout_blocks() as $custom_block ) {

            $layoutBlockInstance = new LayoutBlock( $custom_block );
            $layoutBlockInstance->register();
        }
    }



    /**
     * Managing block categories
     * 
     */
    function filter_block_categories( $block_categories, $editor_context ) {

        if ( ! empty( $editor_context->post ) ) {

            // Add custom blocks categories
            $block_categories[] = [
                'slug'  => 'wpe-layout',
                'title' => 'Layout',
                'icon'  => null
            ];
        }

        return $block_categories;
    }



    /**
     * Get layout blocks defined in plugin
     * 
     */
    public function get_layout_blocks() {

        $layout_blocks = [];

        $layout_blocks_dir = ABT_PLUGIN_DIR . $this->get_config()->get('layoutBlocksLocation');
        if( file_exists($layout_blocks_dir) ) {

            // Scan blocks dir and loop each block
            $blocks_scan = scandir( $layout_blocks_dir );
            foreach( $blocks_scan as $block ) {

                if( is_dir( $layout_blocks_dir . '/' . $block ) && $block != '..' && $block != '.' ) {

                    $layout_blocks[] = $block;
                }
            }
        }

        return $layout_blocks;
    }

}