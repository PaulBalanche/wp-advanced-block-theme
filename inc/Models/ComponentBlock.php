<?php

namespace Abt\Models;

use Abt\Helpers\Request;
use Abt\Services\Render as RenderService;
use Abt\Singleton\Config;
use Abt\Main;

class ComponentBlock extends ModelBase {

    private $blockId = null,
            $blockSpec = null,
            $attributes,
            $content;

    public function __construct( $blockId = null ) {
        parent::__construct();
        $this->set_ID( $blockId );
    }


    /**
     * Get the component block ID
     * 
     */
    public function get_ID() {
        return $this->blockId;
    }



    /**
     * Set the component block ID
     * 
     */
    public function set_ID( $blockId = null ) {
        
        if( ! is_null($blockId) ) {

            $this->blockId = self::format_id( $blockId );
            Main::getInstance()->add_component_block_instance( $this );
        }        
    }



    /**
     * Static method formatting blockId
     * 
     */
    public static function format_id( $blockId ) {
        return str_replace( Config::getInstance()->get('componentBlockPrefixName') . '-', '', str_replace( '_', '-', trim( strtolower( $blockId ) ) ) );
    }



    /**
     * Get component attributes
     * 
     */
    public function get_attributes() {
        return $this->attributes;
    }



    /**
     * 
     * 
     */
    public function set_attributes( $attributes ) {
        $this->attributes = $attributes;
    }
    
    

    /**
     * Get component content
     * 
     */
    public function get_content() {
        return $this->content;
    }



    /**
     * 
     * 
     */
    public function set_content( $content ) {
        $this->content = $content;
    }



    /**
     * Get the Gutenberg block name, with the following format: namespace/prefix-blockId
     * 
     */
    public function get_block_name() {

        return $this->get_config()->get('blocksNamespace') . '/' . $this->get_config()->get('componentBlockPrefixName') . '-' . $this->get_ID();
    }



