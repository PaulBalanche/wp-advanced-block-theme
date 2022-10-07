<?php

namespace Abt\Services;

class NavMenus extends ServiceBase {

    function __construct() {
        parent::__construct();

        $this->add_actions();
        $this->add_filters();
    }
    


    /**
     * Add Wordpress actions
     * 
     */
    public function add_actions() {

        // Registers navigation menu locations for a theme.
        add_action( 'init', [ $this, 'register_menu_locations' ] );
    }



    /**
     * Add Wordpress filters
     * 
     */
    public function add_filters() {

        // Retrieves all menu items of a navigation menu.
        add_filter( 'Abt\get_nav_menu_items', [ $this, 'get_nav_menu_items' ], 10, 2 );

        // Hide admin bar
        if( ! is_null($this->get_config()->get_spec('show_admin_bar')) && ! $this->get_config()->get_spec('show_admin_bar') ) {
            add_filter( 'show_admin_bar', '__return_false' );
        }
    }



    /**
     * Registers navigation menu locations for a theme.
     * 
     */
    public function register_menu_locations() {

        $menu_locations = $this->get_config()->get_spec('menu_locations');
        if( ! is_null($menu_locations) ) {

            register_nav_menus( $menu_locations );
        }
    }



    /**
     * Retrieves all menu items of a navigation menu.
     * 
     */
    public function get_nav_menu_items( $nav_menu_items, $menu_location ) {

        $nav_menu_locations = get_nav_menu_locations();
		if ( $nav_menu_locations && isset( $nav_menu_locations[ $menu_location ] ) ) {

			$menu_items = wp_get_nav_menu_items( $nav_menu_locations[ $menu_location ] );
			if( $menu_items && is_array($menu_items) && count($menu_items) > 0 ) {

                $nav_menu_items = [];

				foreach( $menu_items as $item ) {

                    $item_data = [
                        'title' => $item->title,
                        'label' => $item->title,
                        'url' => $item->url,
                        'href' => $item->url,
                    ];

                    if( $item->menu_item_parent > 0 ) {
                        $this->recursive_add_menu_item_parent( $nav_menu_items, $item->menu_item_parent, $item->ID, $item_data );
                    }
                    else {
                        $nav_menu_items[$item->ID] = $item_data;
                    }
				}
			}
		}

        return $nav_menu_items;
    }

    public function recursive_add_menu_item_parent( &$nav_menu_items, $parentId, $key, $value ) {

        if( isset($nav_menu_items[$parentId]) ) {
            if( ! isset($nav_menu_items[$parentId]['children']) || ! is_array($nav_menu_items[$parentId]['children']) ) {
                $nav_menu_items[$parentId]['children'] = [];
            }

            $nav_menu_items[$parentId]['children'][$key] = $value;
        }
        else {
            foreach( $nav_menu_items as $key2 => $val2 ) {

                if( isset($val2['children']) ) {
                    $this->recursive_add_menu_item_parent( $nav_menu_items[$key2]['children'], $parentId, $key, $value );
                }
            }
        }
    }

}