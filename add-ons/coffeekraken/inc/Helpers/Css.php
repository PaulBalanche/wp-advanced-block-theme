<?php

namespace Abt\Coffeekraken\Helpers;

class Css {
    
    /**
     * Generate Coffeekraken CSS layout string
     * 
     */
    public static function generate_coffeekraken_css_layout( $cells, $device = 'desktop' ) {
    
        // First of all, we look at how many columns and rows there are
        $countColumns = 1;
        $countRows = 1;
        foreach( $cells as $cell ) {
    
            $columnStart = ( isset($cell[$device]) && is_array($cell[$device]) && isset($cell[$device]['columnStart']) ) ? $cell[$device]['columnStart'] : 1;
            $width = ( isset($cell[$device]) && is_array($cell[$device]) && isset($cell[$device]['width']) ) ? $cell[$device]['width'] : 1;
            $rowStart = ( isset($cell[$device]) && is_array($cell[$device]) && isset($cell[$device]['rowStart']) ) ? $cell[$device]['rowStart'] : 1;
            $height = ( isset($cell[$device]) && is_array($cell[$device]) && isset($cell[$device]['height']) ) ? $cell[$device]['height'] : 1;
    
            $tempCountColumns = $columnStart + $width - 1;
            $tempCountRows = $rowStart + $height - 1;
    
            if( $tempCountColumns > $countColumns ) {
                $countColumns = $tempCountColumns;
            }
    
            if( $tempCountRows > $countRows ) {
                $countRows = $tempCountRows;
            }
        }
    
        // Now, loop on each rows, columns and cells and generate the final CSS layout string
        $layout = [];
    
        $row_index = 1;
        while( $row_index <= $countRows ) {
        
            $column_index = 1;
            $css_row = [];
            for( $i = 0; $i < $countColumns; $i++) {
                $css_row[] = 'x';
            }
            while( $column_index <= $countColumns ) {
    
                foreach( $cells as $key => $cell ) {
    
                    $columnStart = ( isset($cell[$device]) && is_array($cell[$device]) && isset($cell[$device]['columnStart']) ) ? $cell[$device]['columnStart'] : 1;
                    $width = ( isset($cell[$device]) && is_array($cell[$device]) && isset($cell[$device]['width']) ) ? $cell[$device]['width'] : 1;
                    $rowStart = ( isset($cell[$device]) && is_array($cell[$device]) && isset($cell[$device]['rowStart']) ) ? $cell[$device]['rowStart'] : 1;
                    $height = ( isset($cell[$device]) && is_array($cell[$device]) && isset($cell[$device]['height']) ) ? $cell[$device]['height'] : 1;
    
                    if( $rowStart > $row_index || $rowStart + $height - 1 < $row_index ) {
                        continue;
                    }
    
                    if( $columnStart > $column_index || $columnStart + $width - 1 <  $column_index ) {
                        continue;
                    }
    
                    $css_row[$column_index - 1] = $key + 1;
                }
            
                $column_index++;
            }
    
            $layout[] = implode( ' ', $css_row );
            $row_index++;
        }
    
        return implode( ' _ ', $layout );
    }

}