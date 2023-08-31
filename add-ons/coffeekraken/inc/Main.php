<?php

namespace Abt\Coffeekraken;

use Abt\Coffeekraken\Controllers\Components as ComponentsController;
use Abt\Coffeekraken\Controllers\Config as ConfigController;
use Abt\Coffeekraken\Controllers\Twig as TwigController;
use Abt\Coffeekraken\Controllers\Grid as GridController;
use Abt\Coffeekraken\Controllers\Column as ColumnController;
use Abt\Coffeekraken\Controllers\Scripts as ScriptsController;
use Abt\Coffeekraken\Controllers\Spacing as SpacingController;
use Abt\Coffeekraken\Controllers\DraftJs as DraftJsController;

class Main
{
    private static $_instance;

    function __construct()
    {
        new ConfigController();
        new TwigController();
        new GridController();
        new ColumnController();
        new ComponentsController();
        new ScriptsController();
        new SpacingController();
        new DraftJsController();
    }

    /**
     * Utility method to retrieve the main instance of the class.
     * The instance will be created if it does not exist yet.
     *
     */
    public static function getInstance()
    {
        if (is_null(self::$_instance)) {
            self::$_instance = new Main();
        }
        return self::$_instance;
    }
}
