<?php

namespace Abt;

use Abt\Filters\Spacing as SpacingFilter;
use Abt\Filters\Blocks as BlocksFilter;
use Abt\Controllers\Theme as ThemeController;
use Abt\Controllers\LayoutBlocks as LayoutBlocksController;
use Abt\Controllers\ComponentBlocks as ComponentBlocksController;
use Abt\Controllers\CoreBlocks as CoreBlocksController;
use Abt\Controllers\BlockPatterns as BlockPatternsController;
use Abt\Services\CliCommand;
use Abt\Models\ComponentBlock;
use Abt\Models\CoreBlock;
use Abt\Models\LayoutBlock;
use Abt\Singleton\Config;

class Main {

    private static $_instance;
    private $componentBlockInstances = [],
            $coreBlockInstances = [],
            $layoutBlockInstances = [],
            $blocksRegistered = [],
            $config;

    function __construct() {

        $this->config = Config::getInstance();
        
        // Filters
        new SpacingFilter();
        new BlocksFilter();

        // Controllers
        new ThemeController();
        new LayoutBlocksController();
        new ComponentBlocksController();
        new CoreBlocksController();
        new BlockPatternsController();

        // WP-CLI
        if ( defined( 'WP_CLI' ) && \WP_CLI ) {
            new CliCommand();
        }
    }



    /**
     * Utility method to retrieve the main instance of the class.
     * The instance will be created if it does not exist yet.
     * 
     */
    public static function getInstance() {

        if( is_null(self::$_instance) ) {
            self::$_instance = new Main();
        }
        return self::$_instance;
    }

    public function get_config() {
        return $this->config;
    }
    


    /**
     * Get ComponentBlock instance object if exists, or create it
     * 
     */
    public function get_component_block_instance( $blockId ) {

        $blockId = ComponentBlock::format_id( $blockId );

        if( ! isset( $this->componentBlockInstances[ $blockId ] ) ) {
            new ComponentBlock( $blockId );
        }

        return $this->componentBlockInstances[ $blockId ];
    }



    /**
     * Get Core instance object if exists, or create it
     * 
     */
    public function get_core_block_instance( $blockId ) {

        if( ! isset( $this->coreBlockInstances[ $blockId ] ) ) {
            new CoreBlock( $blockId );
        }

        return $this->coreBlockInstances[ $blockId ];
    }
    
    
    
    /**
     * Get Layout instance object if exists, or create it
     * 
     */
    public function get_layout_block_instance( $blockId ) {

        if( ! isset( $this->layoutBlockInstances[ $blockId ] ) ) {
            new LayoutBlock( $blockId );
        }

        return $this->layoutBlockInstances[ $blockId ];
    }



    /**
     * Add ComponentBlock instance object
     * 
     */
    public function add_component_block_instance( $instance ) {
        $this->componentBlockInstances[ $instance->get_ID() ] = $instance;
    }
    
    
    
    /**
     * Add CoreBlock instance object
     * 
     */
    public function add_core_block_instance( $instance ) {
        $this->coreBlockInstances[ $instance->get_ID() ] = $instance;
    }



    /**
     * Add LayoutBlock instance object
     * 
     */
    public function add_layout_block_instance( $instance ) {
        $this->layoutBlockInstances[ $instance->get_ID() ] = $instance;
    }



    /**
     * Save registered blocks
     * 
     */
    public function add_block_registered( $blockId ) {
        $this->blocksRegistered[] = $blockId;
    }



    /**
     * Get registered blocks
     * 
     */
    public function get_registered_blocks() {
        return $this->blocksRegistered;
    }

}