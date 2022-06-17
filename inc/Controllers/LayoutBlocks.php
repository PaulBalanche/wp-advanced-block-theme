<?php

namespace Abt\Controllers;

use Abt\Services\LayoutBlocks as LayoutBlocksService;

class LayoutBlocks extends ControllerBase {

    private $layoutBlocksService;

    public function __construct() {
        parent::__construct();

        $this->layoutBlocksService = new LayoutBlocksService();
        
        $this->add_actions();
        $this->add_filters();
    }



    /**
     * Add Wordpress actions
     * 
     */
    public function add_actions() {

        add_action( 'init', [ $this->layoutBlocksService, 'register_layout_blocks' ], 99 );
    }



    /**
     * Add Wordpress filters
     * 
     */
    public function add_filters() {

        // Managing block categories
        add_filter( 'block_categories_all', [ $this->layoutBlocksService, 'filter_block_categories' ], 10, 2 );
    }

}