    /**
     * Get block directory
     * 
     */
    public function get_block_dir() {

        return get_stylesheet_directory() . '/' . $this->get_config()->get('componentBlocksLocation') . $this->get_block_name();
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
     * Generate block spec used by Wordspress Gutenberg
     * 
     */
    public function generate_block_spec( $component_frontspec ) {

        // Define component ID
        $this->set_ID( $component_frontspec['id'] );

        // Get the block directory
        $block_dir = $this->get_block_dir();

        // Create blocks directory if missing
        if( ! file_exists( $block_dir ) ) {
            mkdir( $block_dir , 0750, true );
        }

        // Parent
        $container_spec = $this->get_config()->get_spec('container');
        $default_parent = ( $container_spec && is_array($container_spec) && isset($container_spec['is_main']) && $container_spec['is_main'] ) ? [ 'custom/wpe-container', 'custom/wpe-column' ] : null;

        $this->blockSpec = [
            'id' => $this->get_ID(),
            'name' => $component_frontspec['name'] ?? $this->get_ID(),
            'description' => $component_frontspec['description'] ?? '',
            'category' => ( isset($component_frontspec['category']) && ! empty($component_frontspec['category']) ) ? [ 'slug' => sanitize_title($component_frontspec['category']), 'title' => $component_frontspec['category'] ] : [ 'slug' => sanitize_title($this->get_config()->get('componentBlockDefaultCategory')), 'title' => $this->get_config()->get('componentBlockDefaultCategory') ],
            'props' => $component_frontspec['props'] ?? [],
            'path' => $component_frontspec['path'],
            'parent' => ( array_key_exists('parent', $component_frontspec) ) ? $component_frontspec['parent'] : $default_parent
        ];

        $block_spec_json_filename = $block_dir . '/' . $this->get_config()->get('viewspecJsonFilename');
        
        // Write the components frontspec generated in a JSON file
        if( file_put_contents( $block_spec_json_filename , json_encode( $this->blockSpec, JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES ) ) ) {
            return $block_spec_json_filename;
        }

        return false;
    }



    /**
     * Reurn the metadata JSON file
     */
    public function get_block_metadata_json_file() {

        $metadata_json_file = $this->get_block_dir() . '/' . $this->get_config()->get('blockMetadataJsonFilename');
        if( file_exists($metadata_json_file) ) {
            return $metadata_json_file;
        }

        return false;
    }



    /**
     * Return block metadata for block.json metadata file
     * 
     */
    public function generate_block_metadata() {

        $block_spec = $this->get_block_spec();
        if( is_array($block_spec) && isset($block_spec['props']) && is_array($block_spec['props']) ) {

            $metadata = [];

            // Name
            $metadata['name'] = $this->get_block_name( $this->get_ID() );

            // Attributes
            $attributes = [
                'id_component' => [
                    'type' => 'string'
                ],
                'anchor' => [
                    'type' => 'string'
                ],
                'padding' => [
                    'type' => 'object'
                ],
                'margin' => [
                    'type' => 'object'
                ],
                'editor' => [
                    'type' => 'boolean'
                ]
            ];

            foreach( $block_spec['props'] as $key_props => $val_prop ) {

                if( is_array($val_prop) && isset($val_prop['type']) ) {

                    $currentType = ( isset($val_prop['repeatable']) && $val_prop['repeatable'] == true ) ? 'array' : strtolower($val_prop['type']);
                    switch( $currentType ) {
                        case 'string':
                            $currentType = 'string';
                            break;
                        case 'text':
                            $currentType = 'string';
                            break;
                        case 'richText':
                            $currentType = 'string';
                            break;
                        case 'wysiwyg':
                            $currentType = 'string';
                            break;
                        case 'boolean':
                            $currentType = 'boolean';
                            break;
                        case 'select':
                            $currentType = 'string';
                            break;
                        case 'color':
                            $currentType = 'string';
                            break;
                        case 'radio':
                            $currentType = 'string';
                            break;
                        case 'relation':
                            $currentType = 'string';
                            break;
                        case 'array':
                            $currentType = 'array';
                            break;
                        case 'object':
                            $currentType = 'object';
                            break;
                        case 'link':
                            $currentType = 'object';
                            break;
                        case 'number':
                            $currentType = 'number';
                            break;
                        case 'image':
                            $currentType = 'object';
                            break;
                        case 'video':
                            $currentType = 'object';
                            break;
                        case 'file':
                            $currentType = 'object';
                            break;
                        case 'gallery':
                            $currentType = 'array';
                            break;
                        case 'image[]':
                            $currentType = 'array';
                            break;
                        case 'date':
                            $currentType = 'string';
                            break;
                    }

                    $attributes[ $key_props ] = [
                        'type' => $currentType
                    ];
                }
            }

            $metadata['attributes'] = $attributes;

            $block_metadata_json_filename = $this->get_block_dir() . '/' . $this->get_config()->get('blockMetadataJsonFilename');
            
            // Write the block metadata into block.json file
            if( file_put_contents( $block_metadata_json_filename, json_encode( $metadata, JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES ) ) ) {
                return $block_metadata_json_filename;
            }        
        }

        return false;
    }



    /**
     * Merge component attributes with override-spec JSON file
     * 
     */
    public function get_override_viewspec() {

        $override_spec_file = $this->get_block_dir() . '/' . $this->get_config()->get('overrideSpecJsonFilename');
        if( file_exists($override_spec_file) ) {

            $override_spec = json_decode( file_get_contents($override_spec_file), true );
            if( is_array($override_spec) ) {
                return $override_spec;
            }
        }

        return false;
    }



    /**
     * Render method
     * 
     */
    public function render() {

        $render = null;
        
        $block_spec = $this->get_block_spec();
        if( is_array($block_spec) ) {

            // Get block attributes
            $render_attributes = $this->get_attributes();

            // Filters attributes
            $render_attributes = apply_filters( 'abt/render_component_block_attributes', $render_attributes );
            $render_attributes = apply_filters( 'abt/render_component_block_attributes_' . $this->get_ID(), $render_attributes );

            // Anchor detection
            $render_attributes['anchor'] = $this->detect_block_anchor();

            // Filters spacing
            $render_attributes['margin'] = apply_filters( 'abt/block_spacing_formatting', ( isset($render_attributes['margin']) ) ? $render_attributes['margin'] : '', 'margin' );
            $render_attributes['padding'] = apply_filters( 'abt/block_spacing_formatting', ( isset($render_attributes['padding']) ) ? $render_attributes['padding'] : '', 'padding' );

            // Formatting attributes
            $render_attributes = apply_filters( 'Abt\attributes_formatting', $render_attributes, $block_spec );

            // Start rendering
            if( apply_filters( 'abt/display_component_block_' . $this->get_ID(), true, $render_attributes ) ) {

                // Check missing required attributes
                $missing_required_attributes = $this->get_missing_required_attributes( $render_attributes );
                if( count($missing_required_attributes) == 0 ) {
                    
                    $render = apply_filters( 'abt/render_component_block_' . $this->get_ID(), RenderService::render( $block_spec['path'], $render_attributes ) );
                }
                else if( Request::is_admin_editor_request() ) {

                    $render = '<div class="alert">Some required fields are missing: <ul><li>' . implode('</li><li>', $missing_required_attributes) . '</li></ul></div>';
                }
            }
            else if( isset($render_attributes['admin_error_message']) && Request::is_admin_editor_request() ) {
                $render = '<div class="alert">' . $render_attributes['admin_error_message'] . '</div>';
            }
        }

        return $render;
    }



    /**
     * Detect anchor into the block content wrapper
     * 
     */
    public function detect_block_anchor() {

        $anchor = null;

        if( preg_match( '/<div(.*)class="wp-block-' . $this->get_config()->get('blocksNamespace') . '-' . $this->get_config()->get('componentBlockPrefixName') . '-[^"]*"([^>]*)>(.*)<\/div>/s', $this->get_content(), $content ) === 1 ) {
                
            $class_prev = $content[1];
            $class_next = $content[2];
            $content = $content[3];

            if( strpos($class_prev, 'id="') !== false ) {

                preg_match( '/id="(.*)"/', $class_prev, $match_anchor );
                if( is_array($match_anchor) && count($match_anchor) == 2 ) {
                    $anchor = $match_anchor[1];
                }
            }
            elseif( strpos($class_next, 'id="') !== false ) {

                preg_match( '/id="(.*)"/', $class_next, $match_anchor );
                if( is_array($match_anchor) && count($match_anchor) == 2 ) {
                    $anchor = $match_anchor[1];
                }
            }
        }
        
        return $anchor;
    }




    /**
     * Check missing required attributes
     * 
     */
    public function get_missing_required_attributes( $attributes ) {

        $missing_required_attributes = [];
        
        $block_spec = $this->get_block_spec();
        if( is_array($block_spec) && isset($block_spec['props']) && is_array($block_spec['props']) && count($block_spec['props']) > 0 ) {
                            
            foreach( $block_spec['props'] as $key_prop => $prop ) {

                if( isset($prop['required']) && $prop['required'] && ( ! isset($attributes[$key_prop]) || ! $attributes[$key_prop] || empty($attributes[$key_prop]) ) ){

                    $missing_required_attributes[] = ( isset( $prop['label'] ) ) ? $prop['label'] : $key_prop;
                }
            }
        }

        return $missing_required_attributes;
    }

}