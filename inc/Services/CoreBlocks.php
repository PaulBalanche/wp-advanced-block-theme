<?php

namespace Abt\Services;

use Abt\Main;

class CoreBlocks extends ServiceBase {

    private $blocks_spec = null;

    function __construct() {
        parent::__construct();
    }



    /**
     * Init core block overrided
     * 
     */
    public function core_blocks_init() {

        $core_blocks_dir = get_stylesheet_directory() . '/' . $this->get_config()->get('componentBlocksLocation') . 'core';
        if( file_exists($core_blocks_dir) ) {

            // Scan blocks dir and loop each block
            $core_blocks_scan = scandir( $core_blocks_dir );
            foreach( $core_blocks_scan as $core_block ) {

                if( is_dir( $core_blocks_dir . '/' . $core_block ) && $core_block != '..' && $core_block != '.' ) {
                    Main::getInstance()->get_core_block_instance( 'core/' . $core_block );
                }
            }
        }
    }



    /**
     * If needed, override layout block spec juste before generate it
     * 
     */
    public function override_block_spec( $block_spec, $coreBlockInstance ) {

        $override_spec = $coreBlockInstance->get_override_viewspec();
        return ( $override_spec ) ? array_replace_recursive( $block_spec, $override_spec ) : $block_spec;
    }
    
}