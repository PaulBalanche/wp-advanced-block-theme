<?php

namespace Abt\Services;

use Abt\Models\ComponentBlockMaster;
use Abt\Main;
use Abt\Singleton\Config;

class ComponentBlocks extends ServiceBase {

    function __construct() {
        parent::__construct();
    }



    /**
     * Register dynamic component block
     * 
     */
    public function register_component_blocks() {

        $componentBlockMasterInstance = new ComponentBlockMaster();
        $componentBlockMasterInstance->register_components();
    }



    /**
     * Managing block categories
     * 
     */
    function filter_block_categories( $block_categories, $editor_context ) {

        if ( ! empty( $editor_context->post ) ) {

            // Add component blocks categories
            $new_block_categories = [];
            foreach( self::get_all_blocks_spec() as $block_spec ) {
                if( isset($block_spec['category']) && is_array($block_spec['category']) && isset($block_spec['category']['slug'], $block_spec['category']['title']) ) {

                    if( ! isset( $new_block_categories[ $block_spec['category']['slug'] ]) ) {
                        $new_block_categories[ $block_spec['category']['slug'] ] = [
                            'slug'  => $block_spec['category']['slug'],
                            'title' => $block_spec['category']['title'],
                            'icon'  => null
                        ];
                    }
                }
            }

            $block_categories = array_merge( $block_categories, array_values($new_block_categories) );
        }

        return $block_categories;
    }



    /**
     * Get all the back-end blocks spec
     * 
     */
    public static function get_all_blocks_spec() {

        $all_blocks_spec= [];

        $blocks_dir = get_stylesheet_directory() . '/' . Config::getInstance()->get('componentBlocksLocation') . Config::getInstance()->get('blocksNamespace');
        if( file_exists($blocks_dir) ) {

            // Scan blocks dir and loop each block
            $blocks_scan = scandir( $blocks_dir );
            foreach( $blocks_scan as $block ) {

                if( is_dir( $blocks_dir . '/' . $block ) && $block != '..' && $block != '.' ) {

                    // ComponentBlock instanciation && get block spec
                    $componentBlockInstance = Main::getInstance()->get_component_block_instance( $block );
                    $block_spec = $componentBlockInstance->get_block_spec();
                    if( $block_spec && is_array($block_spec) ) {
                        $all_blocks_spec[] = $block_spec;
                    }
                }
            }
        }

        return $all_blocks_spec;
    }



    /**
     * Get all the back-end block metadata json files
     * 
     */
    public function get_all_blocks_metadata() {

        $blocks_metadata = [];

        $blocks_dir = get_stylesheet_directory() . '/' . $this->get_config()->get('componentBlocksLocation') . $this->get_config()->get('blocksNamespace');
        if( file_exists($blocks_dir) ) {

            // Scan blocks dir and loop each block
            $blocks_scan = scandir( $blocks_dir );
            foreach( $blocks_scan as $block ) {

                if( is_dir( $blocks_dir . '/' . $block ) && $block != '..' && $block != '.' ) {

                    // ComponentBlock instanciation && get block spec
                    $componentBlockInstance = Main::getInstance()->get_component_block_instance( $block );
                    $block_metadata_json_file = $componentBlockInstance->get_block_metadata_json_file();
                    if( $block_metadata_json_file ) {
                        $blocks_metadata[] = $block_metadata_json_file;
                    }
                }
            }
        }

        return $blocks_metadata;
    }



    /**
     * If needed, override layout block spec juste before generate it
     * 
     */
    public function override_block_spec( $block_spec, $componentBlockInstance ) {

        $override_spec = $componentBlockInstance->get_override_viewspec();
        return ( $override_spec ) ? array_replace_recursive( $block_spec, $override_spec ) : $block_spec;
    }



