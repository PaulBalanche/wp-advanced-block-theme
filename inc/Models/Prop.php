<?php

namespace Abt\Models;

class Prop {

    private $type,
            $propInstance;

    function __construct( $key, $value, $specs, $content = '' ) {

        $this->type = ( isset($specs['type']) && trim(strtolower($specs['type'])) == 'node' ) ? 'node' : ( (isset($specs['repeatable']) && $specs['repeatable'] ) ? 'repeatable' : 'simple' );
        switch( $this->getType() ) {

            case 'simple':
                $this->propInstance = new SimpleProp( $key, $value, $specs );
                break;
            
            case 'repeatable':
                $this->propInstance = new RepeatableProp( $key, $value, $specs );
                break;
            
            case 'node':
                $this->propInstance = new NodeList( $key, $content, $specs );
                break;
        }
    }

    public function getInstance() {
        return $this->propInstance;
    }

    public function getType() {
        return $this->type;
    }

    public function getId() {
        return $this->getInstance()->getId();
    }

    public function getStatus( ) {
        return $this->getInstance()->getStatus();
    }

    public function format( ) {
        return $this->getInstance()->format();
    }

    public function isValid( ) {
        return $this->getInstance()->isValid();
    }

    public function isRequired() {
        return $this->getInstance()->isRequired();
    }

    // public function isResponsive() {
    //     return ( $this->responsive );
    // }

    //     public function responsive( &$attributes, $prop ) {

//         if( $this->isResponsive() ) {
//            $this->value = [ 'media' =>  $this->value ];
//        }
//    }
}