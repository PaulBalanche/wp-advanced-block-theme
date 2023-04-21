<?php

namespace Abt\Helpers\Attributes;

use Abt\Models\Prop;

class RecursiveObject extends Base {
    
    public static function isValid( &$propInstance ) {
        
        $value = $propInstance->getValue();
        $spec = $propInstance->getSpecs();

        if( isset($spec['props']) && is_array($spec['props']) && count($spec['props']) > 0 ) {

            $errorsSubProps = [];
            
            foreach( $spec['props'] as $key_subProp => $subProp ) {

                $subPropInstance = new Prop($key_subProp, ( isset($value[$key_subProp]) ) ? $value[$key_subProp] : null, $subProp );
                if( $subPropInstance->isRequired() && ! $subPropInstance->isValid() ) {
                    $errorsSubProps[ $subPropInstance->getId() ] = $subPropInstance->getErrors();
                }
            }

            if( count($errorsSubProps) > 0 ) {
                $propInstance->addError( $errorsSubProps, 'items' );
            }
        }

        return ( count($propInstance->getErrors()) == 0 );
    }

    public static function format( &$propInstance ) {
                    
        $value = $propInstance->getValue();
        $spec = $propInstance->getSpecs();

        if( isset($spec['props']) && is_array($spec['props']) && count($spec['props']) > 0 ) {
            foreach( $spec['props'] as $key_subProp => $subProp ) {

                $subPropInstance = new Prop($key_subProp, ( isset($value[$key_subProp]) ) ? $value[$key_subProp] : null, $subProp );
                $value[$key_subProp] = ( $subPropInstance->isValid() ) ? $subPropInstance->format() : null;
            }
        }
        return $value;
    }

}