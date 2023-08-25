<?php

namespace Abt\Services;

class Template extends ServiceBase {

    function __construct() {
        parent::__construct();

        $this->add_actions();
        $this->add_filters();
    }
    
    /**
     * Add Wordpress actions & filters
     * 
     */
    public function add_actions() {

        if( $this->get_config()->get('templateIncludeWpHeaderFooter') ) {
            add_action( 'Abt\layout_header', 'get_header' );
            add_action( 'Abt\layout_footer', 'get_footer' );
        }
    }
    public function add_filters() {

        add_filter( 'template_include', [ $this, 'template_include' ] );
        add_filter( 'Abt\render_template_context', [ $this, 'render_template_context' ] );
    }

    public function template_include( $template) {

        $pathinfo = pathinfo($template);
        switch( $pathinfo['filename'] ) {
            case '404':
                $new_template = ABT_PLUGIN_DIR . 'template/404.php';
                break;

            case 'index':
            case 'page':
                $new_template = ABT_PLUGIN_DIR . 'template/layout.php';
                break;
        }

        if( isset($new_template) && file_exists($new_template) ) {
            $template = $new_template;
        }

        return $template;
    }

    public function render_template_context( $context ) {

        if( is_array($context) && isset($context['frontspec']) && is_array($context['frontspec']) && isset($context['frontspec']['metas']) && is_array($context['frontspec']['metas']) ) {

            if( isset($context['frontspec']['metas']['homepage']) ) {
                $context['frontspec']['metas']['homepage'] = get_home_url();
            }
            
            if( isset($context['frontspec']['metas']['title']) ) {
                $context['frontspec']['metas']['title'] = ( function_exists('YoastSEO') ) ? YoastSEO()->meta->for_current_page()->title : get_the_title();
            }
            
            if( isset($context['frontspec']['metas']['description']) ) {
                $context['frontspec']['metas']['description'] = ( function_exists('YoastSEO') ) ? YoastSEO()->meta->for_current_page()->description : '';
            }
        }

        return $context;
    }

}