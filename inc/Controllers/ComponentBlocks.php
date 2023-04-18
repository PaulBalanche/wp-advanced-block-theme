<?php

namespace Abt\Controllers;

use Abt\Services\ComponentBlocks as ComponentBlocksService;

class ComponentBlocks extends ControllerBase {

    private $componentBlocksService;

    public function __construct() {
        parent::__construct();

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
        add_action( 'rest_api_init', [ $this, 'register_componentblocks_routes' ] );
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
    }



    /**
     * Register REST API routes for Components Blocks
     * 
     */
    public function register_componentblocks_routes() {

        register_rest_route( $this->get_config()->get('rest_api_namespace'), ComponentBlocksService::get_attributes_autosaves_rest_api_resource_path() . '/(?P<post_id>[\d]+)/(?P<component_id>[\S]+)/(?P<client_id>[\S]+)', [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [ $this->componentBlocksService, 'attributes_autosaves_get' ],
            'permission_callback' => [ $this->componentBlocksService, 'attributes_autosaves_get_permissions_check' ],
        ] );
        
        register_rest_route( $this->get_config()->get('rest_api_namespace'), ComponentBlocksService::get_attributes_autosaves_rest_api_resource_path() . '/(?P<post_id>[\d]+)/(?P<component_id>[\S]+)/(?P<client_id>[\S]+)', [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => [ $this->componentBlocksService, 'attributes_autosaves_post' ],
            'permission_callback' => [ $this->componentBlocksService, 'attributes_autosaves_post_permissions_check' ],
        ] );
    }

}