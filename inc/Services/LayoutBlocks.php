<?php

namespace Abt\Services;

use Abt\Main;

class LayoutBlocks extends ServiceBase {

    function __construct() {
        parent::__construct();
    }



    /**
     * Register custom blocks
     * 
     */
    public function register_layout_blocks() {

        foreach( $this->get_layout_blocks() as $layout_block ) {

            $layoutBlockInstance = Main::getInstance()->get_layout_block_instance( $layout_block );
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



    /**
     * If needed, override layout block spec juste before generate it
     * 
     */
    public function override_block_spec( $block_spec, $layoutBlockInstance ) {

        $override_spec = $layoutBlockInstance->get_override_viewspec();
        return ( $override_spec ) ? array_replace_recursive( $block_spec, $override_spec ) : $block_spec;
    }

}