<?php

namespace Abt\Helpers\Attributes;

class Select extends Base {

    public static function format( &$propInstance ) {

        return [
            'value' => [
                [ 'value' => $propInstance->getValue() ]
            ]
        ];
    }

}