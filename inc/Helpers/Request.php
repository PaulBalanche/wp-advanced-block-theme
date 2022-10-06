<?php

namespace Abt\Helpers;

class Request {
    
    /**
     * Check if request is made by admin editor page
     * 
     */
    public static function is_admin_editor_request() {

        return (
            isset($_SERVER['REQUEST_URI']) &&
            (
                strpos( $_SERVER['REQUEST_URI'], 'wp-json/wp/v2/block-renderer' ) !== false ||
                strpos( $_SERVER['REQUEST_URI'], '?rest_route=%2Fwp%2Fv2%2Fblock-renderer' ) !== false
            )
        );
    }

}