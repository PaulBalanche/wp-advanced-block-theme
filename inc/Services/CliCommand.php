<?php

namespace Abt\Services;

use Abt\Models\ComponentBlock;
use Abt\Services\FrontEnd as FrontEndService;

/**
 * WPE Gutenberg blocks CLI commands
 * 
 */

class CliCommand {

    private $frontEndService;

    public function __construct() {

        $this->frontEndService = new FrontEndService();
        \WP_CLI::add_command( 'wpe-blocks', $this );
    }



    /**
     * Generate component blocks
     * 
     */
    public function generate_component_blocks() {

        $front_components = $this->frontEndService->get_components();
        if( is_array($front_components) && count($front_components) > 0 ) {
            foreach( $front_components as $component ) {

                // Get viewspec JSON file for a single component returned by frontEndService
                $component_frontspec = $this->frontEndService->get_component_viewspec( $component );

                // If invalid or null component, just bypass it and continue to the next component
                if( ! is_null( $component_frontspec ) && is_array( $component_frontspec ) && isset($component_frontspec['id'], $component_frontspec['path']) ) {

                    // ComponentBlock instanciation && block spec generation
                    $componentBlockInstance = new ComponentBlock();
                    $block_spec = $componentBlockInstance->generate_block_spec( $component_frontspec );
                    $block_metadata = $componentBlockInstance->generate_block_metadata();

                    // WP_CLI messages
                    if( $block_spec ) { \WP_CLI::success( $block_spec . ' successfully generated.' ); }
                    else { \WP_CLI::error( $component_frontspec['id'] . ': an error occurs during block spec generation...' ); }
                    if( $block_metadata ) { \WP_CLI::success( $block_metadata . ' successfully generated.' ); }
                    else {  \WP_CLI::error( $component_frontspec['id'] . ': an error occurs during block metadata generation...' ); }
                }
            }
        }
    }

}