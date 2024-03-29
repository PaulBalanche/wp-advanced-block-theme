<?php

namespace Abt\Helpers\Attributes;

use Abt\Helpers\DraftJsToHtml;

class Wysiwyg extends Base {
    
    public static function format( &$propInstance ) {

        return DraftJsToHtml::rawToHtml( $propInstance->getValue() );
    }
}