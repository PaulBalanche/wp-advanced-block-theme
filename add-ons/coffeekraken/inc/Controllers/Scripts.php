<?php

namespace Abt\Coffeekraken\Controllers;

use Abt\Controllers\ControllerBase;

class Scripts extends ControllerBase {

    public function __construct() {
        parent::__construct();

        $this->add_filters();
    }

    /**
     * Add Wordpress actions & filters
     * 
     */
    public function add_filters() {

        add_filter( 'Abt\render_template_context', [ $this, 'render_template_context' ] );
    }

    public function render_template_context( $context ) {

        if( is_array($context) && isset($context['frontspec']) ) {

            if( is_array($context['frontspec']) && isset($context['frontspec']['assets']) && is_array($context['frontspec']['assets']) ) {

                foreach( $context['frontspec']['assets'] as $key_asset => $asset ) {

                    if( is_array($asset) && isset($asset['src']) ) {

                        // Check if ENV exists
                        if( isset($asset['env']) ) {
                            if( defined('ABT_FRONT_ENV') ) {
                                if( ABT_FRONT_ENV != $asset['env'] ) {
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