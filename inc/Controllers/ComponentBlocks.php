<?php

namespace Abt\Controllers;

use Abt\Services\FrontEnd as FrontEndService;
use Abt\Services\ComponentBlocks as ComponentBlocksService;

class ComponentBlocks extends ControllerBase {

    private $frontEndService,
            $componentBlocksService;

    public function __construct() {
        parent::__construct();

        $this->frontEndService = new FrontEndService();
        $this->componentBlocksService = new ComponentBlocksService();
        
        $this->add_actions();
        $this->add_filters();
    }



    /**
     * Add Wordpress actions
     * 
     */
    public function add_actions() {

        add_action( 'init', [ $this->componentBlocksService, 'register_component_blocks' ], 99 );
    }



    /**
     * Add Wordpress filters
     * 
     */
    public function add_filters() {

        // Merge component attributes with override-spec JSON file
        add_filter( 'Abt\get_component_viewspec', [ $this, 'filter_get_component_viewspec' ], 10, 2 );

        // Managing block categories
        add_filter( 'block_categories_all', [ $this->componentBlocksService, 'filter_block_categories' ], 10, 2 );

        // Allow all custom/wpe-component registered
        add_filter( 'Abt\allowed_block_types_all', [ $this->componentBlocksService, 'allowed_block_types_all' ] );

        // Fromat attributes before rendering
        add_filter( 'Abt\attributes_formatting', 'Abt\Helpers\Attributes::formatting', 10, 2 );
    }



    /**
     * Filter get_component_viewspec method in order to merge component attributes with override-spec JSON file
     * 
     */
    public function filter_get_component_viewspec( $viewspec_data, $component_dir ) {

        return ( $component_dir == $this->frontEndService->get_components_dir() ) ? $this->componentBlocksService->override_component_viewspec( $viewspec_data ) : $viewspec_data;
    }

}