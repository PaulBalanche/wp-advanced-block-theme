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

            if( ! is_null($this->getDefaultValue()) ) {
                return true;
            }

            $this->addError( 'Required' );
            return false;
        }

        $countValidItems = 0;
        foreach( $this->getValue() as $keyRepeatableValue => $repeatableValue ) {

            $SimplePropInstance = new SimpleProp($keyRepeatableValue, $repeatableValue, $this->getSpecs() );
            if( ! $SimplePropInstance->isValid() ) {
                $this->addError( $SimplePropInstance->getErrors(), $SimplePropInstance->getId() );
            }
            else {
                $countValidItems++;
            }
        }

        if( $countValidItems < $this->getRequiredValidItems() ) {

            $this->addError( sprintf( _n( 'Required minimun %s item', 'Required minimun %s items', $this->getRequiredValidItems(), ABT_PLUGIN_TEXTDOMAIN ), number_format_i18n( $this->getRequiredValidItems() ) ) );
            return false;
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