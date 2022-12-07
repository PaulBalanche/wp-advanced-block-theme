<?php

namespace Abt\Helpers;

use Abt\Singleton\Config as Config;
use Composer\Installers\OsclassInstaller;

class DraftJsToHtml {
    
    public static function rawToHtml( $raw ) {

        $blocks = [];

        if( is_array($raw) && isset($raw['blocks']) && is_array($raw['blocks']) ) {
            foreach( $raw['blocks'] as $block ) {

                $blocks[] = self::blocFormatting( $block );
            }
        }



        $html = '';
        foreach( $blocks as $key => $block ) {

            $html .= self::renderHtml( $block );
        }
echo htmlentities($html);
echo '<pre>'; print_r($blocks);
die;
        return $html;
    }


    public static function renderHtml( $blocks ) {
        // RenderService::render( $block_spec['path'], $render_attributes ) );s
        $html = '';
        if( is_array($blocks) && isset($blocks['content']) ) {

            foreach( $blocks['content'] as $content ) {

                if( is_array($content) ) {
                    $html .= self::renderHtml( $content );
                }
                else {
                    $html .= $content;
                }
            }
        }

        return $html;
    }


    public static function contentFormatting( $block, &$char_position, $style = null, $keyInlineStyleToPass = null ) {

        $content = [ '' ];

        $textSplitted = str_split($block['text']);
        foreach( $textSplitted as $key => $character ) {

            if( $key < $char_position ) {
                continue;
            }

            foreach( $block['inlineStyleRanges'] as $keyInlineStyle => $inlineStyle ) {

                // Opening
                if( $inlineStyle['offset'] == $key && ( $keyInlineStyleToPass === null || ( $keyInlineStyleToPass !== null && $keyInlineStyle != $keyInlineStyleToPass ) ) ) {

                    $content[] = self::contentFormatting( $block, $char_position, null, $keyInlineStyle );
                    $content[] = '';
                    continue 2;
                }
                // Closing
                else if( $inlineStyle['offset'] + $inlineStyle['length']  == $key ) {

                    $content[ count($content) - 1 ] .= $character;
                    $char_position++;
                    break 2;
                }
            }

            $content[ count($content) - 1 ] .= $character;
            $char_position++;
        }

        if( empty( $content[ count($content) - 1 ] ) ) {
            unset($content[ count($content) - 1 ]);
        } 

        return [
            'type' => $style,
            'content' => $content
        ];
    }

    public static function blocFormatting( $block ) {

        if( ! is_array($block) || ! isset($block['text']) || empty($block['text']) || ! isset($block['type']) ) {
            return;
        }

        $char_position = 0;
        $content = self::contentFormatting( $block, $char_position );

        
        
        echo '<pre>';print_r($content);
        echo '<pre>';print_r($block);die;

        return $content;










        // $current_index = 0;

        // $content[] = [
        //     'type' => 'unstyled',
        //     'content' => []
        // ];
        
        // $textSplitted = str_split($block['text']);
        // foreach( $textSplitted as $key => $character ) {

        //     foreach( $block['inlineStyleRanges'] as $inlineStyle ) {

        //         // Opening
        //         if( $inlineStyle['offset'] == $key ) {

        //             $current_index++;

        //             // $content[ $current_index ] = [
        //             //     'type' => $inlineStyle['style'],
        //             //     'content' => [ $character ]
        //             // ];
        //         }
        //         else if( $inlineStyle['offset'] + $inlineStyle['length']  == $key ) {

        //             $current_index++;
        //             // $content[] = self::outputInlineStyle( $inlineStyle['style'], false );
        //         }
        //     }

        //     if( ! isset($content[0]['content'][$current_index]) ) {
        //         $content[0]['content'][$current_index] = [
        //             'type' => 'unstyled',
        //             'content' => ''
        //         ];
        //     }
        //     $content[0]['content'][$current_index]['content'] .= $character;
        // }









        // $theme_spec = Config::getInstance()->get_spec();

        // $div = ( $block['type'] != 'unstyled' ) ? 'div' : 'p';

        // $html = [];
        
        // $html[] = '<' . $div;
        // if( $block['type'] != 'unstyled' && isset($theme_spec['typo']) && is_array($theme_spec['typo']) && isset($theme_spec['typo'][ $block['type'] ]) && is_array($theme_spec['typo'][ $block['type'] ]) && isset($theme_spec['typo'][ $block['type'] ]['class']) ) {
        //     $html[] =  ' class="' . $theme_spec['typo'][ $block['type'] ]['class'] . '"';
        // }
        // $html[] = '>';

        // $html[] = self::inlineFormatting( $block );

        // $html[] = '</' . $div . '>';

        // return implode( '', $html);
    }

    // public static function inlineFormatting( $block ) {

    //     if( ! is_array($block) || ! isset($block['text']) || empty($block['text']) ) {
    //         return;
    //     }

    //     $html = [];

    //     if( is_array($block['inlineStyleRanges']) && count($block['inlineStyleRanges']) > 0 ) {

    //         $textSplitted = str_split($block['text']);

    //         foreach( $textSplitted as $key => $character ) {

    //             foreach( $block['inlineStyleRanges'] as $inlineStyle ) {

    //                 // Opening
    //                 if( $inlineStyle['offset'] == $key ) {
    //                     $html[] = self::outputInlineStyle( $inlineStyle['style'] );
    //                 }
    //                 else if( $inlineStyle['offset'] + $inlineStyle['length']  == $key ) {
    //                     $html[] = self::outputInlineStyle( $inlineStyle['style'], false );
    //                 }
    //             }

    //             $html[] = $character;
    //         }
    //     }
    //     else {
    //         $html[] = $block['text'];
    //     }

    //     return implode( '', $html);
    // }

    // public static function outputInlineStyle( $style, $opening = true ) {

    //     $output = '';

    //     $theme_spec = Config::getInstance()->get_spec();

    //     if( isset($theme_spec['typo']) && is_array($theme_spec['typo']) && isset($theme_spec['typo'][$style]) && is_array($theme_spec['typo'][$style]) && isset($theme_spec['typo'][$style]['class']) ) {
    //         $output = ( $opening ) ? '<span class="' . $theme_spec['typo'][$style]['class'] . '">' : '</span>';
    //     }

    //     return $output;
    // }

}