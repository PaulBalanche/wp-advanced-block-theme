import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';
import { createRoot } from '@wordpress/element';

import { store as blockEditorStore } from '@wordpress/block-editor';

import '../css/admin/_index.scss';

import OEditorApp from './Components/OEditorApp';

import './Blocks/component-block-master/index';
import './Blocks/layout/wpe-column/index';
import './Blocks/layout/wpe-container/index';
import './Blocks/layout/wpe-gallery/index';
import './Blocks/layout/wpe-grid/index';
import './Blocks/layout/wpe-slide/index';
import './Blocks/layout/wpe-slider/index';

class OEditor {
    constructor() {
        // move wp ui elements
        this._moveWpUiElements();

        // init theme (Coffeekraken)
        this._initTheme();

        // add the scoping class "o-editor"
        const $editorContainer = document.querySelector(
            '.interface-interface-skeleton__content',
        );
        if ($editorContainer) {
            $editorContainer.classList?.add?.('o-editor');
            $editorContainer.classList?.add?.('init');

            // create the container for our app
            const $editorApp = document.createElement('div');
            $editorApp.classList.add('o-editor-container');
            $editorContainer.appendChild($editorApp);

            const root = createRoot($editorApp);
            root.render(<OEditorAppContext />);
        }
    }

    /**
     * Move some elements of the wordpress UI
     */
    _moveWpUiElements() {
        let postTitle = document.querySelector(
            '.edit-post-visual-editor__post-title-wrapper',
        );
        let headerToolbar = document.querySelector(
            '.edit-post-header__toolbar > .edit-post-header-toolbar',
        );
        headerToolbar?.after?.(postTitle);
    }

    /**
     * Just add the theme background color from the frontspec if needed
     */
    _initTheme() {
        if (theme_spec?.metas?.backgroundColor) {
            document.documentElement.style.setProperty(
                '--abt-background-editor',
                theme_spec.metas.backgroundColor,
            );
        }
    }
}

function OEditorAppDisplay(props) {
    return <OEditorApp context={props} />;
}

const OEditorAppContext = compose([
    withSelect((select) => {
        const blocksList = select('core/block-editor').getBlocks();
        for (var i in blocksList) {
            if (
                blocksList[i].name == 'core/block' &&
                typeof blocksList[i].attributes.ref != 'undefined' &&
                blocksList[i].innerBlocks == 0
            ) {
                let wpReusableBlock = select('core').getEntityRecord(
                    'postType',
                    'wp_block',
                    blocksList[i].attributes.ref,
                );
                if (typeof wpReusableBlock != 'undefined') {
                    blocksList[i].postName = wpReusableBlock.title.raw;
                }

                let childrenBlocksList = select('core/block-editor').getBlocks(
                    blocksList[i].clientId,
                );
                if (childrenBlocksList.length > 0) {
                    blocksList[i].isReusable = true;
                    blocksList[i].children = childrenBlocksList;
                }
            }
        }
        const selectedBlockClientId =
            select('core/block-editor').getSelectedBlockClientId();

        const editorMode = select('core/edit-post').getEditorMode();

        return {
            blocksList,
            selectedBlockClientId,
            editorMode,
        };
    }),
    withDispatch((dispatch) => {
        const { selectBlock, resetSelection } = dispatch(blockEditorStore);

        return {
            selectBlock,
            resetSelection,
        };
    }),
])(OEditorAppDisplay);

window.addEventListener('load', function () {
    setTimeout(() => {
        new OEditor();
    });
});
