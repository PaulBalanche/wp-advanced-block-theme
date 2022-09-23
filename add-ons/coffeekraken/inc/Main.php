<?php

namespace Abt\Coffeekraken;

use Abt\Coffeekraken\Controllers\Grid as GridController;

class Main {

    private static $_instance;

    function __construct() {

        new GridController();
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