<?php

namespace Abt\Models;

use Abt\Main;
use Abt\Services\ComponentBlocks as ComponentBlocksService;

class ComponentBlockMaster extends ModelBase
{
    private $componentBlocksService;

    public function __construct()
    {
        parent::__construct();

        $this->componentBlocksService = new ComponentBlocksService();
    }

    /**
     * Registers all components block type
     *
     */
    public function register_components()
    {
        $blocks_metadata = $this->componentBlocksService->get_all_blocks_metadata();
        if (is_array($blocks_metadata) && count($blocks_metadata) > 0) {
            foreach ($blocks_metadata as $metadata_json_file) {
                // Registers a block type. The recommended way is to register a block type using the metadata stored in the block.json file.
                $WP_Block_Type = register_block_type($metadata_json_file, [
                    "render_callback" =>
                        "\Abt\Models\ComponentBlockMaster::render",
                ]);
                if (
                    $WP_Block_Type &&
                    $WP_Block_Type instanceof \WP_Block_Type
                ) {
                    Main::getInstance()->add_block_registered(
                        $WP_Block_Type->name
                    );
                }
            }
        }
    }

    /**
     * Static render method
     *
     */
    public static function render($attributes, $content)
    {
        if (!isset($attributes["id_component"])) {
            return;
        }

        $componentBlockInstance = Main::getInstance()->get_component_block_instance(
            $attributes["id_component"]
        );
        $componentBlockInstance->set_attributes($attributes);
        $componentBlockInstance->set_content($content);
        return $componentBlockInstance->render();
    }
}
