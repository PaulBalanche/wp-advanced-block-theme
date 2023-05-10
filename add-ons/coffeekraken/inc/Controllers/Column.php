<?php

namespace Abt\Coffeekraken\Controllers;

use Abt\Coffeekraken\Helpers\Css;
use Abt\Controllers\ControllerBase;

class Column extends ControllerBase
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
            "Abt\pre_render_attributes_layout_wpe-column",
            [$this, "handle_column"],
            10,
            1
        );
    }

    public function handle_column($attributes)
    {
        $attributes["areaId"] = $attributes["id_component"];

        // Return
        return $attributes;
    }
}
