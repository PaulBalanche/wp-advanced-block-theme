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
        if( isset($themeSpec['theme']) && is_array($themeSpec['theme']) && isset($themeSpec['theme']['lnf']) && is_array($themeSpec['theme']['lnf']) && isset($themeSpec['theme']['lnf']['typo']) && is_array($themeSpec['theme']['lnf']['typo']) ) {
            $typo = $themeSpec['theme']['lnf']['typo'];
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

                    $block['text'] = htmlentities($block['text']);
                    $block['type'] = ( ! isset($block['type']) || ( isset($block['type']) && ( empty($block['type']) || $block['type'] == 'unstyled' ) ) ) ? $defaultStyle : $block['type'];
                    $content[] = self::generateDeepStyleObject( $block, $block['type'] );
                }
            }
        }

        return self::renderRercursive( $content, '\Abt\Helpers\DraftJsToHtml::renderContent' );
    }



    public static function renderContent( $args ) {

        return RenderService::render(
            apply_filters( 'Abt\draftjstohtml_renderContent', 'component/draftjs/draftjs.twig'),
            $args
        );
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

    /**
     * Create deep object used to render DraftJs output (HTML, markdown, etc...)
     *
     * @param       {Array}         $block                      DraftJs JSON object
     * @param       {String}        $style                      Typo to render
     * @param       {String}        $type                       Type of typo to render
     * @param       {Integer}       $char_position              Position in content treatment - Start to 0
     * @param       {Integer}       $keyInlineStylePosition     Index of current InlineStyle treatment
     * @param       {Array}         $breakPoint                 Contains deep elements to close
     * @return      {Array}         Deep object
     */
    public static function generateDeepStyleObject(
        $block,
        $style = null,
        $type = null,
        $data = null,
        &$char_position = 0,
        &$keyInlineStylePosition = -1,
        &$breakPoint = []
    ) {
        $content = [''];

        $textSplitted = str_split($block['text']);
        foreach ($textSplitted as $key => $character) {
            if ($key < $char_position) {
                continue;
            }

            if (isset($breakPoint[$key]) && $breakPoint[$key] > 0) {
                $breakPoint[$key]--;
                break;
            }

            // Opening sub-style
            foreach (
                $block['inlineStyleRanges']
                as $keyInlineStyle => $inlineStyle
            ) {
                if (
                    $inlineStyle['offset'] == $key &&
                    $keyInlineStyle > $keyInlineStylePosition
                ) {
                    $keyInlineStylePosition = $keyInlineStyle;
                    $content[] = self::generateDeepStyleObject(
                        $block,
                        isset($inlineStyle['style']) ? $inlineStyle['style'] : null,
                        isset($inlineStyle['type']) ? $inlineStyle['type'] : null,
                        isset($inlineStyle['data']) ? $inlineStyle['data'] : null,
                        $char_position,
                        $keyInlineStyle,
                        $breakPoint
                    );
                    $content[] = '';
                    continue 2;
                }
            }

            $content[count($content) - 1] .= $character;
            $char_position++;

            // Closing sub-style
            foreach (
                $block['inlineStyleRanges']
                as $keyInlineStyle => $inlineStyle
            ) {
                if ($inlineStyle['offset'] + $inlineStyle['length'] == $key + 1) {
                    $breakPoint[$key + 1] = isset($breakPoint[$key + 1])
                        ? $breakPoint[$key + 1] + 1
                        : 1;
                }
            }
        }

        if (empty($content[0])) {
            array_shift($content);
        }

        if (empty($content[count($content) - 1])) {
            unset($content[count($content) - 1]);
        }

        return [
            'id' => $style,
            'type' => $type,
            'content' => $content,
            'data' => $data,
        ];
    }

    /**
     *
     * Return DraftJs HTML
     *
     * @param       {Array}         $deepStyleObject            Deep style object gathered using the `generateDeepStyleObject` function
     * @param       {Function}      $renderFunction             The render function that will take as parameter an array with the "type" and the "html" properties
     * @return      {String}                                    Returned HTML
     */
    public static function renderRercursive($deepStyleObject, callable $renderFunction)
    {
        $html = '';
        if (is_array($deepStyleObject)) {
            foreach ($deepStyleObject as $subContent) {
                if (is_array($subContent) && isset($subContent['content'])) {
                    $html .= call_user_func_array($renderFunction, [
                        [
                            'id' =>
                                isset($subContent['id']) &&
                                $subContent['id'] != null
                                    ? $subContent['id']
                                    : null,
                            'type' =>
                                isset($subContent['type']) &&
                                $subContent['type'] != null
                                    ? $subContent['type']
                                    : null,
                            'group' => isset($subContent['group'])
                                ? $subContent['group']
                                : null,
                            'html' => self::renderRercursive(
                                $subContent['content'],
                                $renderFunction
                            ),
                            'data' =>
                                isset($subContent['data']) &&
                                $subContent['data'] != null
                                    ? $subContent['data']
                                    : null,
                        ],
                    ]);
                } else {
                    $html .= nl2br($subContent);
                }
            }
        }

        return $html;
    }

}