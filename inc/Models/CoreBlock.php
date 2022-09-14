<?php

namespace Abt\Models;

use Abt\Services\Render as RenderService;
use Abt\Main;

class CoreBlock extends ModelBase {

    private $blockId = null,
        $blockSpec = null,
        $view_path;

    public function __construct( $blockId ) {
        parent::__construct();
        $this->set_ID( $blockId );
        $this->define_view_path();

        $this->add_filters();
    }



    /**
     * Add Wordpress filters
     * 
     */
    public function add_filters() {
 
        add_filter( 'render_block_' . $this->get_ID(), [ $this, 'render' ], 10, 2 );
    }



    /**
     * Get the core block ID
     * 
     */
    public function get_ID() {
        return $this->blockId;
    }



    /**
     * Set the component block ID
     * 
     */
    public function set_ID( $blockId ) {
        $this->blockId = $blockId;
        Main::getInstance()->add_core_block_instance( $this );
    }



    /**
     * Get block directory
     * 
     */
    public function get_block_dir() {

        return get_stylesheet_directory() . '/' . $this->get_config()->get('componentBlocksLocation') . $this->get_ID();
    }



    public function get_view_path() {
        return $this->view_path;
    }



    public function define_view_path() {

        $block_spec = $this->get_block_spec();
        $this->view_path = ( is_array($block_spec) && isset($block_spec['path']) && ! is_null($block_spec['path']) ) ? $block_spec['path'] : null;
    }



    /**
     * Generate block spec used by Wordspress Gutenberg
     * 
     */
    public function generate_block_spec( $component_frontspec ) {

        // Get the block directory
        $block_dir = $this->get_block_dir();

        // Create blocks directory if missing
        if( ! file_exists( $block_dir ) ) {
            mkdir( $block_dir , 0750, true );
        }

        $this->blockSpec = [
            'path' => $component_frontspec['path'] ?? null
        ];

        $block_spec_json_filename = $block_dir . '/' . $this->get_config()->get('viewspecJsonFilename');
        
        // Write the components frontspec generated in a JSON file
        if( file_put_contents( $block_spec_json_filename , json_encode( $this->blockSpec, JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES ) ) ) {
            return $block_spec_json_filename;
        }

        return false;
    }



    /**
     * Get, decode and return the JSON block spec
     * 
     */
    public function get_block_spec() {

        if( is_null($this->blockSpec) ) {

            $spec_json_file = $this->get_block_dir() . '/' . $this->get_config()->get('viewspecJsonFilename');
            if( file_exists($spec_json_file) ) {

                $block_spec = json_decode( file_get_contents( $spec_json_file ), true );
                if( $block_spec && is_array($block_spec) ) {
                    $this->blockSpec = $block_spec;
                }
            }
        }

        return $this->blockSpec;
    }



    /**
     * Render method
     * 
     */
    public function render( $block_content, $block ) {

        if( file_exists( ABT_PLUGIN_DIR . 'blocks/' . $this->get_ID() . '/rendered_attributes.php' ) ) {

            $attributes = include( ABT_PLUGIN_DIR . 'blocks/' . $this->get_ID() . '/rendered_attributes.php' );
            $block_content = RenderService::render( $this->get_view_path(), $attributes );
        }

        return $block_content;
    }



}