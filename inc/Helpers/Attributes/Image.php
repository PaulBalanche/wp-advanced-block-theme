<?php

namespace Abt\Helpers\Attributes;

use Abt\Singleton\Config;
use Abt\Types\Wordpress\Image as WpImage;

class Image extends Base {

    public static function isValid( &$propInstance ) {

        $value = $propInstance->getValue();
        if( is_array($value) ) {

            $imageObject = new WpImage();

            // Get default image (desktop...)
            $configMedia = Config::getInstance()->get_spec('media');
            $defaultDevice = ( $configMedia && is_array($configMedia) && isset($configMedia['defaultMedia']) ) ? $configMedia['defaultMedia'] : 'desktop';
            if( isset($value[$defaultDevice]) ) {
                $imageObject->init($value[$defaultDevice]);
            }

            // Media images treatment
            foreach( $value as $device => $image_device ) {
                if( $device != $defaultDevice ) {
                    $imageObject->addMedia($image_device, $device);
                }
            }

            if( $imageObject->isValid() ) {
                return true;
            }
            else{

                // $media = $imageObject->getMedia();
                // if( is_array($media) && count($media) > 0 ) {
                //     $errorMessage = [];
                //     foreach($media as $device => $url) {
                //         $errorMessage[] = $device;
                //     }

                //     $errorMessage = 'Image is define for ' . implode(', ', $errorMessage) . ' but missing for default device (' . $defaultDevice . ')';
                // }

                return $propInstance->falseWithError( 'Image missing for default device (' . $defaultDevice . ')' );
            }
        }

        return $propInstance->falseWithError( 'Required' );
    }
    
    public static function format( &$propInstance ) {

        $value = $propInstance->getValue();
        if( is_array($value) ) {

            $imageObject = new WpImage();

            // Get default image (desktop...)
            $configMedia = Config::getInstance()->get_spec('media');
            $defaultDevice = ( $configMedia && is_array($configMedia) && isset($configMedia['defaultMedia']) ) ? $configMedia['defaultMedia'] : 'desktop';
            if( isset($value[$defaultDevice]) ) {
                $imageObject->init($value[$defaultDevice]);
            }

            // Media images treatment
            foreach( $value as $device => $image_device ) {
                if( $device != $defaultDevice ) {
                    $imageObject->addMedia($image_device, $device);
                }
            }

            if( $imageObject->isValid() ) {
                return $imageObject->getAttributes();
            }
        }

        return null;
    }
}