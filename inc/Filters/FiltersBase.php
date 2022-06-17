<?php

namespace Abt\Filters;

use Abt\Singleton\Config;

class FiltersBase {
    
    private $config;

    function __construct() {
        $this->config = Config::getInstance();
    }

    public function get_config() {
        return $this->config;
    }

}