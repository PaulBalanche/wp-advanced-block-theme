<?php

namespace Abt\Controllers;

use Abt\Services\CoreBlocks as CoreBlocksService;

class CoreBlocks extends ControllerBase {

    public function __construct() {
        parent::__construct();
        
        $this->coreBlocksService = new CoreBlocksService();

        $this->add_actions();
    }


    /**
     * Add Wordpress actions
     * 
     */
    public function add_actions() {

        add_action( 'init', [ $this->coreBlocksService, 'core_blocks_init' ] );
    }

}