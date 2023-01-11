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
     * Static render method
     * 
     */
    public static function admin_render() {
        
        if( ! isset( $_GET['id'] ) )
            return;

        $json_filename = ABSPATH . '/../../tmp/' . $_GET['id'] . '.json';

        if( ! file_exists($json_filename) )
            return;

        $attributes = json_decode( file_get_contents( $json_filename ), true );

        $componentBlockInstance = Main::getInstance()->get_component_block_instance( $attributes['id_component'] );
        $componentBlockInstance->set_attributes($attributes);

        Main::getInstance()->get_theme_controller()->render( __FILE__, $componentBlockInstance->render() );
    }

    public static function wpe_component_edit($request ) {

        $id_json_file = uniqid();
        file_put_contents( ABSPATH . '/../../tmp/' . $id_json_file . '.json' , json_encode( $request->get_json_params(), JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES ) );

        wp_send_json_success($id_json_file);
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

}