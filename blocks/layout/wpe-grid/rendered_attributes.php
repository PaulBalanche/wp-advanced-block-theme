<?php


function layoutCss($layout, $settings = [])
{
    $finalParams = (object) array_merge(
        [
            'selector' => '#layout',
            'gap' => null,
            'gapBetween' => true,
            'align' => 'stretch',
            'justify' => 'stretch',
            'media' => null,
            'mediaSettings' => [],
            'minify' => true,
            'scope' => ['bare', 'lnf', 'gap', 'align', 'justify'],
        ],
        (array) $settings
    );

    $areas = [];

    $colsCountByArea = [];
    $rowsCountByArea = [];
    $areasCountedByLine = [];
    $areasCountedByCol = [];

    $colsStartByArea = [];
    $rowsStartByArea = [];
    $colsEndByArea = [];
    $rowsEndByArea = [];

    $rows = array_filter(
        array_map(function ($l) {
            return trim($l);
        }, preg_split('/(\\n|_)/', $layout)),
        function ($l) {
            return $l != '_' && $l != '';
        }
    );

    $rowsCount = count($rows);
    $colsCount = 0;

    foreach ($rows as $row) {
        $rowCols = array_map(function ($l) {
            return trim($l);
        }, explode(' ', $row));
        if (count($rowCols) > $colsCount) {
            $colsCount = count($rowCols);
        }
    }

    $currentCol = 0;
    $currentRow = 0;

    foreach ($rows as $row) {
        $currentRow++;
        $currentCol = 0;

        $rowCols = array_map(function ($l) {
            return trim($l);
        }, explode(' ', $row));

        foreach ($rowCols as $areaId) {
            $currentCol++;

            if (!in_array($areaId, $areas)) {
                array_push($areas, $areaId);
            }

            if (!isset($areasCountedByCol[$currentCol . '-' . $areaId])) {
                $areasCountedByCol[$currentCol . '-' . $areaId] = true;
                $current = isset($colsCountByArea[$areaId])
                    ? $colsCountByArea[$areaId]
                    : 0;
                $colsCountByArea[$areaId] = $current + 1;
            }

            if (!isset($areasCountedByLine[$currentRow . '-' . $areaId])) {
                $areasCountedByLine[$currentRow . '-' . $areaId] = true;
                $current = isset($rowsCountByArea[$areaId])
                    ? $rowsCountByArea[$areaId]
                    : 0;
                $colsCountByArea[$areaId] = $current + 1;
            }
        }
    }

    $currentCol = 0;
    $currentRow = 0;

    foreach ($rows as $row) {
        $currentRow++;
        $currentCol = 0;

        $rowCols = array_map(function ($l) {
            return trim($l);
        }, explode(' ', $row));

        foreach ($rowCols as $areaId) {
            $currentCol++;

            if (!isset($colsStartByArea[$areaId])) {
                $colsStartByArea[$areaId] = $currentCol;
            }

            if (!isset($rowsStartByArea[$areaId])) {
                $rowsStartByArea[$areaId] = $currentRow;
            }

            $colsEndByArea[$areaId] = $currentCol;
            $rowsEndByArea[$areaId] = $currentRow;
        }
    }

    $colsStatement = [];
    $rowsStatement = [];

    for ($i = 0; $i < $colsCount; $i++) {
        if ($colsCount <= 1) {
            array_push($colsStatement, '100%');
        } else {
            array_push($colsStatement, '1fr');
        }
    }

    $vars = [$finalParams->selector . ' {'];

    if (in_array('bare', $finalParams->scope)) {
        array_push(
            $vars,
            'display: grid;
            grid-template-columns: ' .
                implode(' ', $colsStatement) .
                ';
            grid-template-rows: auto;'
        );
    }

    if (in_array('align', $finalParams->scope)) {
        array_push($vars, 'align-items: ' . $finalParams->align . ';');
    }

    if (in_array('justify', $finalParams->scope)) {
        array_push($vars, 'justify-items: ' . $finalParams->justify . ';');
    }

    if ($finalParams->gap && in_array('gap', $finalParams->scope)) {
        array_push($vars, 'gap: ' . $finalParams->gap . ';');
    }

    array_push($vars, '}');

    if (in_array('bare', $finalParams->scope)) {
        foreach ($areas as $areaId) {
            array_push(
                $vars,
                $finalParams->selector .
                    ' > *:nth-child(' .
                    $areaId .
                    ') {
                    grid-column-start: ' .
                    $colsStartByArea[$areaId] .
                    ';
                    grid-column-end: ' .
                    $colsEndByArea[$areaId] .
                    ';
                    grid-row-start: ' .
                    $rowsStartByArea[$areaId] .
                    ';
                    grid-row-end: ' .
                    $rowsEndByArea[$areaId] .
                    ';
                }'
            );
        }
    }

    if ($finalParams->media) {
        $query = buildMediaQuery(
            $finalParams->media,
            $finalParams->mediaSettings
        );
        array_unshift($vars, $query . ' {');
        array_push($vars, '}');
    }

    $css = implode($finalParams->minify ? ' ' : "\n", $vars);
    if ($finalParams->minify) {
        $css = preg_replace('/\n/', ' ', $css);
        $css = preg_replace('/\s{2,999}/', ' ', $css);
    }

    return $css;
}

// echo '<pre>';print_r($block_instance);die;
// Define data
$data = [
    'content' => $content,
    'attributes' => [
        'id' => 'sfsfafsd'
    ],
    'css' => layoutCss( '1 2 3', [ 'selector' => '#sfsfafsd' ] ),
    'margin' => ( is_array($attributes) && isset($attributes['margin']) && is_array($attributes['margin']) ) ? implode(' ', array_map( function ($v, $k) { if( strpos($k, 'm') == 0 ) { return $k . '-' . $v; } }, $attributes['margin'], array_keys($attributes['margin']) )) : '',
    'padding' => ( is_array($attributes) && isset($attributes['padding']) && is_array($attributes['padding']) ) ? implode(' ', array_map( function ($v, $k) { if( strpos($k, 'p') == 0 ) { return $k . '-' . $v; } }, $attributes['padding'], array_keys($attributes['padding']) )) : ''
];

// foreach( $block_instance->parsed_block['innerBlocks'] as $innerBlock ) {
//     echo '<pre>';print_r($innerBlock);
//     if( $innerBlock['blockName'] != 'custom/wpe-column' ) {
//         continue;
//     }
// }
// die;

return $data;