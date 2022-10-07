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

        $view = 'layouts/main.twig';

        echo RenderService::render(
            $view,
            apply_filters( 'Abt\render_template_context', [
                'body' => $content,
                'menu' => [ 'items' => apply_filters( 'Abt\get_nav_menu_items', [], 'top-left' ) ],
                'frontspec' => $this->get_config()->get_spec()
            ] )
        );
    }

}