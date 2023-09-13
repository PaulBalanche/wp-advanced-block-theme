<?php

namespace Abt\Helpers\Attributes;

class Node extends Base {
    
    public static function format( &$propInstance ) {

        $nodes = [];

        preg_match_all( '/<!-- _node ((?:(?! -->).)*) -->((?:(?!<!-- _node).)*)<!-- \/_node -->/ms', $propInstance->getValue(), $matches, PREG_SET_ORDER);
        if( $matches && is_array($matches) ) {
            foreach( $matches as $val) {

                if( $val && is_array($val) && count($val) == 3 ) {

                    $attr = json_decode($val[1], true);
                    if( is_array($attr) && isset($attr['id']) && $attr['id'] == $propInstance->getId()) {
                        $nodes[] = $val[2];
                    }
                }
            }
        }

        return $nodes;
    }
}