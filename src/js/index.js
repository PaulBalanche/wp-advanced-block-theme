import '../css/admin/_index.scss'

import componentBlockMaster     from '../../blocks/component-block-master/src/index'
import layoutColumn             from '../../blocks/layout/wpe-column/src/index'
import layoutContainer          from '../../blocks/layout/wpe-container/src/index'
import layoutGallery            from '../../blocks/layout/wpe-gallery/src/index'
import layoutGrid               from '../../blocks/layout/wpe-grid/src/index'
import layoutSlide              from '../../blocks/layout/wpe-slide/src/index'
import layoutSlider             from '../../blocks/layout/wpe-slider/src/index'

class OEditor {

    constructor() {

        // move wp ui elements
        this._moveWpUiElements();

        // init theme (Coffeekraken)
        this._initTheme();

        // add the scoping class "o-editor"
        setTimeout(() => {
            document.querySelector('.edit-post-visual-editor')?.classList?.add?.('o-editor');
        });

    }

    /**
     * Move some elements of the wordpress UI
     */
    _moveWpUiElements() {
        let postTitle = document.querySelector('.edit-post-visual-editor__post-title-wrapper');
        let headerToolbar = document.querySelector('.edit-post-header__toolbar > .edit-post-header-toolbar');
        headerToolbar?.after?.(postTitle);
    }

    /**
     * Just add the theme background color from the frontspec if needed
     */
    _initTheme() {
        if( theme_spec?.metas?.backgroundColor ) {
            document.documentElement.style.setProperty('--abt-background-editor', theme_spec.metas.backgroundColor);
        }
    }


}

window.addEventListener('load', function () {
    new OEditor();
});

