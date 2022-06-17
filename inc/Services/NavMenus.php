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
                    $nav_menu_items[] = [
                        'title' => $item->title,
                        'url' => $item->url,
                    ];
				}
			}
		}

        return $nav_menu_items;
    }

}