<?php

namespace Abt\Models;

use Abt\Main;
use Abt\Services\Render as RenderService;
use Abt\Helpers\Anchor;

class LayoutBlock extends ModelBase {

    private $blockId = null,
        $blockSpec = null,
        $view_path;

    public function __construct( $blockId = null ) {
        parent::__construct();
        $this->set_ID( $blockId );
        $this->define_view_path();
    }


    /**
     * Get the block ID
     * 
     */
    public function get_ID() {
        return $this->blockId;
    }



    /**
     * Set the layout block ID
     * 
     */
    public function set_ID( $blockId = null ) {
        $this->blockId = $blockId;
        Main::getInstance()->add_layout_block_instance( $this );
    }



    /**
     * Get block directory
     * 
     */
    public function get_block_dir() {

        return ABT_PLUGIN_DIR . $this->get_config()->get('layoutBlocksLocation') . $this->get_ID();
    }



    /**
     * Get theme custom block directory
     * 
     */
    public function get_theme_custom_block_dir() {

        return get_stylesheet_directory() . '/' . $this->get_config()->get('componentBlocksLocation') . 'layout/' . $this->get_ID();
    }
    
    
    
    /**
     * Get block directory
     * 
     */
    public function get_block_dir_url() {

        return ABT_PLUGIN_URL . $this->get_config()->get('layoutBlocksLocation') . $this->get_ID();
    }



    public function get_view_path() {
        return $this->view_path;
    }



    /**
     * Get, decode and return the JSON block spec
     * 
     */
    public function get_block_spec() {

        if( is_null($this->blockSpec) ) {

            $spec_json_file = $this->get_theme_custom_block_dir() . '/' . $this->get_config()->get('viewspecJsonFilename');
            if( file_exists($spec_json_file) ) {

                $block_spec = json_decode( file_get_contents( $spec_json_file ), true );
                if( $block_spec && is_array($block_spec) ) {
                    $this->blockSpec = $block_spec;
                }
            }
        }

        return $this->blockSpec;
    }
    
    
    
    public function define_view_path() {

        $block_spec = $this->get_block_spec();
        $this->view_path = ( is_array($block_spec) && isset($block_spec['path']) && ! is_null($block_spec['path']) ) ? $block_spec['path'] : $this->get_ID();
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

            wp_localize_script( $handle, 'theme_spec', apply_filters( 'Abt\localize_editor_script', $this->get_config()->get_spec(), $this->get_ID(), 'theme_spec' ) );

            wp_localize_script( $handle, 'block_spec', apply_filters( 'Abt\localize_editor_script', ( $this->get_block_spec() ?? [] ), $this->get_ID(), 'block_spec' ) );

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
     * Render method
     * 
     */
    public function render( $attributes, $content, $block_instance ) {

        $attributes = array_merge( $attributes, [
            'anchor' => Anchor::get( $this->get_ID(), $content ),
            'content' => $content
        ] );
        $attributes = apply_filters( 'Abt\pre_render_attributes_layout_' . $this->get_ID(), $attributes, $content, $block_instance );

        return RenderService::render( $this->get_view_path(), $attributes );
    }
    


    /**
     * Registers custom block
     * 
     */
    public function register() {

        $args = [];

        $this->register_script($args);
        $this->register_style($args);
        $args['render_callback'] = [ $this, 'render' ];
        
        // Registers a block type. The recommended way is to register a block type using the metadata stored in the block.json file.
        register_block_type( $this->get_config()->get('blocksNamespace') . '/' . $this->get_ID(), $args );
    }



    /**
     * Generate block spec used by Wordspress Gutenberg
     * 
     */
    public function generate_block_spec( $component_frontspec ) {

        // Get the theme custom block directory
        $theme_custom_block_dir = $this->get_theme_custom_block_dir();

        // Create blocks directory if missing
        if( ! file_exists( $theme_custom_block_dir ) ) {
            mkdir( $theme_custom_block_dir , 0750, true );
        }

        $this->blockSpec = apply_filters( 'Abt\generate_layout_block_spec', [
            'path' => $component_frontspec['path'] ?? null,
            'props' => $component_frontspec['props'] ?? []
        ], $this );

        $block_spec_json_filename = $theme_custom_block_dir . '/' . $this->get_config()->get('viewspecJsonFilename');
        
        // Write the components frontspec generated in a JSON file
        if( file_put_contents( $block_spec_json_filename , json_encode( $this->blockSpec, JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES ) ) ) {
            return $block_spec_json_filename;
        }

        return false;
    }


    /**
     * Get override-spec JSON file
     * 
     */
    public function get_override_viewspec() {

        $override_spec_file = $this->get_theme_custom_block_dir() . '/' . $this->get_config()->get('overrideSpecJsonFilename');
        if( file_exists($override_spec_file) ) {

            $override_spec = json_decode( file_get_contents($override_spec_file), true );
            if( is_array($override_spec) ) {
                return $override_spec;
            }
        }

        return false;
    }

}