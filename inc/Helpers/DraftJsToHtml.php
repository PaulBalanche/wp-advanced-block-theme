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
                
                self::mergeEntityWithInlineStyle( $block['inlineStyleRanges'], $block['entityRanges'], $raw['entityMap'] );

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



    public static function mergeEntityWithInlineStyle( &$inlineStyleRanges, $entityRanges, $entityMap ) {

        while( count($entityRanges) > 0 ) {
            foreach( $entityRanges as $keyEntityRange => $entityRange ) {

                self::mapEntity( $entityRange, $entityMap );

                $index_to_put = count( $inlineStyleRanges );
                    
                foreach( $inlineStyleRanges as $keyInlineStyle => $inlineStyle ) {

                    if( $entityRange['offset'] > $inlineStyle['offset'] )
                        continue;

                    $index_to_put = $keyInlineStyle;

                    break;
                }
                
                $prev_tab = array_slice( $inlineStyleRanges, 0, $index_to_put, true );
                $next_tab = array_slice( $inlineStyleRanges, $index_to_put, count($inlineStyleRanges), true );
                $inlineStyleRanges = array_values( $prev_tab + [ $index_to_put . '_entity_' . $keyEntityRange => $entityRange ] + $next_tab  );
                    
                unset( $entityRanges[$keyEntityRange] );
            }
        }
    }

    public static function mapEntity( &$entityRange, $entityMap ) {

        $entity = $entityMap[ $entityRange['key'] ];
        switch( $entity['type'] ) {
            case 'LINK':

                $entityRange['style'] = 'a';
                $entityRange['data'] = [
                    'url' => $entity['data']['url'],
                    'target' => ( isset($entity['data']['openInNewTab']) && $entity['data']['openInNewTab'] ) ? '_blank' : null
                ];
                break;
        }
        
        unset( $entityRange['key'] );
    }

}