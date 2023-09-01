<?php

namespace Abt\Helpers\Attributes;

use Abt\Helpers\DraftJsToHtml;

class Text extends Base {
    
    public static function format( &$propInstance ) {
                    
        return nl2br( $propInstance->getValue() );
    }
}