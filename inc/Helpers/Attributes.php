<?php

namespace Abt\Helpers;

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

class Attributes {
    
    /**
     * Loop on each attribute and format it if necessary
     * 
     */
    public static function formatting( $attributes, $component_spec, &$error = null ) {

        if( isset($component_spec['props']) && is_array($component_spec['props']) && count($component_spec['props']) > 0 ) {
            foreach( $component_spec['props'] as $key_prop => $prop ) {

                if( isset($attributes[$key_prop]) && ( ! isset($prop['repeatable']) || ! $prop['repeatable']) ) {
                    self::setDefaultValue( $attributes, $key_prop, $prop );
                }

                if( isset($prop['type']) ) {
                    
                    switch( $prop['type'] ) {
                        
                        case 'boolean':
                            Boolean::format( $attributes, $key_prop, $prop );
                            break;

                        case 'image':
                            Image::format( $attributes, $key_prop, $prop );
                            break;

                        case 'gallery':
                            Gallery::format( $attributes, $key_prop, $prop );
                            break;
                        
                        case 'video':
                            Video::format( $attributes, $key_prop, $prop );
                            break;

                        case 'file':
                            File::format( $attributes, $key_prop, $prop );
                            break;

                        case 'relation':
                            Relation::format( $attributes, $key_prop, $prop, $component_spec['id'] );
                            break;

                        case 'object':
                            RecursiveObject::format( $attributes, $key_prop, $prop );
                            break;

                        case 'link':
                            Link::format( $attributes, $key_prop, $prop );
                            break;

                        case 'date':
                            Date::format( $attributes, $key_prop, $prop );
                            break;

                        case 'wysiwyg':
                            Wysiwyg::format( $attributes, $key_prop, $prop );
                            break;
                    }
                }

                if( isset($prop['required']) && $prop['required'] && ( ! isset($attributes[$key_prop]) || ! $attributes[$key_prop] || empty($attributes[$key_prop]) ) ) {
                    if( ! is_array($error) ) {
                        $error = [];
                    }

                    $error[$key_prop] = 'Required field';
                }
            }
        }

        return $attributes;
    }



    /**
     * Formatting attributes to responsive if needed
     * 
     */
    public static function responsive( &$attributes, $prop ) {

         if( isset($prop['responsive']) && $prop['responsive'] ) {
            $attributes = [ 'media' =>  $attributes ];
        }
    }



    /**
     * Set default value if no value defined
     * 
     */
    public static function setDefaultValue( &$attributes, $key_prop, $prop ) {

        if( isset($prop['props']) && is_array($prop['props']) ) {

            foreach( $prop['props'] as $key => $value ) {

                if( is_array($value) && isset($value['default']) && ( ! isset($attributes[$key_prop][$key]) || $attributes[$key_prop][$key] == '' || $attributes[$key_prop][$key] == null || $attributes[$key_prop][$key] == 'null' ) ) {

                    $attributes[$key_prop][$key] = $value['default'];
                }
            }
        }
        else {
            if( is_array($prop) && isset($prop['default']) && ( ! isset($attributes[$key_prop]) || $attributes[$key_prop] == '' || $attributes[$key_prop] == null || $attributes[$key_prop] == 'null' ) ) {

                $attributes[$key_prop] = $prop['default'];
            }
        }
    }

}