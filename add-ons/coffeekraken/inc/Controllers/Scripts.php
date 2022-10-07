<?php

namespace Abt\Coffeekraken\Controllers;

use Abt\Controllers\ControllerBase;

class Scripts extends ControllerBase {

    public function __construct() {
        parent::__construct();

        $this->add_filters();
    }

    /**
     * Add Wordpress filters
     * 
     */
    public function add_filters() {

        add_filter( 'Abt\get_assets_spec', [ $this, 'get_assets_spec' ] );
        add_filter( 'Abt\render_template_context', [ $this, 'render_template_context' ] );
    }

    public function get_assets_spec( $assets ){

        if( is_array($assets) ) {

            $new_assets = [];
            foreach( $assets as $key_asset => $asset ) {
                
                if( isset($asset['src']) ) {
                    
                    $pathinfo = pathinfo($asset['src']);
                    $asset['src'] = $this->get_config()->get_front_end_file_path( trim($asset['src'], '/') );

                    switch( $pathinfo['extension'] ) {
                        case 'js':
                        case 'ts':
                            if( ! isset($new_assets['js']) || ! is_array($new_assets['js']) ) {
                                $new_assets['js'] = [];
                            }
                            $new_assets['js'][ $key_asset ] = $asset;
                            
                            break;
                        
                        case 'css':

                            if( ! isset($new_assets['css']) || ! is_array($new_assets['css']) ) {
                                $new_assets['css'] = [];
                            }
                            $new_assets['css'][ $key_asset ] = $asset;

                            break;
                    }
                }
            }
            $assets = $new_assets;
        }

        return $assets;
    }

    public function render_template_context( $context ) {

        if( is_array($context) && isset($context['frontspec']) ) {

            if( is_array($context['frontspec']) && isset($context['frontspec']['assets']) && is_array($context['frontspec']['assets']) ) {

                foreach( $context['frontspec']['assets'] as $key_asset => $asset ) {

                    if( is_array($asset) && isset($asset['src']) ) {

                        // Check if ENV exists
                        if( isset($asset['env']) ) {
                            if( defined('FRONT_ENV') ) {
                                if( FRONT_ENV != $asset['env'] ) {
                                    unset($context['frontspec']['assets'][$key_asset]);
                                    continue;
                                }
                            }
                            else {
                                if( WP_ENV != $asset['env'] ) {
                                    unset($context['frontspec']['assets'][$key_asset]);
                                    continue;
                                }
                            }
                        }

                        $context['frontspec']['assets'][$key_asset]['src'] = get_stylesheet_directory_uri() . '/' . $this->get_config()->get_front_end_file_path( trim($asset['src'], '/') );
                    }
                } 

            }
        }

        return $context;
    }

}