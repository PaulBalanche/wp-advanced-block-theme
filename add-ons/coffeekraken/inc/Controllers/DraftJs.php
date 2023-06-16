<?php

namespace Abt\Coffeekraken\Controllers;

use Abt\Controllers\ControllerBase;

class DraftJs extends ControllerBase
{
    public function __construct()
    {
        parent::__construct();

        $this->add_filters();
    }

    /**
     * Add Wordpress filters
     *
     */
    public function add_filters()
    {
        add_filter( "Abt\draftjstohtml_renderContent", [ $this, "defineTypoView" ] );
    }

    public function defineTypoView( $view ) {

        $view = 'sugar/bare/typo/typo.twig';

        return $view;
    }

}