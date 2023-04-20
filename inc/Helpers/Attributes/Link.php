<?php

namespace Abt\Helpers\Attributes;

class Link extends Base {
    
    public static function isValid( &$propInstance ) {
        
        $value = $propInstance->getValue();
        if( is_array($value) ) {

            if( isset($value['url'], $value['text']) && ! empty($value['url']) && ! empty($value['text']) ) {
                return true;
            }
            else {

                if( ! isset($value['url']) || empty($value['url']) ) {
                    $propInstance->addError( 'URL\'s missing' );
                }

                if( ! isset($value['text']) || empty($value['text']) ) {
                    $propInstance->addError( 'Text\'s missing' );
                }
            }
        }

        return false;
    }


    public static function format( &$propInstance ) {
                    
        $value = $propInstance->getValue();
        if( is_array($value) ) {

            if( isset($value['url'], $value['text']) && ! empty($value['url']) && ! empty($value['text']) ) {
                return [
                    'url' => $value['url'],
                    'text' => $value['text'],
                    'target' => ( isset($value['opensInNewTab']) && $value['opensInNewTab'] == '1' ) ? true : false
                ];
            }
        }

        return null;
    }

}