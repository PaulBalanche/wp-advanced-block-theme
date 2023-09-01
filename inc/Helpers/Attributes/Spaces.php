<?php

namespace Abt\Helpers\Attributes;

class Spaces extends Base {

    public static function format( &$propInstance ) {
        return apply_filters('Abt\attributes_spaces_formatting', $propInstance->getValue());
    }

}