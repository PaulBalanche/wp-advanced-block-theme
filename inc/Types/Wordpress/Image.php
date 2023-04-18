<?php

namespace Abt\Types\Wordpress;

use Abt\Types\Image as ImageBase;

class Image extends ImageBase {

    public function init( $attachment_id ) {

        $attachment = get_post( $attachment_id );

        if ( ! $attachment ) {
            return;
        }

        if ( 'attachment' !== $attachment->post_type ) {
            return;
        }

        $this->setUrl( wp_get_attachment_url($attachment->ID) );
        $this->setAlt( trim( strip_tags( get_post_meta( $attachment->ID, '_wp_attachment_image_alt', true ) ) ) );
        $this->setTitle(trim( strip_tags( $attachment->post_title ) ));
    }

    public function addMedia( $attachment_id, $device ) {

        $attachment = get_post( $attachment_id );

        if ( ! $attachment ) {
            return;
        }

        if ( 'attachment' !== $attachment->post_type ) {
            return;
        }

        $this->setUrl( wp_get_attachment_url($attachment->ID), $device );
    }

}