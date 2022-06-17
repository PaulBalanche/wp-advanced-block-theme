<?php

namespace Abt\Controllers;

use Abt\Services\Scripts as ScriptsService;
use Abt\Services\NavMenus as NavMenusService;
use Abt\Services\Localization as LocalizationService;

class Theme extends ControllerBase {

    public function __construct() {
        parent::__construct();

        new ScriptsService();
        new NavMenusService();
        new LocalizationService();
    }

}