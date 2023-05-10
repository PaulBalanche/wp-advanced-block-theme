<?php
/**
 * Plugin Name: 		WP advanced block theme
 * Version: 			1.3.1
 * Requires at least: 	6.0
 * Requires PHP:      	8.0
 * Author: 				Paul Balanche
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
    "ABT_FRONTSPEC_JSON_FILENAME",
    defined("THEME_FRONTSPEC_JSON_FILENAME")
        ? THEME_FRONTSPEC_JSON_FILENAME
        : "frontspec.json"
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
    "ABT_CONTAINER_CLASS_NAME",
    defined("CONTAINER_CLASS_NAME") ? CONTAINER_CLASS_NAME : "container"
);
define("ABT_FRONT_ENV", defined("FRONT_ENV") ? FRONT_ENV : "production");
define("ABT_PLUGIN_TEXTDOMAIN", "abt-plugin");

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
 //  */
// add_action("init", "_abt_plugin_load_textdomain");
// function _abt_plugin_load_textdomain() {

//     load_plugin_textdomain( ABT_PLUGIN_TEXTDOMAIN, false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
// }
