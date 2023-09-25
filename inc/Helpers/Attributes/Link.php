<?php

namespace Abt\Helpers\Attributes;

class Link extends Base {
    
    public static function isValid( &$propInstance ) {

        $value = $propInstance->getValue();
        if( is_array($value) && isset($value['link']) && is_array($value['link']) ) {

            if( isset($value['link']['url'], $value['link']['text']) && ! empty($value['link']['url']) && ! empty($value['link']['text']) ) {
                return true;
            }
            else {

                if( ! isset($value['link']['url']) || empty($value['link']['url']) ) {
                    return $propInstance->falseWithError( 'URL\'s missing' );
                }

                if( ! isset($value['link']['text']) || empty($value['link']['text']) ) {
                    return $propInstance->falseWithError( 'Text\'s missing' );
                }
            }
        }

        return false;
    }


    public static function format( &$propInstance ) {
                    
        $value = $propInstance->getValue();
        if( is_array($value) && isset($value['link']) && is_array($value['link']) ) {

            $linkData = [];
            foreach( $value as $keyProp => $prop) {

                if( $keyProp == 'link') {
                    if( isset($prop['url'], $prop['text']) && ! empty($prop['url']) && ! empty($prop['text']) ) {
                        $linkData['url'] = $prop['url'];
                        $linkData['text'] = $prop['text'];
                        $linkData['target'] = ( isset($prop['opensInNewTab']) && $prop['opensInNewTab'] == '1' ) ? true : false;
                    }
                }
                else {
                    $linkData[$keyProp] = $prop;
                }
            }

            return ( count($linkData) > 0 ) ? $linkData : null;
        }

        return null;
    }

}