<?php

namespace Abt\Coffeekraken\Helpers;

class Css {
    
    /**
     * Generate Coffeekraken CSS layout string
     * 
     */
    public static function generate_coffeekraken_css_layout( $cells, $device = 'desktop' ) {

        $device = ucfirst($device);
    
        // First of all, we look at how many columns and rows there are
        $countColumns = 1;
        $countRows = 1;
        foreach( $cells as $cell ) {
    
            $columnStart = $cell[ 'columnStart' . $device ] ?? 1;
            $width = $cell[ 'width' . $device ] ?? 1;
            $rowStart = $cell[ 'rowStart' . $device ] ?? 1;
            $height = $cell[ 'height' . $device ] ?? 1;
    
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
        $layout = '';
    
        $row_index = 1;
        while( $row_index <= $countRows ) {
        
            $column_index = 1;
            while( $column_index <= $countColumns ) {
    
                foreach( $cells as $key => $cell ) {
    
                    $columnStart = $cell[ 'columnStart' . $device ] ?? 1;
                    $width = $cell[ 'width' . $device ] ?? 1;
                    $rowStart = $cell[ 'rowStart' . $device ] ?? 1;
                    $height = $cell[ 'height' . $device ] ?? 1;
    
                    if( $rowStart > $row_index || $rowStart + $height - 1 < $row_index ) {
                        continue;
                    }
    
                    if( $columnStart > $column_index || $columnStart + $width - 1 <  $column_index ) {
                        continue;
                    }
    
                    $layout .= ' ' . $key + 1;
                }
            
                $column_index++;
            }
    
            $layout .= ' _';
            $row_index++;
        }
    
        return trim( $layout, ' _' );
    }

}