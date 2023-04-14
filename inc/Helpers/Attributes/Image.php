<?php

namespace Abt\Helpers\Attributes;

use Abt\Helpers\Attributes;
use Abt\Singleton\Config;

class Image {
    
    public static function format( &$attributes, $key_prop, $prop ) {
        
        if( isset($attributes[$key_prop]) && is_array($attributes[$key_prop]) ) {

            $data_image_to_render = [];

            $images = ( $prop['repeatable'] ) ? $attributes[$key_prop] : [ $attributes[$key_prop] ];
            foreach( $images as $key_image => $current_image ) {

                if( is_array($current_image) ) {

                    $configMedia = Config::getInstance()->get_spec('media');
                    $defaultDevice = ( $configMedia && is_array($configMedia) && isset($configMedia['defaultMedia']) ) ? $configMedia['defaultMedia'] : 'desktop';

                    if( isset($current_image[$defaultDevice]) && is_array($current_image[$defaultDevice]) && isset($current_image[$defaultDevice]['id']) ) {

                        $id_defaultImage = $current_image[$defaultDevice]['id'];
                        $image_size = ( isset($prop['image']) && is_array($prop['image']) && isset($prop['image']['image_size_identifier']) && is_array($prop['image']['image_size_identifier']) && isset($prop['image']['image_size_identifier']['default']) ) ? $prop['image']['image_size_identifier']['default'] : 'large';
                        $attachment_image_src = wp_get_attachment_image_src($id_defaultImage, $image_size);
                        if( is_array($attachment_image_src) ) {

                            $data_image_to_render[$key_image] = [];
                            $data_image_to_render[$key_image]['url'] = $attachment_image_src[0];
                            $data_image_to_render[$key_image]['alt'] = trim( strip_tags( get_post_meta( $id_defaultImage, '_wp_attachment_image_alt', true ) ) );
                            $data_image_to_render[$key_image]['title'] = trim( strip_tags( get_post_meta( $id_defaultImage, '_wp_attachment_image_alt', true ) ) );
                        }
                    }

                    if( isset($data_image_to_render[$key_image]['url']) ) {

                        foreach( $current_image as $device => $current_image_device ) {

                            if( $device != $defaultDevice && is_array($current_image_device) && isset($current_image_device['id']) ) {
    
                                if( ! isset($data_image_to_render[$key_image]['media']) ) {
                                    $data_image_to_render[$key_image]['media'] = [];
                                }

                                $attachment_image_src = wp_get_attachment_image_src($current_image_device['id'], 'full');
                                if( is_array($attachment_image_src) ) {
                                    $data_image_to_render[$key_image]['media'][$device] = $attachment_image_src[0];
                                }
                            }
                        }
                    }
                }
            }

            $attributes[$key_prop] = ( $prop['repeatable'] || count($data_image_to_render) == 0 ) ? $data_image_to_render : $data_image_to_render[0];
            Attributes::responsive( $attributes[$key_prop], $prop );
        }
    }

}