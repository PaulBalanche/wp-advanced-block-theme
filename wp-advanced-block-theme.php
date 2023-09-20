<?php
/**
 * Plugin Name: WP Advanced Block Theme
 * Plugin URI: https://paul-balanche.gitbook.io/wp-advanced-block-theme-plugin-documentation/
 * Description: Provide personnal Gutenberg Blocks to create clean and flexible layouts based on your own HTML code.
 * Version: 1.5.9
 * Requires at least: 6.0
 * Requires PHP: 8.0
 * Author: Paul Balanche - BuzzBrothers
 * Author URI: https://buzzbrothers.ch
 * Text Domain: wp-abt
 * Domain Path: /languages
 */

if (!defined("ABSPATH")) {
    exit(); // Exit if accessed directly.
}

error_reporting(E_ALL | E_STRICT);

/**
 * Define variables
 *
 */
define("ABT_PLUGIN_DIR", plugin_dir_path(__FILE__));
define("ABT_PLUGIN_URL", plugins_url("", __FILE__) . "/");
define(
    "ABT_FRONTEND_RELATIVE_PATH",
    defined("THEME_FRONT_END_RELATIVE_PATH")
        ? THEME_FRONT_END_RELATIVE_PATH
        : "front-end"
);
define(
    "ABT_TEMPLATE_VIEWS_LOCATION",
    defined("THEME_VIEW_ROOT_LOCATION")
        ? THEME_VIEW_ROOT_LOCATION
        : "src/views/"
);
define(
    "ABT_TEMPLATE_COMPONENTS_SUB_LOCATION",
    defined("COMPONENTS_RELATIVE_PATH")
        ? COMPONENTS_RELATIVE_PATH
        : "components/"
);
define(
    "ABT_INCLUDE_WP_HEADER",
    defined("INCLUDE_WP_HEADER")
        ? INCLUDE_WP_HEADER
        : true
);
define(
    "ABT_CONTAINER_CLASS_NAME",
    defined("CONTAINER_CLASS_NAME") ? CONTAINER_CLASS_NAME : "container"
);
define("ABT_FRONT_ENV", defined("FRONT_ENV") ? FRONT_ENV : "production");

/**
 * Dependencies
 *
 */
require ABT_PLUGIN_DIR . "vendor/autoload.php";

/**
 * Initialize WPE Gutenberg blocks plugin
 *
 */
add_action("plugins_loaded", "_abt_plugin_init");
function _abt_plugin_init()
{
    Abt\Main::getInstance();
}

/**
 *  Loads a plugin’s translated strings.
 *
*/
add_action("init", "_abt_plugin_load_textdomain");
function _abt_plugin_load_textdomain() {
    load_plugin_textdomain( 'wp-abt', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}