<?php

namespace Abt\Helpers;

use Abt\Services\Render as RenderService;

class DraftJsToHtml {
    
    public static function rawToHtml( $raw ) {

        $content = [];

        if( is_array($raw) && isset($raw['blocks']) && is_array($raw['blocks']) ) {
            foreach( $raw['blocks'] as $block ) {

                if( is_array($block) && isset($block['text']) && ! empty($block['text']) && isset($block['type']) ) {
                    $content[] = self::generateDeepStyleObject( $block );
                }
            }
        }

        return self::getContentHtml( $content );
    }


    public static function getContentHtml( $content ) {

        $html = '';
        if( is_array($content) ) {

            foreach( $content as $subContent ) {
                
                if( is_array($subContent) && isset($subContent['content']) ) {

                    $html .= RenderService::render( 'sugar/bare/typo/typo.twig', [
                        'type' => ( isset($subContent['type']) && $subContent['type'] != null ) ? $subContent['type'] : null,
                        'html' => self::getContentHtml($subContent['content'])
                    ] );
                }
                else {
                    $html .= $subContent;
                }
            }
        }

        return $html;
    }


    /**
     * Take DraftJs raw blocks and create a deep object with style and contents
     * 
     */
    public static function generateDeepStyleObject( $block, &$char_position = 0, &$keyInlineStylePosition = -1, $style = null, &$breakPoint = [] ) {

        $content = [ '' ];

        $textSplitted = str_split($block['text']);
        foreach( $textSplitted as $key => $character ) {

            if( $key < $char_position ) {
                continue;
            }

            if( isset($breakPoint[$key]) && $breakPoint[$key] > 0 ) {
                $breakPoint[$key]--;
                break;
            }

            // Opening sub-style
            foreach( $block['inlineStyleRanges'] as $keyInlineStyle => $inlineStyle ) {

                if( $inlineStyle['offset'] == $key && $keyInlineStyle > $keyInlineStylePosition ) {
                    
                    $keyInlineStylePosition = $keyInlineStyle;
                    $content[] = self::generateDeepStyleObject( $block, $char_position, $keyInlineStyle, $inlineStyle['style'], $breakPoint );
                    $content[] = '';
                    continue 2;
                }
            }

            $content[ count($content) - 1 ] .= $character;
            $char_position++;

            // Closing sub-style
            foreach( $block['inlineStyleRanges'] as $keyInlineStyle => $inlineStyle ) {

                if( $inlineStyle['offset'] + $inlineStyle['length'] == $key + 1 ) {

                    $breakPoint[$key + 1] = ( isset($breakPoint[$key + 1]) ) ? $breakPoint[$key + 1] + 1: 1;
                }
            }
        }

        if( empty( $content[0] ) ) {
            array_shift($content);
        }
        
        if( empty( $content[ count($content) - 1 ] ) ) {
            unset($content[ count($content) - 1 ]);
        }

        return [
            'type' => $style,
            'content' => $content
        ];
    }

}