<?php

namespace Abt\Services;

use Abt\Models\ComponentBlock;
use Abt\Models\CoreBlock;
use Abt\Models\LayoutBlock;
use Abt\Services\FrontEnd as FrontEndService;

/**
 * WPE Gutenberg blocks CLI commands
 * 
 */

class CliCommand extends ServiceBase {

    private $frontEndService;

    public function __construct() {

        parent::__construct();

        $this->frontEndService = new FrontEndService();
        \WP_CLI::add_command( 'wpe-blocks', $this );
    }



    /**
     * Generate component blocks
     * 
     */
    public function generate_component_blocks() {

        $custom_blocks_routing = $this->get_config()->get_spec('custom_blocks_routing');
        
        $front_components = $this->frontEndService->get_components();
        if( is_array($front_components) && count($front_components) > 0 ) {

            // Remove current component blocks directory
            if( file_exists(get_stylesheet_directory() . '/' . $this->get_config()->get('componentBlocksLocation')) ) {
                exec( 'rm -r ' . get_stylesheet_directory() . '/' . $this->get_config()->get('componentBlocksLocation') );
            }

            foreach( $front_components as $component ) {

                // Get viewspec JSON file for a single component returned by frontEndService
                $component_frontspec = $this->frontEndService->get_component_viewspec( $component );

                // If invalid or null component, just bypass it and continue to the next component
                if( ! is_null( $component_frontspec ) && is_array( $component_frontspec ) && isset($component_frontspec['id'], $component_frontspec['path']) ) {

                    if( $custom_blocks_routing && is_array($custom_blocks_routing) && array_key_exists($component_frontspec['id'], $custom_blocks_routing) ) {

                        if( strpos( $custom_blocks_routing[$component_frontspec['id']], 'core/' ) !== false ) {

                            // CoreBlock instanciation && block spec generation
                            $coreBlockInstance = new CoreBlock( $custom_blocks_routing[$component_frontspec['id']] );
                            $block_spec = $coreBlockInstance->generate_block_spec( $component_frontspec );
                        }
                        else if( strpos( $custom_blocks_routing[$component_frontspec['id']], 'layout/' ) !== false ) {

                            // LayoutBlock instanciation && block spec generation
                            $layoutBlockInstance = new LayoutBlock( str_replace( 'layout/', '', $custom_blocks_routing[$component_frontspec['id']] ) );
                            $block_spec = $layoutBlockInstance->generate_block_spec( $component_frontspec );
                        }
                    }
                    else {

                        // ComponentBlock instanciation && block spec generation
                        $componentBlockInstance = new ComponentBlock();
                        $block_spec = $componentBlockInstance->generate_block_spec( $component_frontspec );
                        $block_metadata = $componentBlockInstance->generate_block_metadata();
                    }

                    // WP_CLI messages
                    if( isset($block_spec) ) {
                        if( $block_spec ) { \WP_CLI::success( $block_spec . ' successfully generated.' ); }
                        else { \WP_CLI::error( $component_frontspec['id'] . ': an error occurs during block spec generation...' ); }
                    }
                    if( isset($block_metadata) ) {
                        if( $block_metadata ) { \WP_CLI::success( $block_metadata . ' successfully generated.' ); }
                        else {  \WP_CLI::error( $component_frontspec['id'] . ': an error occurs during block metadata generation...' ); }
                    }
                }
                else {
                    \WP_CLI::error( $component . ': an error occurs during component viewspec generation...' );
                }
            }
        }
    }

}