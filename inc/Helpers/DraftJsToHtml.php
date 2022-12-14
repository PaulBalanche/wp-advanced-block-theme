<?php

namespace Abt\Helpers;

use Abt\Services\Render as RenderService;
use Abt\Singleton\Config;

class DraftJsToHtml {
    
    public static function rawToHtml( $raw ) {

        // Get default style
        $themeSpec = Config::getInstance()->get_spec();
        $typo = [];
        $defaultStyle = null;
        if( isset($themeSpec['typo']) && is_array($themeSpec['typo']) ) {
            $typo = $themeSpec['typo'];
            foreach( $typo as $key_typo => $val_typo ) {
                if( isset($val_typo['default']) && $val_typo['default'] ) {
                    $defaultStyle = $key_typo;
                    break;
                }
            }
        }

        $content = [];

        if( is_array($raw) && isset($raw['blocks']) && is_array($raw['blocks']) ) {
            foreach( $raw['blocks'] as $block ) {

                if( is_array($block) && isset($block['text']) && ! empty($block['text']) ) {
                    
                    foreach( $block['inlineStyleRanges'] as $keyInlineStyle => $inlineStyle ) {
                        $block['inlineStyleRanges'][$keyInlineStyle]['type'] = ( isset($typo[ $inlineStyle['style'] ]) && isset($typo[ $inlineStyle['style'] ]['type']) ) ? $typo[ $inlineStyle['style'] ]['type'] : null;
                    }

                    $block['text'] = nl2br($block['text']);
                    $block['type'] = ( ! isset($block['type']) || ( isset($block['type']) && ( empty($block['type']) || $block['type'] == 'unstyled' ) ) ) ? $defaultStyle : $block['type'];
                    $content[] = \Sugar\draftJs\generateDeepStyleObject( $block, $block['type'] );
                }
            }
        }

        return \Sugar\draftJs\renderContent( $content, '\Abt\Helpers\DraftJsToHtml::renderContent' );
    }


    public static function renderContent( $args ) {

        return RenderService::render( 'sugar/bare/typo/typo.twig', $args );
    }

}