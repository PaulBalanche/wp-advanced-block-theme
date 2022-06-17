<?php

namespace Abt\Controllers;

use Abt\Singleton\Config;

class ControllerBase {
    
    private $config;

    function __construct() {
        $this->config = Config::getInstance();
    }

    public function get_config() {
        return $this->config;
    }

}