<?php

namespace Abt\Controllers;

class BlockPatterns extends ControllerBase {

    public static $themePatternsPath = '/patterns/library';
    public static $themePatternCategoriesJsonFilename = '/patterns/categories.json';

    public function __construct() {
        parent::__construct();
        
        $this->add_actions();
    }



    /**
     * Add Wordpress actions
     * 
     */
    public function add_actions() {

        add_action( 'init', [ $this, 'register_block_pattern_categories' ] );
        add_action( 'init', [ $this, 'register_block_patterns' ] );
    }



    /**
     * Register theme Gutenberg pattern categories
     * 
     */
    public function register_block_pattern_categories (){

        if( class_exists( '\WP_Block_Pattern_Categories_Registry' ) && file_exists( get_stylesheet_directory() . self::$themePatternCategoriesJsonFilename ) ) {

            $pattern_categories_data = json_decode( file_get_contents( get_stylesheet_directory() . self::$themePatternCategoriesJsonFilename ), true );
            if( $pattern_categories_data && is_array($pattern_categories_data) ) {

                foreach ( $pattern_categories_data as $name => $properties ) {
                    
                    if ( ! \WP_Block_Pattern_Categories_Registry::get_instance()->is_registered( $name ) && is_array($properties) && isset( $properties['label'] ) ) {
                        register_block_pattern_category( $name, $properties );
                    }
                }
            }
        }
    }



    /**
     * Register theme Gutenberg patterns
     * 
     */
    public function register_block_patterns() {

        if( class_exists( '\WP_Block_Patterns_Registry' ) && file_exists( get_stylesheet_directory() . self::$themePatternsPath ) ) {

            $patterns = glob( get_stylesheet_directory() . self::$themePatternsPath . '/*.json' );
            if( $patterns && is_array($patterns) && count($patterns) > 0 ) {
                foreach( $patterns as $pattern ) {
                        
                    // Get info file
                    $file_pathinfo = pathinfo( $pattern );
                    if( $file_pathinfo['extension'] == 'json'  && ! \WP_Block_Patterns_Registry::get_instance()->is_registered( $file_pathinfo['filename'] ) ) {

                        $pattern_data = json_decode( file_get_contents( $pattern ), true );
                        $contentFileName = get_stylesheet_directory() . self::$themePatternsPath . '/' . $file_pathinfo['filename'] . '.html';
                        if( is_array($pattern_data) && isset($pattern_data['title']) && file_exists($contentFileName) ) {

                            $pattern_data['content'] = file_get_contents($contentFileName);
                            register_block_pattern( get_stylesheet() . '/' . $file_pathinfo['filename'], $pattern_data );
                        }
                    }
                }
            }
        }
    }

}