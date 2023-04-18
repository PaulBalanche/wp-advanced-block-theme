<?php

namespace Abt\Types;

class Image {

    private $url,
        $alt,
        $title,
        $media = [];

    function __construct( $data = [] ) {

        if( is_array($data) ) {

            if( isset($args['url']) ) {
                $this->setUrl($args['url']);
            }
            if( isset($args['src']) ) {
                $this->setUrl($args['src']);
            }
            if( isset($args['alt']) ) {
                $this->setAlt($args['alt']);
            }
            if( isset($args['title']) ) {
                $this->setTitle($args['title']);
            }
        }
    }

    public function getUrl() {

        return $this->url;
    }
    
    public function setUrl($url, $device = null) {

        if( is_null($device) ) {
            $this->url = $url;
        }
        else {
            $this->media[$device] = $url;
        }
    }

    public function getAlt() {

        return $this->alt;
    }

    public function setAlt($alt) {

        $this->alt = $alt;
    }

    public function getTitle() {

        return $this->title;
    }

    public function setTitle($title) {

        $this->title = $title;
    }

    public function getMedia() {

        $media = [];
        foreach( $this->media as $device => $url ) {
            $media[$device] = [
                'url' => $url
            ];
        }
        return $media;
    }

    public function isValid() {

        return ( ! empty($this->getUrl()) );
    }

    public function getAttributes() {
        
        return [
            'url' => $this->getUrl(),
            'alt' => $this->getAlt(),
            'title' => $this->getTitle(),
            'media' => $this->getMedia()
        ];
    }

}