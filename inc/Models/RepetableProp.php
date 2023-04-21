<?php

namespace Abt\Models;

class RepeatableProp extends Prop {

    function __construct( $key, $value, $specs ) {
        parent::__construct( $key, $value, $specs );
    }

    public function _validate() {

        if( is_null($this->getValue()) || empty($this->getValue()) || ! is_array($this->getValue()) || count($this->getValue()) == 0 ) {

            if( ! is_null($this->getDefaultValue()) ) {
                return true;
            }

            $this->addError( 'Required' );
            return false;
        }

        $countValidItems = 0;
        $errorsRepeatableItem = [];

        foreach( $this->getValue() as $keyRepeatableValue => $repeatableValue ) {

            $specRepeatableValue = array_merge($this->getSpecs(), [
                'required' => false,
                'repeatable' => false
            ]);
            $repeatableValueInstance = new Prop($keyRepeatableValue, $repeatableValue, $specRepeatableValue );
            if( $repeatableValueInstance->isValid() ) {
                $countValidItems++;
            }
            else {
                $errorsRepeatableItem[ $repeatableValueInstance->getId() ] = $repeatableValueInstance->getErrors();
            }
        }

        if( count($errorsRepeatableItem) > 0 ) {
            $this->addError( $errorsRepeatableItem, 'items' );
        }

        if( $countValidItems < 3 ) {
            $this->addError( 'Required minimun 3 items' );
            return false;
        }

        return ( count($this->getErrors()) == 0 );
    }
}