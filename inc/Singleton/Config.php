<?php

namespace Abt\Singleton;

class Config {
    
    private static $_instance;

    private $frontspecJsonFileName          = 'frontspec.json',
        $themespecJsonFileName              = 'theme_spec.json',
        $viewspecJsonFilename               = 'viewspec.json',
        $overrideSpecJsonFilename           = 'override.json',
        $blockMetadataJsonFilename          = 'block.json',
        $allowedBlockTypesJsonFileName      = 'allowed_block_types.json',
        $templateViewsLocation              = ABT_TEMPLATE_VIEWS_LOCATION,
        $templateComponentsSubLocation      = ABT_TEMPLATE_COMPONENTS_SUB_LOCATION,
        $componentMasterBlocksLocation      = 'blocks/component-block-master/',
        $componentBlocksLocation            = 'blocks/',
        $layoutBlocksLocation               = 'blocks/layout/',
        $wpDefaultBlockTypes                = [
            'core' => [ 'paragraph', 'list', 'heading', 'quote', 'audio', 'image', 'cover', 'video', 'gallery', 'file', 'html', 'preformatted', 'code', 'verse', 'pullquote', 'table', 'columns', 'column', 'group', 'button', 'more', 'nextpage', 'media-text', 'spacer', 'separator', 'calendar', 'shortcode', 'archives', 'categories', 'latest-comments', 'latest-posts', 'rss', 'search', 'tag-cloud', 'embed', ],
            'core-embed' => [ 'twitter', 'youtube', 'facebook', 'instagram', 'wordpress', 'soundcloud', 'spotify', 'flickr', 'vimeo', 'animoto', 'cloudup', 'collegehumor', 'crowdsignal', 'polldaddy', 'dailymotion', 'hulu', 'imgur', 'issuu', 'kickstarter', 'meetup-com', 'mixcloud', 'reddit', 'reverbnation', 'screencast', 'scribd', 'slideshare', 'smugmug', 'speaker', 'speaker-deck', 'ted', 'tumblr', 'videopress', 'wordpress-tv', 'amazon-kindle' ],
            'woocommerce' => [ 'handpicked-products', 'all-reviews', 'featured-category', 'featured-product', 'product-best-sellers', 'product-categories', 'product-category', 'product-new', 'product-on-sale', 'products-by-attribute', 'product-top-rated', 'reviews-by-product', 'reviews-by-category', 'product-search', 'product-tag', 'all-products', 'price-filter', 'attribute-filter', 'active-filters' ]
        ],
        $blocksNamespace                    = 'custom',
        $componentBlockPrefixName           = 'wpe-component',
        $componentBlockDefaultCategory      = 'WPE Custom',
        $containerClassName                 = ABT_CONTAINER_CLASS_NAME,
        $specData = null,
        $addOnsLocation = 'add-ons';
        


    /**
     * Utility method to retrieve the main instance of the class.
     * The instance will be created if it does not exist yet.
     * 
     */
    public static function getInstance() {

        if( is_null(self::$_instance) ) {
            self::$_instance = new Config();
        }
        return self::$_instance;
    }



    /**
     * Get property config
     * 
     */
    public function get( $id ) {
        
        return ( property_exists($this, $id) ) ? $this->{$id} : null;
    }



    /**
     * Return data from "frontspec" and "theme_spec" JSON files
     * 
     */
    public function get_spec( $data = false ) {

        // If specData propertie is still emtpy, load spec files
        if( is_null( $this->specData ) ) {

            $front_spec = $this->spec_file_get_contents( $this->get('frontspecJsonFileName') );
            $theme_spec = $this->spec_file_get_contents( $this->get('themespecJsonFileName') );

            $this->specData = array_replace_recursive( $front_spec, $theme_spec);
        }

        if ( $data ) {

            if( array_key_exists($data, $this->specData) )
                return $this->specData[$data];
            else
                return null;
        }
        else
            return $this->specData;
    }



    /**
     * Get a spec file and load its content
     * 
     */
    public function spec_file_get_contents( $theme_file ) {

        $spec_content = [];
        if( file_exists( get_stylesheet_directory() . '/' . $theme_file ) ) {

            $json_decode = json_decode ( file_get_contents( get_stylesheet_directory() . '/' . $theme_file ), true );
            if( is_array($json_decode) ) {
                $spec_content = $json_decode;
            }
        }

        return $spec_content;
    }
    
}