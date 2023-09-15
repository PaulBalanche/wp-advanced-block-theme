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

        $path_viewspec_file = glob( $component_dir . $componentName . '/*.spec.json' );
        if( $path_viewspec_file && is_array($path_viewspec_file) && count($path_viewspec_file) == 1 ) {
            $path_viewspec_file = $path_viewspec_file[0];
        }

        // Get the file content
        $component_viewspec = ( file_exists( $path_viewspec_file ) ) ? json_decode( file_get_contents( $path_viewspec_file ), true ) : [];
        $component_viewspec = apply_filters( 'Abt\pre_get_component_viewspec', $component_viewspec, $component );
        if( is_array($component_viewspec) ) {
            
            // Define ID if doesn't exists
            $component_viewspec['id'] = $component_viewspec['id'] ?? sanitize_title($component);
            $component_viewspec['name'] = $component_viewspec['name'] ?? ucfirst($componentName);
            $component_viewspec['category'] = $component_viewspec['category'] ?? ucfirst( str_replace( '/', '-', str_replace('/' . $componentName, '', $component)) );

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
            $component_viewspec['type'] = ( isset($component_viewspec['type']) && $component_viewspec['type'] != 'twig' ) ? strtolower($component_viewspec['type']) : 'object';

            // Remove useless component attributes
            unset($component_viewspec['engine']);

            return apply_filters( 'Abt\get_component_viewspec', $component_viewspec, $component );
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

                // If invalid or null component, or type absent, or need only editable props => just bypass it and continue to the next component
                if(
                    is_null($component_props[$key_props]) ||
                    ! is_array($component_props[$key_props]) ||
                    ! isset($component_props[$key_props]['type']) ||
                    ( isset( $props['editable'] ) && $props['editable'] == false ) ||
                    ( ( strtolower($component_props[$key_props]['type']) == 'object' || strtolower($component_props[$key_props]['type']) == 'object[]' || strtolower($component_props[$key_props]['type']) == 'object{}' ) && ! isset($component_props[$key_props]['props']) ) ||
                    strtolower($component_props[$key_props]['type']) == 'html'
                ) {
                    unset( $component_props[$key_props] );
                    continue;
                }

                // Serialize and add some update into few attributes.
                $component_props[$key_props]['repeatable'] = ( strpos($component_props[$key_props]['type'], '[]') !== false || strpos($component_props[$key_props]['type'], '{}') !== false || ( isset($component_props[$key_props]['repeatable']) && $component_props[$key_props]['repeatable']) ) ? true : false;
                $component_props[$key_props]['type'] = str_replace( [ '[]', '{}', 'component' ], [ '', '', 'object' ], strtolower($component_props[$key_props]['type']));
                $component_props[$key_props]['label'] = ( isset($component_props[$key_props]['label']) ) ? $component_props[$key_props]['label'] : ucfirst($key_props);
                $component_props[$key_props]['category'] = ( isset($component_props[$key_props]['category']) ) ? strtolower($component_props[$key_props]['category']) : '';
                
                // Form type
                if( isset($component_props[$key_props]['section']) && $component_props[$key_props]['section'] == 'form' ) {
                    $component_props[$key_props]['type'] = 'form';
                    $component_props[$key_props]['entity'] = 'wpe_contact_form';
                }

                // If type is object with sub-props, call this recursive method
                if( ( in_array( strtolower($component_props[$key_props]['type']), [ 'object', 'component' ] ) || strtolower($component_props[$key_props]['type']) == 'object[]' || strtolower($component_props[$key_props]['type']) == 'object{}' ) && isset($component_props[$key_props]['props']) && is_array($component_props[$key_props]['props']) )
                    $component_props[$key_props]['props'] = $this->get_component_props($component_props[$key_props]['props'], false);
            }
        }

        if( $component_id ) {
            $component_props = apply_filters('Abt\get_frontspec_component_props_' . $component_id, $component_props);
        }

        return $component_props;
    }

}