<?php

namespace Abt\Models;

use Abt\Helpers\Attributes\Base;
use Abt\Helpers\Attributes\Boolean;
use Abt\Helpers\Attributes\Image;
use Abt\Helpers\Attributes\Gallery;
use Abt\Helpers\Attributes\Video;
use Abt\Helpers\Attributes\File;
use Abt\Helpers\Attributes\Relation;
use Abt\Helpers\Attributes\RecursiveObject;
use Abt\Helpers\Attributes\Link;
use Abt\Helpers\Attributes\Date;
use Abt\Helpers\Attributes\Wysiwyg;

class Prop {
    
    private $key,
            $value,
            $specs = [],
            $type = null,
            $required = false,
            $repeatable = false,
            $responsive = false,
            $default = null,
            $errors = [],
            $isValid = false;

    function __construct( $key, $value, $specs ) {
        $this->key = $key;
        $this->value = $value;

        $this->_initSpecs($specs);
        $this->isValid = $this->_validate();
    }

    public function getId() {
        return $this->key;
    }

    public function getValue() {
        return $this->value;
    }

    public function getSpecs() {
        return $this->specs;
    }

    public function _initSpecs( $specs ) {

        $this->specs = ( is_array($specs) ) ? $specs : [];
        $this->type = ( isset($specs['type']) ) ? trim( strtolower( $specs['type'] ) ) : null;
        $this->required = ( isset($specs['required']) && $specs['required'] );
        $this->repeatable = ( isset($specs['repeatable']) && $specs['repeatable'] );
        $this->responsive = ( isset($specs['responsive']) && $specs['responsive'] );
        $this->default = ( isset($specs['default']) ) ? $specs['default'] : null;
    }

    public function getDefaultValue() {
        return $this->default;
    }

    public function getType() {
        return $this->type;
    }

    public function format() {

        if( is_null($this->getValue()) || empty($this->getValue()) ) {
            return $this->getDefaultValue();
        }

        if( $this->isRepeatable() ) {

            if( is_array($this->getValue()) && count($this->getValue()) > 0 ) {
            
                $valueFormatted = [];
                foreach( $this->getValue() as $key_repeatableValue => $repeatableValue ) {

                    $repeatableValueInstance = new Prop($key_repeatableValue, $repeatableValue, array_merge($this->getSpecs(), ['repeatable' => false]) );
                    if( $repeatableValueInstance->isValid() ) {
                        $valueFormatted[$key_repeatableValue] = $repeatableValueInstance->format();
                    }
                }

                return $valueFormatted;
            }
            else {
                return null;
            }
        }
        else {

            switch( $this->getType() ) {
                            
                case 'boolean':
                    return Boolean::format( $this );

                case 'image':
                    return Image::format( $this );

                case 'gallery':
                    return Gallery::format( $this );

                case 'video':
                    return Video::format( $this );

                case 'file':
                    return File::format( $this );

                case 'relation':
                    return Relation::format( $this );

                case 'object':
                    return RecursiveObject::format( $this );

                case 'link':
                    return Link::format( $this );

                case 'date':
                    return Date::format( $this );

                case 'wysiwyg':
                case 'richText':
                    return Wysiwyg::format( $this );

                default:
                    return Base::format( $this );
            }
        }
    }

    public function _validate() {

        if( is_null($this->getValue()) || empty($this->getValue()) ) {

            if( ! is_null($this->getDefaultValue()) ) {
                return true;
            }

            $this->addError( 'Required' );
            return false;
        }

        if( $this->isRepeatable() ) {
            
            if( is_array($this->getValue()) && count($this->getValue()) > 0 ) {
            
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
            else {
                $this->addError( 'Required' );
                return false;
            }
        }
        else {

            switch( $this->getType() ) {
                            
                case 'boolean':
                    return Boolean::isValid( $this );

                case 'image':
                    return Image::isValid( $this );

                case 'gallery':
                    return Gallery::isValid( $this );

                case 'video':
                    return Video::isValid( $this );

                case 'file':
                    return File::isValid( $this );

                case 'relation':
                    return Relation::isValid( $this );

                case 'object':
                    return RecursiveObject::isValid( $this );

                case 'link':
                    return Link::isValid( $this );

                case 'date':
                    return Date::isValid( $this );

                case 'wysiwyg':
                case 'richText':
                    return Wysiwyg::isValid( $this );

                default:
                    return Base::isValid( $this );
            }
        }
    }

    public function isValid() {
        return ( $this->isValid );
    }
    
    public function isRequired() {
        return ( $this->required );
    }
    
    public function isResponsive() {
        return ( $this->responsive );
    }
    
    public function isRepeatable() {
        return ( $this->repeatable );
    }

    public function addError( $error, $key = null ) {

        $key = ( is_null($key) ) ? 'root' : $key;

        if( $key == 'root' ) {

            if( ! isset($this->errors[$key]) || ! is_array($this->errors[$key]) ) {
                $this->errors[$key] = [];
            }

            $this->errors[$key][] = $error;

        }
        else {
            $this->errors[$key] = $error;
        }        
    }
    
    public function getErrors( ) {
        return $this->errors;
    }

//     public function responsive( &$attributes, $prop ) {

//         if( $this->isResponsive() ) {
//            $this->value = [ 'media' =>  $this->value ];
//        }
//    }
}