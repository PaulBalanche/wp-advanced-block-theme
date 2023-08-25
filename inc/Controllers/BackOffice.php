<?php

namespace Abt\Controllers;

class BackOffice extends ControllerBase {

    public function __construct() {
        parent::__construct();
        
        $this->add_actions();
    }

    /**
     * Add Wordpress actions & filters
     * 
     */
    public function add_actions() {
        add_action( 'admin_menu', array( $this, 'admin_menu' ) );
    }


     
    /**
	 * Registers a new config page
	 */
	public function admin_menu() {

        add_menu_page( 'WP Advanced Block Theme', 'WP-ABT', 'manage_options', 'wp-abt-config', [ $this, 'config' ] );
        add_submenu_page( 'wp-abt', 'WP Advanced Block Theme - Confi', 'Config', 'manage_options', 'wp-abt-config', [ $this, 'config' ] );
	}

    public function header( $title ) {
        return '<div class="wrap">
            <h1>' . $title . '</h1>';
    }

    public function footer() {
        return '</div>';
    }

    public function config() {
        echo $this->header( 'WP advanced block theme - ' . __( 'Config', 'wp-abt' ) );
        echo $this->get_config()->bo_config_page_callback();
        echo $this->footer();
    }

}