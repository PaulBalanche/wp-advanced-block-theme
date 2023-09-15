<?php

namespace Abt\Models;

class RepeatableProp extends SimpleProp {

    private $requiredValidItems = 1;

    function __construct( $key, $value, $specs ) {
        parent::__construct( $key, $value, $specs );
    }

    public function getRequiredValidItems() {
        return $this->requiredValidItems;
    }

    public function _validate() {

        if( is_null($this->getValue()) || empty($this->getValue()) || ! is_array($this->getValue()) || count($this->getValue()) == 0 ) {

            if( ! $this->isRequired() || ! is_null($this->getDefaultValue()) ) {
                return true;
            }

            return $this->falseWithError( 'Required' );
        }

        $countValidItems = 0;
        foreach( $this->getValue() as $keyRepeatableValue => $repeatableValue ) {

            $SimplePropInstance = new SimpleProp($keyRepeatableValue, $repeatableValue, $this->getSpecs() );
            $this->addSubPropStatus( $SimplePropInstance );
            if( $SimplePropInstance->isValid() ) {
                $countValidItems++;
            }
        }

        if( $countValidItems < $this->getRequiredValidItems() ) {

            return $this->falseWithError( sprintf( _n( 'Required minimun %s item', 'Required minimun %s items', $this->getRequiredValidItems(), 'wp-abt' ), number_format_i18n( $this->getRequiredValidItems() ) ) );
        }
        
        return true;
    }


    public function format() {

        if( is_null($this->getValue()) || empty($this->getValue()) || ! is_array($this->getValue()) || count($this->getValue()) == 0 ) {
            return $this->getDefaultValue();
        }

        $valueFormatted = [];
        foreach( $this->getValue() as $key_repeatableValue => $repeatableValue ) {

            $SimplePropInstance = new SimpleProp($key_repeatableValue, $repeatableValue, $this->getSpecs() );
            if( $SimplePropInstance->isValid() ) {
                $valueFormatted[$key_repeatableValue] = $SimplePropInstance->format();
            }
        }

        return $valueFormatted;
    }

}