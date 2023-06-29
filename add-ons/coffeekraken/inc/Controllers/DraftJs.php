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
        add_filter( 'Abt\localize_editor_script', [ $this, 'localize_editor_script' ], 10, 3 );
    }

    public function defineTypoView( $view ) {

        $view = 'sugar/bare/typo/typo.twig';

        return $view;
    }

    public function localize_editor_script( $spec, $block, $js_variable ) {

        if( $js_variable == 'theme_spec' && isset($spec['theme']) && is_array($spec['theme']) && isset($spec['theme']['lnf']) && is_array($spec['theme']['lnf']) && isset($spec['theme']['lnf']['typo']) && is_array($spec['theme']['lnf']['typo']) ) {

            if( ! isset($spec['editor']) || ! is_array($spec['editor']) ) {
                $spec['editor'] = [ 'typo' => [] ];
            }
            else if( ! isset($spec['editor']['typo']) ) {
                $spec['editor']['typo'] = [];
            }

            $spec['editor']['typo'] = array_replace_recursive( $spec['editor']['typo'], $spec['theme']['lnf']['typo']);
        }

        return $spec;
    }

}