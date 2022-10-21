<?php

namespace Abt\Coffeekraken;

use Abt\Coffeekraken\Controllers\Components as ComponentsController;
use Abt\Coffeekraken\Controllers\Twig as TwigController;
use Abt\Coffeekraken\Controllers\Grid as GridController;
use Abt\Coffeekraken\Controllers\Scripts as ScriptsController;
use Abt\Coffeekraken\Controllers\Spacing as SpacingController;

class Main {

    private static $_instance;

    function __construct() {

        new TwigController();
        new GridController();
        new ComponentsController();
        new ScriptsController();
        new SpacingController();
    }

    /**
     * Utility method to retrieve the main instance of the class.
     * The instance will be created if it does not exist yet.
     * 
     */
    public static function getInstance() {

        if( is_null(self::$_instance) ) {
            self::$_instance = new Main();
        }
        return self::$_instance;
    }

}