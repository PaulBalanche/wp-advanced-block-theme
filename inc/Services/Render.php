<?php

namespace Abt\Services;

use Abt\Singleton\Timber;

class Render {

    /**
     * Render method
     * 
     */
    public static function render( $view, $context ) {

        return Timber::getInstance()->render( $view, $context );
    }

}