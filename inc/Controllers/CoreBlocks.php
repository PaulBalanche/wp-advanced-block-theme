<?php

namespace Abt\Controllers;

use Abt\Services\CoreBlocks as CoreBlocksService;

class CoreBlocks extends ControllerBase {

    public function __construct() {
        parent::__construct();
        
        $this->coreBlocksService = new CoreBlocksService();

        // $this->add_actions();
        // $this->add_filters();
    }


    /**
     * Add Wordpress actions
     * 
     */
    public function add_actions() {

        add_action( 'init', [ $this->coreBlocksService, 'core_blocks_init' ] );
    }



    /**
     * Add Wordpress filters
     * 
     */
    public function add_filters() {

        // If needed, override core block spec juste before generate it
        add_filter( 'Abt\generate_core_block_spec', [ $this->coreBlocksService, 'override_block_spec' ], 10, 2 );
    }

}