    /**
     *  Allow all custom/wpe-component registered
     * 
     */
    public function allowed_block_types_all( $allowed_block_types ) {
     
        if( is_array($allowed_block_types) && in_array( $this->get_config()->get('blocksNamespace') . '/' . $this->get_config()->get('componentBlockPrefixName'), $allowed_block_types ) ) {
            $allowed_block_types = array_merge( $allowed_block_types, Main::getInstance()->get_registered_blocks() );
        }

        return $allowed_block_types;
    }



    /**
     * 
     * 
     */
    public static function get_attributes_autosaves_rest_api_resource_path() {

        return '/component-blocks/autosaves';
    }



    /**
     *  Attributes auto-saves GET used for live-rendering
     * 
     */
    public static function attributes_autosaves_get( $request ) {
    
        if( ! $request || ! $request instanceof \WP_REST_Request ) {
            wp_send_json_error( 'Invalid request' );
        }

        if( ! isset($request['post_id']) || ! isset($request['component_id']) || ! isset($request['client_id']) ) {
            wp_send_json_error( 'PostId, componentId or clientId missing' );
        }

        $post_id = $request['post_id'];
        $client_id = $request['client_id'];
        $component_id = $request['component_id'];

        $componentBlockInstance = Main::getInstance()->get_component_block_instance( $component_id );
        $attributes = $componentBlockInstance->attributes_autosaves_get($post_id, $client_id);
        $componentBlockInstance->set_attributes($attributes);

        header( 'Content-Type: ' . get_option( 'html_type' ) . '; charset=' . get_option( 'blog_charset' ) );
        Main::getInstance()->get_theme_controller()->render_content_only( 'nude', $componentBlockInstance->render() );
        die;
    }



    /**
     *  Attributes auto-saves POST used for live-rendering
     * 
     */
    public static function attributes_autosaves_post( $request ) {

        if( ! $request || ! $request instanceof \WP_REST_Request ) {
            wp_send_json_error( 'Invalid request' );
        }

        if( ! isset($request['post_id']) || ! isset($request['component_id']) || ! isset($request['client_id']) ) {
            wp_send_json_error( 'PostId, componentId or clientId missing' );
        }

        $post_id = $request['post_id'];
        $client_id = $request['client_id'];

        $attributes = $request->get_json_params();
        if( ! $attributes || ! is_array($attributes) ) {
            wp_send_json_error( 'Attributes missing' );
        }

        $componentBlockInstance = Main::getInstance()->get_component_block_instance( $request['component_id'] );
        $block_spec = $componentBlockInstance->get_block_spec();
        if( is_array($block_spec) ) {

            $componentBlockInstance->attributes_autosaves_post( $attributes, $post_id, $client_id );
            $componentBlockInstance->validateProps($attributes, false, false);
            if( $componentBlockInstance->arePropsValid() ) {
                wp_send_json_success();
            }
            else {
                $propsStatus = $componentBlockInstance->getPropsStatus();
                foreach( $propsStatus as $propStatus ) {
                    if( isset($propStatus['error']) ) {
                        wp_send_json_error( $propsStatus );
                    }
                }
                wp_send_json_success( $propsStatus );
            }
        }
    }



    /**
     * This is our callback function that embeds our resource in a WP_REST_Response
     * 
     */
    public static function attributes_autosaves_get_permissions_check() {

        // Restrict endpoint to only users who have the edit_posts capability.
        // if ( ! current_user_can( 'edit_posts' ) ) {
        //     return new \WP_Error( 'rest_forbidden', 'Silence is golden.', array( 'status' => 401 ) );
        // }

        // This is a black-listing approach. You could alternatively do this via white-listing, by returning false here and changing the permissions check.
        return true;
    }



    /**
     * This is our callback function that embeds our resource in a WP_REST_Response
     * 
     */
    public static function attributes_autosaves_post_permissions_check() {

        // Restrict endpoint to only users who have the edit_posts capability.
        if ( ! current_user_can( 'edit_posts' ) ) {
            return new \WP_Error( 'rest_forbidden', 'Silence is golden.', array( 'status' => 401 ) );
        }

        // This is a black-listing approach. You could alternatively do this via white-listing, by returning false here and changing the permissions check.
        return true;
    }

}