<?php
/**
 * Plugin Name: 		WP advanced block theme
 * Version: 			0.0.1
 * Requires at least: 	6.0
 * Requires PHP:      	8.0
 * Author: 				Paul Balanche
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

error_reporting(E_ALL | E_STRICT);

/**
 * Define variables
 *
 */
define( 'ABT_PLUGIN_DIR',                        plugin_dir_path( __FILE__ )                                                                );
define( 'ABT_PLUGIN_URL' ,                       plugins_url('', __FILE__) . '/'                                                            );
define( 'ABT_TEMPLATE_VIEWS_LOCATION' ,          ( defined('THEME_VIEW_ROOT_LOCATION') )    ? THEME_VIEW_ROOT_LOCATION  : 'views/'          );
define( 'ABT_TEMPLATE_COMPONENTS_SUB_LOCATION',  ( defined('COMPONENTS_RELATIVE_PATH') )    ? COMPONENTS_RELATIVE_PATH  : 'components/'     );
define( 'ABT_CONTAINER_CLASS_NAME',              ( defined('CONTAINER_CLASS_NAME') )        ? CONTAINER_CLASS_NAME      : 'container'       );



/**
 * Dependencies
 * 
 */
require ABT_PLUGIN_DIR . 'vendor/autoload.php';



/**
 * Initialize WPE Gutenberg blocks plugin
 *
 */
add_action( 'plugins_loaded', '_abt_init' );
function _abt_init() {

    Abt\Main::getInstance();
}