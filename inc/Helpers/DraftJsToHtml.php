<?php

namespace Abt\Helpers;

use Abt\Singleton\Config;

class DraftJsToHtml {
    
    public static function rawToHtml( $raw ) {

        // Get default style
        $themeSpec = Config::getInstance()->get_spec();
        $defaultStyle = null;
        if( isset($themeSpec['typo']) && is_array($themeSpec['typo']) ) {
            foreach( $themeSpec['typo'] as $key_typo => $val_typo ) {
                if( isset($val_typo['default']) && $val_typo['default'] ) {
                    $defaultStyle = $key_typo;
                    break;
                }
            }
        }

        $content = [];

        if( is_array($raw) && isset($raw['blocks']) && is_array($raw['blocks']) ) {
            foreach( $raw['blocks'] as $block ) {

                if( is_array($block) && isset($block['text']) && ! empty($block['text']) && isset($block['type']) ) {

                    $block['type'] = ( $block['type'] == 'unstyled' ) ? $defaultStyle : $block['type'];
                    $content[] = \Sugar\draftJS\generateDeepStyleObject( $block, $block['type'] );
                }
            }
        }

        return \Sugar\draftJS\getContentHtml( $content, '\Abt\Services\Render::render' );
    }

}