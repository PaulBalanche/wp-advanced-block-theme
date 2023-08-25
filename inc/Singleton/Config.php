<?php

namespace Abt\Singleton;

class Config {
    
    private static $_instance;

    private $frontspecJsonFileName          = ABT_FRONTSPEC_JSON_FILENAME,
        $themespecJsonFileName              = 'theme_spec.json',
        $viewspecJsonFilename               = 'viewspec.json',
        $overrideSpecJsonFilename           = 'override.json',
        $blockMetadataJsonFilename          = 'block.json',
        $frontendRelativePath               = ABT_FRONTEND_RELATIVE_PATH,
        $templateViewsLocation              = ABT_TEMPLATE_VIEWS_LOCATION,
        $templateComponentsSubLocation      = ABT_TEMPLATE_COMPONENTS_SUB_LOCATION,
        $componentBlocksLocation            = 'blocks/',
        $layoutBlocksLocation               = 'src/js/Blocks/layout/',
        $wpDefaultBlockTypes                = [
            'core' => [ 'paragraph', 'list', 'heading', 'quote', 'audio', 'image', 'cover', 'video', 'gallery', 'file', 'html', 'preformatted', 'code', 'verse', 'pullquote', 'table', 'columns', 'column', 'group', 'button', 'more', 'nextpage', 'media-text', 'spacer', 'separator', 'calendar', 'shortcode', 'archives', 'categories', 'latest-comments', 'latest-posts', 'rss', 'search', 'tag-cloud', 'embed', ],
            'core-embed' => [ 'twitter', 'youtube', 'facebook', 'instagram', 'wordpress', 'soundcloud', 'spotify', 'flickr', 'vimeo', 'animoto', 'cloudup', 'collegehumor', 'crowdsignal', 'polldaddy', 'dailymotion', 'hulu', 'imgur', 'issuu', 'kickstarter', 'meetup-com', 'mixcloud', 'reddit', 'reverbnation', 'screencast', 'scribd', 'slideshare', 'smugmug', 'speaker', 'speaker-deck', 'ted', 'tumblr', 'videopress', 'wordpress-tv', 'amazon-kindle' ],
            'woocommerce' => [ 'handpicked-products', 'all-reviews', 'featured-category', 'featured-product', 'product-best-sellers', 'product-categories', 'product-category', 'product-new', 'product-on-sale', 'products-by-attribute', 'product-top-rated', 'reviews-by-product', 'reviews-by-category', 'product-search', 'product-tag', 'all-products', 'price-filter', 'attribute-filter', 'active-filters' ]
        ],
        $blocksNamespace                    = 'custom',
        $componentBlockPrefixName           = 'wpe-component',
        $componentBlockDefaultCategory      = 'WPE Custom',
        $containerClassName                 = ABT_CONTAINER_CLASS_NAME,
        $specData                           = null,
        $addOnsLocation                     = 'add-ons',
        $rest_api_namespace                 = 'abt/v2',
        $componentBlocksAutoSaveLocation    = ABT_PLUGIN_DIR . 'abt-tmp/',
        $templateIncludeWpHeaderFooter      = ABT_INCLUDE_WP_HEADER;


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
	 * Config page display callback.
	 */
	public function bo_config_page_callback() {

        return '<h2>Front-end part</h2>
            <table class="form-table" role="presentation">
                <tbody>
                    <tr>
                        <th scope="row"><label for="blogname">frontendRelativePath</label></th>
                        <td>
                            <input type="text" class="regular-text" disabled="disabled" value="' . $this->get('frontendRelativePath') . '" />
                            <span>' . $this->display_config_exists( $this->get('frontendRelativePath') ) . '</span>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="blogname">frontspecJsonFileName</label></th>
                        <td>
                            <input type="text" class="regular-text" disabled="disabled" value="' . $this->get('frontspecJsonFileName') . '" />
                            <span>' . $this->display_config_exists( $this->get('frontendRelativePath') . '/' . $this->get('frontspecJsonFileName') ) . '</span>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="blogname">templateViewsLocation</label></th>
                        <td>
                            <input type="text" class="regular-text" disabled="disabled" value="' . $this->get('templateViewsLocation') . '" />
                            <span>' . $this->display_config_exists( $this->get('frontendRelativePath') . '/' . $this->get('templateViewsLocation') ) . '</span>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="blogname">templateComponentsSubLocation</label></th>
                        <td>
                            <input type="text" class="regular-text" disabled="disabled" value="' . $this->get('templateComponentsSubLocation') . '" />
                            <span>' . $this->display_config_exists( $this->get('frontendRelativePath') . '/' . $this->get('templateViewsLocation') . '/' . $this->get('templateComponentsSubLocation') ) . '</span>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="blogname">templateIncludeWpHeaderFooter</label></th>
                        <td><input type="text" class="regular-text" disabled="disabled" value="' . $this->get('templateIncludeWpHeaderFooter') . '" /></td>
                    </tr>
                </tbody>
            </table>
            <h2>back-end part</h2>
            <table class="form-table" role="presentation">
                    <tr>
                        <th scope="row"><label for="blogname">' . __( 'Active theme', 'wp-abt' ) . '</label></th>
                        <td><input type="text" class="regular-text" disabled="disabled" value="' . get_stylesheet_directory() . '" /></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="blogname">themespecJsonFileName</label></th>
                        <td>
                            <input type="text" class="regular-text" disabled="disabled" value="' . $this->get('themespecJsonFileName') . '" />
                            <span>' . $this->display_config_exists( $this->get('themespecJsonFileName') ) . '</span>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="blogname">componentBlocksLocation</label></th>
                        <td>
                            <input type="text" class="regular-text" disabled="disabled" value="' . $this->get('componentBlocksLocation') . '" />
                            <span>' . $this->display_config_exists( $this->get('componentBlocksLocation') ) . '</span>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="blogname">blockMetadataJsonFilename</label></th>
                        <td><input type="text" class="regular-text" disabled="disabled" value="' . $this->get('blockMetadataJsonFilename') . '" /></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="blogname">viewspecJsonFilename</label></th>
                        <td><input type="text" class="regular-text" disabled="disabled" value="' . $this->get('viewspecJsonFilename') . '" /></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="blogname">overrideSpecJsonFilename</label></th>
                        <td><input type="text" class="regular-text" disabled="disabled" value="' . $this->get('overrideSpecJsonFilename') . '" /></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="blogname">componentBlocksAutoSaveLocation</label></th>
                        <td><input type="text" class="regular-text" disabled="disabled" value="' . $this->get('componentBlocksAutoSaveLocation') . '" /></td>
                    </tr>
                </tbody>
            </table>';
	}


    public function display_config_exists( $path ) {
        
        if( file_exists( get_stylesheet_directory() . '/' . $path) ) {
            return '<span class="dashicons dashicons-yes" style="color:#46B450"></span>';
        }
        
        return '<span class="dashicons dashicons-no-alt" style="color:#DC3232"></span>';
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

            $front_spec = $this->spec_file_get_contents( $this->get_front_end_file_path($this->get('frontspecJsonFileName')) );
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



    public function get_front_end_file_path( $filepath ) {

        $frontendRelativePath = trim( $this->get('frontendRelativePath'), '/' );
        $frontendRelativePath = ( ! empty($frontendRelativePath) ) ? $frontendRelativePath . '/' : '';

        return $frontendRelativePath . $filepath;
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