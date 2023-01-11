<?php

namespace Abt\Controllers;

use Abt\Services\ComponentBlocks as ComponentBlocksService;

class BlockEditor extends ControllerBase {

    private $handle_name = 'abt_editor',
            $css_filename = 'dist/abt_editor.css',
            $js_filename = 'dist/abt_editor.js',
            $php_asset_filename = 'dist/abt_editor.asset.php';

    public function __construct() {
        parent::__construct();

        $this->add_actions();
    }


    /**
     * Add Wordpress actions
     * 
     */
    public function add_actions() {

        add_action('admin_enqueue_scripts', [ $this, 'register_editor_script' ] );
        add_action('admin_enqueue_scripts', [ $this, 'register_editor_style' ] );
    }



    /**
     * Register editor script
     * 
     */
    public function register_editor_script() {

        $handle = $this->handle_name . '-script';
        $asset_file = include( ABT_PLUGIN_DIR . $this->php_asset_filename );

        wp_register_script(
            $handle,
            ABT_PLUGIN_URL . $this->js_filename,
            $asset_file['dependencies'],
            $asset_file['version']
        );

        // Localize script
        $data_localized = [
            'current_user_can_edit_posts' => ( current_user_can('edit_posts') ) ? '1' : '0',
            'components' => ComponentBlocksService::get_all_blocks_spec(),
            'container' => $this->get_config()->get_spec('container'),
            'supports' => $this->get_config()->get_spec('supports'),
            'galleryType' => $this->get_config()->get_spec('galleryType'),
            'gridConfig' => $this->get_config()->get_spec('gridConfig')
        ];
        wp_localize_script( $handle, 'global_localized', $data_localized );
        wp_localize_script( $handle, 'theme_spec', apply_filters( 'Abt\localize_editor_script', $this->get_config()->get_spec(), $this->get_config()->get('componentBlockPrefixName'), 'theme_spec' ) );
        wp_localize_script( $handle, 'blocks_spec', apply_filters( 'Abt\localize_editor_script', apply_filters( 'Abt\editor_script_localize_blocks_spec', [] ), $this->get_config()->get('componentBlockPrefixName'), 'block_spec' ) );

        wp_enqueue_script( $handle );

        wp_register_script(
            'testasdasdadsa',
            ABT_PLUGIN_URL . 'src/js/test.js'
        );
        wp_enqueue_script( 'testasdasdadsa' );
    }



    /**
     * Register editor style
     * 
     */
    public function register_editor_style() {

        wp_enqueue_style(
            $this->handle_name . '-style',
            ABT_PLUGIN_URL . $this->css_filename,
            ['wp-edit-blocks'],
            filemtime( ABT_PLUGIN_DIR . $this->css_filename )
        );  
    }

}