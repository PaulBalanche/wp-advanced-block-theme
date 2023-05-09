<?php

namespace Abt\Coffeekraken\Controllers;

use Abt\Coffeekraken\Helpers\Css;
use Abt\Controllers\ControllerBase;

class Grid extends ControllerBase
{
    public function __construct()
    {
        parent::__construct();

        $this->add_filters();
    }

    /**
     * Add Wordpress filters
     *
     */
    public function add_filters()
    {
        add_filter(
            "Abt\pre_render_attributes_layout_wpe-grid",
            [$this, "handle_grid"],
            10,
            3
        );
    }

    public function handle_grid($attributes, $content, $block_instance)
    {
        // Get all cells grid informations
        $cellsLayout = [];
        foreach ($block_instance->parsed_block["innerBlocks"] as $innerBlock) {
            if ($innerBlock["blockName"] != "custom/wpe-column") {
                continue;
            }
            $cellsLayout[] = $innerBlock["attrs"]["layout"] ?? null;
        }

        // Generate Coffeekraken CSS layout string
        $layout = [];
        $media = $this->get_config()->get_spec("media");
        if (
            $media &&
            is_array($media) &&
            isset($media["queries"]) &&
            is_array($media["queries"]) &&
            count($media["queries"]) > 0
        ) {
            foreach ($media["queries"] as $device => $query) {
                $layout[$device] = Css::generate_coffeekraken_css_layout(
                    $cellsLayout,
                    $device
                );
            }
        }

        // Generate grid ID
        $grid_id =
            isset($attributes["anchor"]) && !empty($attributes["anchor"])
                ? $attributes["anchor"]
                : "grid_" . mt_rand();

        // Prepare data
        $attributes = array_merge($attributes, [
            "id" => $grid_id,
            "media" => $layout,
            "frontspec" => [
                "media" => $media,
            ],
            "container" => true,
            "attributes" => [
                "class" => $attributes["className"] ?? "",
            ],
        ]);

        // Return
        return $attributes;
    }
}
