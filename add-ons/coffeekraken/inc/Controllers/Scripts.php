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

}