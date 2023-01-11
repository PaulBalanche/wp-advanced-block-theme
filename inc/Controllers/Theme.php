<?php

namespace Abt\Controllers;

use Abt\Services\Scripts as ScriptsService;
use Abt\Services\NavMenus as NavMenusService;
use Abt\Services\Localization as LocalizationService;
use Abt\Services\Template as TemplateService;
use Abt\Services\Render as RenderService;

class Theme extends ControllerBase {

    public function __construct() {
        parent::__construct();

        new ScriptsService();
        new NavMenusService();
        new LocalizationService();
        new TemplateService();
    }


    public function render( $template_file, $content ) {

        $template = pathinfo($template_file)['filename'];

        // $view = 'layouts/main.twig';
        $view = 'layouts/nude.twig';

        $menus = [];
        $menu_locations = $this->get_config()->get_spec('menus');
        if( ! is_null($menu_locations) && is_array($menu_locations) ) {
            foreach( $menu_locations as $id_menu => $menu ) {
                $menus[$id_menu] = [ 'items' => apply_filters( 'Abt\get_nav_menu_items', [], $id_menu ) ];
            }
        }

        echo RenderService::render(
            $view,
            apply_filters( 'Abt\render_template_context', [
                'body' => $content,
                'menus' => $menus,
                'frontspec' => $this->get_config()->get_spec()
            ] )
        );
    }

}