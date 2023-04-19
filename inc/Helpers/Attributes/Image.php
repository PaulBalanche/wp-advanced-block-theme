<?php

namespace Abt\Helpers\Attributes;

use Abt\Singleton\Config;
use Abt\Types\Wordpress\Image as WpImage;

class Image {
    
    public static function format( &$attributes, $key_prop, $prop, &$error = null ) {

        if( isset($attributes[$key_prop]) && is_array($attributes[$key_prop]) ) {

            if( is_array($attributes[$key_prop]) ) {

                $imageObject = new WpImage();

                // Get default image (desktop...)
                $configMedia = Config::getInstance()->get_spec('media');
                $defaultDevice = ( $configMedia && is_array($configMedia) && isset($configMedia['defaultMedia']) ) ? $configMedia['defaultMedia'] : 'desktop';
                if( isset($attributes[$key_prop][$defaultDevice]) && is_array($attributes[$key_prop][$defaultDevice]) && isset($attributes[$key_prop][$defaultDevice]['id']) ) {
                    $imageObject->init($attributes[$key_prop][$defaultDevice]['id']);
                }

                // Media images treatment
                foreach( $attributes[$key_prop] as $device => $image_device ) {
                    if( $device != $defaultDevice && is_array($image_device) && isset($image_device['id']) ) {
                        $imageObject->addMedia($image_device['id'], $device);
                    }
                }

                // Stop if image is not valid
                if( ! $imageObject->isValid() ) {

                    if( ! $prop['repeatable'] && isset($prop['required']) && $prop['required'] ) {

                        $errorMessage = '';
                        
                        $media = $imageObject->getMedia();
                        if( is_array($media) && count($media) > 0 ) {
                            $errorMessage = [];
                            foreach($media as $device => $url) {
                                $errorMessage[] = $device;
                            }

                            $errorMessage = 'Image is define for ' . implode(', ', $errorMessage) . ' but missing for default device (' . $defaultDevice . ')';
                        }
                        else {
                            $errorMessage = 'Required';
                        }
                        if( ! is_array($error) ) {
                            $error = [];
                        }

                        $error[$key_prop] = $errorMessage;
                    }

                    $attributes[$key_prop] = [];
                }
                else {
                    $attributes[$key_prop] = $imageObject->getAttributes();
                }
            }
        }
    }
}