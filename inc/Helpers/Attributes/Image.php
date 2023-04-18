<?php

namespace Abt\Helpers\Attributes;

use Abt\Singleton\Config;
use Abt\Types\Wordpress\Image as WpImage;

class Image {
    
    public static function format( &$attributes, $key_prop, $prop ) {
        
        if( isset($attributes[$key_prop]) && is_array($attributes[$key_prop]) ) {
            $data_image_to_render = [];

            $images = ( $prop['repeatable'] ) ? $attributes[$key_prop] : [ $attributes[$key_prop] ];
            foreach( $images as $key_image => $current_image ) {

                if( is_array($current_image) ) {

                    $imageObject = new WpImage();

                    // Get default image (desktop...)
                    $configMedia = Config::getInstance()->get_spec('media');
                    $defaultDevice = ( $configMedia && is_array($configMedia) && isset($configMedia['defaultMedia']) ) ? $configMedia['defaultMedia'] : 'desktop';
                    if( isset($current_image[$defaultDevice]) && is_array($current_image[$defaultDevice]) && isset($current_image[$defaultDevice]['id']) ) {
                        $imageObject->init($current_image[$defaultDevice]['id']);
                    }

                    // Stop if image is not valid
                    if( ! $imageObject->isValid() ) {
                        continue;
                    }

                    // Media images treatment
                    foreach( $current_image as $device => $current_image_device ) {
                        if( $device != $defaultDevice && is_array($current_image_device) && isset($current_image_device['id']) ) {
                            $imageObject->addMedia($current_image_device['id'], $device);
                        }
                    }

                    $data_image_to_render[$key_image] = $imageObject->getAttributes();
                }
            }

            $attributes[$key_prop] = ( $prop['repeatable'] || count($data_image_to_render) == 0 ) ? $data_image_to_render : $data_image_to_render[0];
            if( count($attributes[$key_prop]) == 0 ) {
                unset($attributes[$key_prop]);
            }
        }
    }

}