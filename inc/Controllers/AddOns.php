<?php

namespace Abt\Controllers;

class AddOns extends ControllerBase {

    public function __construct() {
        parent::__construct();

        $add_ons = $this->get_config()->get_spec('add_ons');
        if( ! is_null($add_ons) && is_array($add_ons) ) {
            
            foreach( $add_ons as $add_on ) {
                
                if( file_exists( ABT_PLUGIN_DIR . $this->get_config()->get('addOnsLocation') . '/' . $add_on . '/index.php' ) ) {
                    include( ABT_PLUGIN_DIR . $this->get_config()->get('addOnsLocation') . '/' . $add_on . '/index.php' );
                }
            }
        }
    }

}