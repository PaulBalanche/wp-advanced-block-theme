<?php

namespace Abt\Coffeekraken\Controllers;

use Abt\Coffeekraken\Helpers\Css;

class Scripts {

    public function __construct() {

        $this->add_filters();
    }

    /**
     * Add Wordpress filters
     * 
     */
    public function add_filters() {

        add_filter( 'Abt\get_assets_spec', [ $this, 'get_assets_spec' ] );
    }

    public function get_assets_spec( $assets ){

        if( is_array($assets) ) {

            $new_assets = [];
            foreach( $assets as $key_asset => $asset ) {
                
                if( isset($asset['src']) ) {
                    
                    $pathinfo = pathinfo($asset['src']);
                    $asset['src'] = \Abt\Singleton\Config::getInstance()->get_front_end_file_path( trim($asset['src'], '/') );

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

    public static function get_front_spec() {

        $front_spec = \Abt\Singleton\Config::getInstance()->get_spec();
        if( is_array($front_spec) && isset($front_spec['assets']) && is_array($front_spec['assets']) ) {

            foreach( $front_spec['assets'] as $key_asset => $asset ) {

                if( is_array($asset) && isset($asset['src']) ) {

                    // Check if ENV exists
                    if( isset($asset['env']) ) {
                        if( defined('FRONT_ENV') ) {
                            if( FRONT_ENV != $asset['env'] ) {
                                unset($front_spec['assets'][$key_asset]);
                                continue;
                            }
                        }
                        else {
                            if( WP_ENV != $asset['env'] ) {
                                unset($front_spec['assets'][$key_asset]);
                                continue;
                            }
                        }
                    }

                    $front_spec['assets'][$key_asset]['src'] = get_stylesheet_directory_uri() . '/' . \Abt\Singleton\Config::getInstance()->get_front_end_file_path( trim($asset['src'], '/') );
                }
            } 

        }

        return $front_spec;
    }

}