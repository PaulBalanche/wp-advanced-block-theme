<?php

namespace Abt\Models;

use Abt\Helpers\Request;
use Abt\Services\Render as RenderService;
use Abt\Singleton\Config;
use Abt\Main;

class LayoutBlock extends ModelBase {

    private $blockId = null;

    public function __construct( $blockId = null ) {
        parent::__construct();
        $this->blockId = $blockId;
    }


    /**
     * Get the block ID
     * 
     */
    public function get_ID() {
        return $this->blockId;
    }



    /**
     * Get block directory
     * 
     */
    public function get_block_dir() {

        return ABT_PLUGIN_DIR . $this->get_config()->get('layoutBlocksLocation') . $this->get_ID();
    }
    
    
    
    /**
     * Get block directory
     * 
     */
    public function get_block_dir_url() {

        return ABT_PLUGIN_URL . $this->get_config()->get('layoutBlocksLocation') . $this->get_ID();
    }



    /**
     * Register component editor script
     * 
     */
    public function register_script( &$args ) {

        if( file_exists( $this->get_block_dir() . '/build/index.js' ) && file_exists( $this->get_block_dir() . '/build/index.asset.php' ) ) {

            $handle = $this->get_config()->get('blocksNamespace') . '/' . $this->get_ID() . '-editor-script';
            $asset_file = include( $this->get_block_dir() . '/build/index.asset.php' );

            wp_register_script(
                $handle,
                $this->get_block_dir_url() . '/build/index.js',
                $asset_file['dependencies'],
                $asset_file['version']
            );

            // Localize script
            if( file_exists( $this->get_block_dir() . '/localize_script.php' ) ) {

                $data_localized = include( $this->get_block_dir() . '/localize_script.php' );
                if( is_array($data_localized) ) {
                    wp_localize_script( $handle, 'global_localized', $data_localized );
                }
            }

            $args['editor_script'] = $handle;
        }
    }



    /**
     * Register component editor style
     * 
     */
    public function register_style( &$args ) {
        
        if( file_exists( $this->get_block_dir() . '/assets/style/editor.min.css' ) ) {

            $handle = $this->get_config()->get('blocksNamespace') . '/' . $this->get_ID() . '-editor-style';

            wp_register_style(
                $handle,
                $this->get_block_dir_url() . '/assets/style/editor.min.css',
                array( 'wp-edit-blocks' ),
                filemtime( $this->get_block_dir() . '/assets/style/editor.min.css' )
            );

            $args['editor_style'] = $handle;
        }
    }



    /**
     * Add render callback method
     * 
     */
    public function render_callback( &$args ) {
        
        if( file_exists( $this->get_block_dir() . '/render.php' ) ) {

            include( $this->get_block_dir() . '/render.php' );
            if( function_exists( $this->get_config()->get('blocksNamespace') . '_' . str_replace('-', '_', $this->get_ID()) . '_render_callback' ) ) {
                $args['render_callback'] = $this->get_config()->get('blocksNamespace') . '_' . str_replace('-', '_', $this->get_ID()) . '_render_callback';
            }
        }
    }
    



    /**
     * Registers custom block
     * 
     */
    public function register() {

        $args = [];

        $this->register_script($args);
        $this->register_style($args);
        $this->render_callback($args);
        
        // Registers a block type. The recommended way is to register a block type using the metadata stored in the block.json file.
        register_block_type( $this->get_config()->get('blocksNamespace') . '/' . $this->get_ID(), $args );
    }

}