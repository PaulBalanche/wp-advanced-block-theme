<?php

namespace Abt\Controllers;

use Abt\Services\ComponentBlocks as ComponentBlocksService;

class BlockEditor extends ControllerBase
{
    private $handle_name = "abt_editor",
        $css_filename = "dist/abt_editor.css",
        $js_filename = "dist/abt_editor.js",
        $php_asset_filename = "dist/abt_editor.asset.php";

    public function __construct()
    {
        parent::__construct();

        $this->add_actions();
    }

    /**
     * Add Wordpress actions
     *
     */
    public function add_actions()
    {
        add_action("admin_enqueue_scripts", [$this, "register_editor_script"]);
        add_action("admin_enqueue_scripts", [$this, "register_editor_style"]);

        add_action("in_admin_header", [
            $this,
            "display_gutenberg_loagind_zone",
        ]);
    }

    /**
     * Register editor script
     *
     */
    public function register_editor_script()
    {
        $handle = $this->handle_name . "-script";
        $asset_file = include ABT_PLUGIN_DIR . $this->php_asset_filename;

        wp_register_script(
            $handle,
            ABT_PLUGIN_URL . $this->js_filename,
            $asset_file["dependencies"],
            $asset_file["version"]
        );

        wp_localize_script(
            $handle,
            "GLOBAL_LOCALIZED", [
                "admin_url" => admin_url(),
                "post_id" => get_the_ID(),
                "post_url" => get_the_permalink(),
                "user_id" => get_current_user_id(),
                "rest_api_url" => rest_url(),
                "rest_api_namespace" => $this->get_config()->get("rest_api_namespace"),
                "componentblock_attr_autosaves_rest_api_resource_path" => ComponentBlocksService::get_attributes_autosaves_rest_api_resource_path(),
                "current_user_can_edit_posts" => current_user_can("edit_posts") ? "1" : "0",
                "components" => ComponentBlocksService::get_all_blocks_spec(),
                "container" => $this->get_config()->get_spec("container"),
                "galleryType" => $this->get_config()->get_spec("galleryType"),
                "theme_spec" => apply_filters(
                    "Abt\localize_editor_script",
                    $this->get_config()->get_spec(),
                    $this->get_config()->get("componentBlockPrefixName"),
                    "theme_spec"
                ),
                "blocks_spec" => apply_filters(
                    "Abt\localize_editor_script",
                    apply_filters('Abt\editor_script_localize_blocks_spec', []),
                    $this->get_config()->get("componentBlockPrefixName"),
                    "block_spec"
                )
            ]
        );

        wp_enqueue_script($handle);
    }

    /**
     * Register editor style
     *
     */
    public function register_editor_style()
    {
        wp_enqueue_style(
            $this->handle_name . "-style",
            ABT_PLUGIN_URL . $this->css_filename,
            ["wp-edit-blocks"],
            filemtime(ABT_PLUGIN_DIR . $this->css_filename)
        );
    }

    /**
     * Display a loading zone brefore Gutenbger is render
     *
     */
    public function display_gutenberg_loagind_zone()
    {
        if (
            $_SERVER["SCRIPT_FILENAME"] == ABSPATH . "wp-admin/post.php" &&
            isset($_GET["action"], $_GET["post"]) &&
            $_GET["action"] == "edit"
        ) {
            global $post;
            if (isset($post) && use_block_editor_for_post($post)) {
                echo '<div class="o-editor-loading-zone">
                    <div class="_inner">
                        <div class="o-loader"></div>
                        <p>Loading <span>please wait...</span></p>
                    </div>
                </div>';
            }
        }
    }
}
