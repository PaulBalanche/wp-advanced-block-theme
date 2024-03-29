<?php

namespace Abt\Services;

class Scripts extends ServiceBase {

    function __construct() {
        parent::__construct();

        $this->add_actions();
    }
    


    /**
     * Add Wordpress actions
     * 
     */
    public function add_actions() {

        // Enqueue theme styles and scripts
        add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_theme_scripts_and_styles' ] );

        // Enqueue theme assets in Gutenberg block editor
        add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_editor_assets' ] );
    }



    /**
     * Enqueue theme styles and scripts
     * 
     */
    public function enqueue_theme_scripts_and_styles() {

        $assets = apply_filters( 'Abt\get_assets_spec', $this->get_config()->get_spec('assets') );
        if( ! is_null($assets) && is_array($assets) ) {

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
                            $this->enqueue( $key_asset, $asset, true, false );
                            break;
                        
                        case 'css':

                            if( ! isset($new_assets['css']) || ! is_array($new_assets['css']) ) {
                                $new_assets['css'] = [];
                            }
                            $this->enqueue( $key_asset, $asset, false, false );
                            break;
                    }
                }
            }
        }
    }

    

    /**
     * Enqueue theme assets in Gutenberg block editor
     * 
     */
    public function enqueue_block_editor_assets() {

        $assets = apply_filters( 'Abt\get_assets_spec', $this->get_config()->get_spec('assets') );
        if( ! is_null($assets) && is_array($assets) ) {

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
                            $this->enqueue( $key_asset, $asset, true, true );
                            break;
                        
                        case 'css':

                            if( ! isset($new_assets['css']) || ! is_array($new_assets['css']) ) {
                                $new_assets['css'] = [];
                            }
                            $this->enqueue( $key_asset, $asset, false, true );
                            break;
                    }
                }
            }
        }
    }



    /**
     * Helpers function to wp_enqueue style and script
     * 
     */
    public function enqueue( $handle, $asset, $is_js = false, $is_editor_enque = false ) {

        // Check if SRC exists
        if( ! isset($asset['src']) || empty( $asset['src'] ) ) {
            return;
        }

        // Check if ENV exists
        if( isset($asset['env']) ) {
            if( defined('ABT_FRONT_ENV') ) {
                if( ABT_FRONT_ENV != $asset['env'] ) {
                    return;
                }
            }
            else {
                if( WP_ENV != $asset['env'] ) {
                    return;
                }
            }
        }

        // Check if it's editor only
        if( ! $is_editor_enque && isset($asset['editor_only']) && $asset['editor_only'] ) {
            return;
        }

        // Check if need to enqueue into editor
        if( $is_editor_enque && ( ! isset($asset['in_editor']) || ! $asset['in_editor'] ) ) {
            return;
        }

        $src = $this->glob_asset_file( $asset['src'] );
        if( is_null($src) ) {
            return;
        }

        $deps = ( isset($asset['deps']) && is_array( $asset['deps'] ) ) ? $asset['deps'] : [];
        if( $is_editor_enque ) {
            $deps = array_merge( $deps, [ 'wp-edit-blocks' ] );
        }

        $ver = ( isset($asset['ver']) && ! empty( $asset['ver'] ) ) ? $asset['ver'] : false;

        if( $is_js ) {
            $in_footer = ( isset($asset['in_footer']) ) ? ( $asset['in_footer'] ) : false;
            wp_enqueue_script( $handle, $src, $deps, $ver, $in_footer );
        }
        else{
            $media = ( isset($asset['media']) && ! empty( $asset['media'] ) ) ? $asset['media'] : 'all';
            wp_enqueue_style( $handle, $src, $deps, $ver, $media );
        }
    }



    /**
     * Glob helper function
     * 
     */
    public function glob_asset_file( $src ) {

        if( strpos($src, 'http') !== 0  ) {

            $returned_src = null;

            $trimed = trim( $src, './' );
            $exploded = explode( '/', $trimed );
            $filename = $exploded[ count($exploded) - 1 ];
            $relative_dir_path = str_replace($filename, '', $trimed);
            $absolute_dir_path = ( strpos($src, '/') === 0 ) ? dirname( WP_CONTENT_DIR ) . '/' . $relative_dir_path : get_stylesheet_directory() . '/' . $relative_dir_path;

            if( file_exists($absolute_dir_path) ) {

                $glob = glob( $absolute_dir_path . $filename );
                if( is_array($glob) && count($glob) > 0 ) {
                    usort( $glob, function( $a, $b ) { return  - ( filemtime($a) <=> filemtime($b) ); } );
                    $last_file = $glob[0];
                    $returned_src = ( strpos($src, '/') === 0 ) ? '/' . $relative_dir_path . pathinfo($last_file)['basename'] : get_stylesheet_directory_uri() . '/' . $relative_dir_path . pathinfo($last_file)['basename'];
                }
            }

            $src = $returned_src;
        }

        return $src;
    }

}