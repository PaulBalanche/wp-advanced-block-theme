<?php

namespace Abt\Models;

class NodeList extends SimpleProp {

    function __construct( $key, $value, $specs ) {
        parent::__construct( $key, $value, $specs );
    }

    public function format() {

        $nodes = [];

        preg_match_all( '/<!-- _node ((?:(?! -->).)*) -->((?:(?!<!-- _node).)*)<!-- \/_node -->/ms', $this->getValue(), $matches, PREG_SET_ORDER);
        if( $matches && is_array($matches) ) {
            foreach( $matches as $key => $val) {

                if( $val && is_array($val) && count($val) == 3 ) {

                    $attr = json_decode($val[1], true);
                    if( is_array($attr) && isset($attr['id']) && $attr['id'] == $this->getId()) {

                        $SimplePropInstance = new SimpleProp($key, $val[2], $this->getSpecs() );
                        if( $SimplePropInstance->isValid() ) {
                            $nodes[$key] = $SimplePropInstance->format();
                        }
                    }
                }
            }
        }

        return ( isset($this->getSpecs()['repeatable']) && $this->getSpecs()['repeatable'] ) ? $nodes : implode($nodes);
    }

}