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

        add_action( 'admin_post_wpe-component-block-renderer', [ $this->componentBlocksService, 'admin_render' ] );

        // add_action( 'wp_ajax_wpe-component-edit', [ $this->componentBlocksService, 'wpe_component_edit' ] );

        add_action( 'rest_api_init', [ $this, 'register_rest_route' ] );
    }

    public function register_rest_route() {

        register_rest_route( 'wp/v2', '/wpe-component-edit', array(
            'methods' => 'POST',
            'callback' => [ $this->componentBlocksService, 'wpe_component_edit' ],
            'permission_callback' => function() { return ''; }
        ) );
    }
    



    /**
     * Add Wordpress filters
     * 
     */
    public function add_filters() {

        // If needed, override component block spec juste before generate it
        add_filter( 'Abt\generate_component_block_spec', [ $this->componentBlocksService, 'override_block_spec' ], 10, 2 );

        // Managing block categories
        add_filter( 'block_categories_all', [ $this->componentBlocksService, 'filter_block_categories' ], 10, 2 );

        // Allow all custom/wpe-component registered
        add_filter( 'Abt\allowed_block_types_all', [ $this->componentBlocksService, 'allowed_block_types_all' ] );

        // Fromat attributes before rendering
        add_filter( 'Abt\attributes_formatting', 'Abt\Helpers\Attributes::formatting', 10, 2 );
    }

}