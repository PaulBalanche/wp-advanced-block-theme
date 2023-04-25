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

class SimpleProp {
    
    private $key,
            $value,
            $specs = [],
            $required = false,
            $type = null,
            $default = null,
            $isValid = false,
            $errorMessage = null,
            $subPropsStatus = [];

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
        $this->required = ( isset($specs['required']) && $specs['required'] );
        $this->type = ( isset($specs['type']) ) ? trim( strtolower( $specs['type'] ) ) : null;
        $this->default = ( isset($specs['default']) ) ? $specs['default'] : null;
    }

    public function getDefaultValue() {
        return $this->default;
    }

    public function isRequired() {
        return ( $this->required );
    }

    public function getType() {
        return $this->type;
    }

    public function isValid() {
        return ( $this->isValid );
    }

    public function _validate() {

        if( is_null($this->getValue()) || empty($this->getValue()) ) {

            if( ! is_null($this->getDefaultValue()) ) {
                return true;
            }

            return $this->falseWithError( 'Required' );
        }

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

    public function format() {

        if( is_null($this->getValue()) || empty($this->getValue()) ) {
            return $this->getDefaultValue();
        }

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

    public function falseWithError( $error ) {

        $this->errorMessage = $error;
        return false;
    }

    public function addSubPropStatus( $subPropInstance ) {

        $subPropsStatus = $subPropInstance->getStatus();
        if( ! is_null($subPropsStatus) ) {
            $this->subPropsStatus[ $subPropInstance->getId() ] = $subPropsStatus;
        }
    }

    public function getStatus( ) {
        
        $status = [];

        if( ! is_null($this->errorMessage) ) {
            $status[ ( $this->isRequired() ) ? 'error' : 'warning' ] = $this->errorMessage;
        }

        if( count($this->subPropsStatus) > 0 ) {
            $status['props'] = $this->subPropsStatus;
            
            if( ! isset($status[ ( $this->isRequired() ) ? 'error' : 'warning' ]) ) {
                $status[ ( $this->isRequired() ) ? 'error' : 'warning' ] = true;
            }
        }

        return ( count($status) > 0 ) ? $status : null;
    }

}