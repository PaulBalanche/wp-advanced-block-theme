<?php

namespace Abt\Models;

use Abt\Singleton\Config;

class ModelBase {
    
    private $config;

    function __construct() {
        $this->config = Config::getInstance();
    }

    public function get_config() {
        return $this->config;
    }

}