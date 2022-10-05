<?php

namespace Abt\Services;

class FrontEnd extends ServiceBase {

    /**
     * Get the theme front component directory
     * 
     */
    public function get_components_dir( $subLocation = null ) {

        return rtrim( $this->get_config()->get_front_end_file_path( $this->get_config()->get('templateViewsLocation') ) . ( is_null($subLocation) ? $this->get_config()->get('templateComponentsSubLocation') : $subLocation ), '/' ) . '/';
    }



    /**
     * Get the list of front component detected
     * 
     */
    public function get_components() {

        $components = [];

        $components_dir = get_stylesheet_directory() . '/' . $this->get_components_dir();
        if( file_exists($components_dir) ) {

            // Scan components dir and loop each components
            $components_scan = scandir( $components_dir );
            foreach( $components_scan as $component ) {

                if( is_dir( $components_dir . $component ) && $component != '..' && $component != '.' ) {

                    $render_file = glob( $components_dir . $component . '/*.twig' );
                    if( $render_file && is_array($render_file) && count($render_file) == 1 ) {
                        $components[] =  $this->get_config()->get('templateComponentsSubLocation') . $component;
                    }
                }
            }
        }

        return apply_filters( 'Abt\get_components', $components );
    }



    /**
     * Recursive function to get and treat viewspec JSON file for a single component
     * 
     */
    public function get_component_viewspec( $component ) {
        
        $pathinfoComponent = pathinfo($component);
        $dir = trim( $pathinfoComponent['dirname'], '/' ) . '/';
        $componentName = $pathinfoComponent['basename'];

        $component_relative_dir = $this->get_components_dir( $dir );
        $component_dir = get_stylesheet_directory() . '/' . $component_relative_dir;
        $path_viewspec_file = $component_dir . $componentName . '/' . $this->get_config()->get('viewspecJsonFilename');

        // Get the file content
        $component_viewspec = ( file_exists( $path_viewspec_file ) ) ? json_decode( file_get_contents( $path_viewspec_file ), true ) : [];
        $component_viewspec = apply_filters( 'Abt\pre_get_component_viewspec', $component_viewspec, $component );
        if( is_array($component_viewspec) ) {
            
            // Define ID if doesn't exists
            $component_viewspec['id'] = $component_viewspec['id'] ?? $component;

            // Add path attribute requires by component render method
            $render_file = glob( $component_dir . $componentName . '/*.twig' );
            if( $render_file && is_array($render_file) && count($render_file) == 1 ) {
                $component_viewspec['path'] = $dir . $componentName . '/' . pathinfo($render_file[0])['basename'];
            }

            // Get and treat component props
            if( isset($component_viewspec['props']) && is_array($component_viewspec['props']) ) {
                $component_viewspec['props'] = $this->get_component_props($component_viewspec['props'], $component_viewspec['id']);
            }

            // Ensure right component type
            $component_viewspec['type'] = ( isset($component_viewspec['type']) && $component_viewspec['type'] != 'twig' ) ? $component_viewspec['type'] : 'object';

            // Remove useless component attributes
            unset($component_viewspec['engine']);

            return apply_filters( 'Abt\get_component_viewspec', $component_viewspec, $component_relative_dir );
        }

        return null;
    }



    /**
     * Recursive function to get and treat component props
     *
     */
    public function get_component_props( $component_props, $component_id = false ) {

        if( is_array($component_props) ) {

            foreach($component_props as $key_props => $props) {

                // Extend attribute
                if( is_array($props) && isset($props['extends']) ) {
                    $component_props[$key_props] = wp_parse_args( $props, $this->get_extends_component_viewspec($props['extends']) );
                    unset( $component_props[$key_props]['extends'] );
                }

                // If invalid or null component, or type absent, or need only editable props => just bypass it and continue to the next component
                if( is_null($component_props[$key_props]) || ! is_array($component_props[$key_props]) || ! isset($component_props[$key_props]['type']) || ( isset( $props['editable'] ) && $props['editable'] == false ) ) {
                    unset( $component_props[$key_props] );
                    continue;
                }

                // Serialize and add some update into few attributes.
                $component_props[$key_props]['repeatable'] = ( strpos($component_props[$key_props]['type'], '[]') !== false || ( isset($component_props[$key_props]['repeatable']) && $component_props[$key_props]['repeatable']) ) ? true : false;
                $component_props[$key_props]['type'] = str_replace('[]', '', strtolower($component_props[$key_props]['type']));
                $component_props[$key_props]['label'] = ( isset($component_props[$key_props]['label']) ) ? $component_props[$key_props]['label'] : ucfirst($key_props);
                $component_props[$key_props]['category'] = ( isset($component_props[$key_props]['category']) ) ? strtolower($component_props[$key_props]['category']) : '';
                
                // If type is object with sub-props, call this recursive method
                if( ( $component_props[$key_props]['type'] == 'object' || $component_props[$key_props]['type'] == 'Object[]' ) && isset($component_props[$key_props]['props']) && is_array($component_props[$key_props]['props']) )
                    $component_props[$key_props]['props'] = $this->get_component_props($component_props[$key_props]['props'], false);
            }
        }

        if( $component_id ) {
            $component_props = apply_filters('abt/get_frontspec_component_props_' . $component_id, $component_props);
        }

        return $component_props;
    }



    /**
     * Get and treat extended component 
     * 
     */
    public function get_extends_component_viewspec( $extends ) {

        if( strpos($extends, '.') !== false ) {

            $frontspec_views_path = $this->get_config()->get_spec( 'views' );
            if( is_array($frontspec_views_path) && isset($frontspec_views_path['folders']) & is_array($frontspec_views_path['folders']) ) {

                $prefix_extends = explode('.', $extends);
                if( is_array($prefix_extends) && count($prefix_extends) == 2 && isset($frontspec_views_path['folders'][ $prefix_extends[0] ]) ) {

                    $extends_dir = $frontspec_views_path['folders'][ $prefix_extends[0] ] . '/' . $prefix_extends[1] . '/';
                }
            }
        }
        else {
            $extends_dir = 'components/';
        }

        return $this->get_component_viewspec( $extends, $extends_dir );
    }

}