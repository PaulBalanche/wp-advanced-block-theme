<?php

namespace Abt\Models;

use Abt\Main;
use Abt\Services\ComponentBlocks as ComponentBlocksService;

class ComponentBlockMaster extends ModelBase {

    private $componentBlocksService;

    public function __construct() {
        parent::__construct();

        $this->componentBlocksService = new ComponentBlocksService();

        $this->register_script();
        $this->register_style();
    }



    /**
     * Register component editor script
     * 
     */
    public function register_script() {

        $handle = $this->get_config()->get('blocksNamespace') . '/' . $this->get_config()->get('componentBlockPrefixName') . '-editor-script';
        $asset_file = include( ABT_PLUGIN_DIR . $this->get_config()->get('componentMasterBlocksLocation') . '/build/index.asset.php' );

        wp_register_script(
            $handle,
            ABT_PLUGIN_URL . $this->get_config()->get('componentMasterBlocksLocation') . 'build/index.js',
            $asset_file['dependencies'],
            $asset_file['version']
        );

        // Localize script
        $data_localized = [
            'current_user_can_edit_posts' => ( current_user_can('edit_posts') ) ? '1' : '0',
            'components' => $this->componentBlocksService->get_all_blocks_spec(),
            'styles' => $this->get_config()->get_spec('styles')
        ];
        wp_localize_script( $handle, 'global_localized', $data_localized );
    }



    /**
     * Register component editor style
     * 
     */
    public function register_style() {
        
        $handle = $this->get_config()->get('blocksNamespace') . '/' . $this->get_config()->get('componentBlockPrefixName') . '-editor-style';
        
        wp_register_style(
            $handle,
            ABT_PLUGIN_URL . $this->get_config()->get('componentMasterBlocksLocation') . 'assets/style/editor.min.css',
            array( 'wp-edit-blocks' ),
            filemtime( ABT_PLUGIN_DIR . $this->get_config()->get('componentMasterBlocksLocation') . 'assets/style/editor.min.css' )
        );
    }



    /**
     * Registers all components block type
     * 
     */
    public function register_components() {

        $args = [
            'editor_script' => $this->get_config()->get('blocksNamespace') . '/' . $this->get_config()->get('componentBlockPrefixName') . '-editor-script',
            'editor_style' => $this->get_config()->get('blocksNamespace') . '/' . $this->get_config()->get('componentBlockPrefixName') . '-editor-style',
            'render_callback' => '\Abt\Models\ComponentBlockMaster::render'
        ];

        $blocks_metadata = $this->componentBlocksService->get_all_blocks_metadata();
        if( is_array($blocks_metadata) && count($blocks_metadata) > 0 ) {
            foreach( $blocks_metadata as $metadata_json_file ) {

                // Registers a block type. The recommended way is to register a block type using the metadata stored in the block.json file.
                $WP_Block_Type = register_block_type( $metadata_json_file, $args );
                if( $WP_Block_Type && $WP_Block_Type instanceof \WP_Block_Type ) {
                    Main::getInstance()->add_block_registered( $WP_Block_Type->name );
                }
            }
        }
    }



    /**
     * Static render method
     * 
     */
    public static function render( $attributes, $content ) {

        if( ! isset( $attributes['id_component'] ) )
            return;

        $componentBlockInstance = Main::getInstance()->get_component_block_instance( $attributes['id_component'] );
        $componentBlockInstance->set_attributes($attributes);
        $componentBlockInstance->set_content($content);
        return $componentBlockInstance->render();
    }

}