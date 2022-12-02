<?php

namespace Abt\Helpers;

use Abt\Singleton\Config as Config;

class DraftJsToHtml {
    
    public static function rawToHtml( $raw ) {

        $html = [];

        if( is_array($raw) && isset($raw['blocks']) && is_array($raw['blocks']) ) {
            foreach( $raw['blocks'] as $block ) {

                $html[] = self::blocFormatting( $block );
            }
        }

        return implode( '', $html);
    }

    public static function blocFormatting( $block ) {

        if( ! is_array($block) || ! isset($block['text']) || empty($block['text']) || ! isset($block['type']) ) {
            return;
        }

        $theme_spec = Config::getInstance()->get_spec();

        $div = ( $block['type'] != 'unstyled' ) ? 'div' : 'p';

        $html = [];
        
        $html[] = '<' . $div;
        if( $block['type'] != 'unstyled' && isset($theme_spec['typo']) && is_array($theme_spec['typo']) && isset($theme_spec['typo'][ $block['type'] ]) && is_array($theme_spec['typo'][ $block['type'] ]) && isset($theme_spec['typo'][ $block['type'] ]['class']) ) {
            $html[] =  ' class="' . $theme_spec['typo'][ $block['type'] ]['class'] . '"';
        }
        $html[] = '>';

        $html[] = self::inlineFormatting( $block );

        $html[] = '</' . $div . '>';

        return implode( '', $html);
    }

    public static function inlineFormatting( $block ) {

        if( ! is_array($block) || ! isset($block['text']) || empty($block['text']) ) {
            return;
        }

        $html = [];

        if( is_array($block['inlineStyleRanges']) && count($block['inlineStyleRanges']) > 0 ) {

            $textSplitted = str_split($block['text']);

            foreach( $textSplitted as $key => $character ) {

                foreach( $block['inlineStyleRanges'] as $inlineStyle ) {

                    // Opening
                    if( $inlineStyle['offset'] == $key ) {
                        $html[] = self::outputInlineStyle( $inlineStyle['style'] );
                    }
                    else if( $inlineStyle['offset'] + $inlineStyle['length']  == $key ) {
                        $html[] = self::outputInlineStyle( $inlineStyle['style'], false );
                    }
                }

                $html[] = $character;
            }
        }
        else {
            $html[] = $block['text'];
        }

        return implode( '', $html);
    }

    public static function outputInlineStyle( $style, $opening = true ) {

        $output = '';

        $theme_spec = Config::getInstance()->get_spec();

        if( isset($theme_spec['typo']) && is_array($theme_spec['typo']) && isset($theme_spec['typo'][$style]) && is_array($theme_spec['typo'][$style]) && isset($theme_spec['typo'][$style]['class']) ) {
            $output = ( $opening ) ? '<span class="' . $theme_spec['typo'][$style]['class'] . '">' : '</span>';
        }

        return $output;
    }

}