import { useSelect } from '@wordpress/data';
import { createRoot } from '@wordpress/element';
import '../css/admin/_index.scss';
import OEditorApp from './Components/OEditorApp';
import { OContext } from './Context/OContext';
import './Blocks/component-block-master';
// import './Blocks/layout/wpe-column/index';
import './Blocks/layout/wpe-container/index';
// import './Blocks/layout/wpe-gallery/index';
// import './Blocks/layout/wpe-grid/index';
// import './Blocks/layout/wpe-slide/index';
// import './Blocks/layout/wpe-slider/index';

window.addEventListener('load', function () {
    setTimeout(() => {
        if (document.querySelector('body.post-type-page')) {
            oEditorRun();
        } else {
            _hideEditorLoadingZone();
        }
    });
});

function oEditorRun() {
    // move wp ui elements
    _moveWpUiElements();

    // init theme
    _initTheme();

    // add the scoping class "o-editor"
    const $editorContainer = document.querySelector(
        '.interface-interface-skeleton__content',
    );
    if ($editorContainer) {
        document.querySelector('body').classList?.add?.('o-editor-enabled');

        $editorContainer.classList?.add?.('o-editor');
        $editorContainer.classList?.add?.('init');

        // create the container for our app
        const $editorApp = document.createElement('div');
        $editorApp.classList.add('o-editor-container');
        $editorContainer.appendChild($editorApp);

        const root = createRoot($editorApp);
        root.render(<OEditor />);
    }

    /**
     * Move some elements of the Wordpress UI
     */
    function _moveWpUiElements() {
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
    function _initTheme() {
        if (
            GLOBAL_LOCALIZED?.editor?.backgroundColor &&
            GLOBAL_LOCALIZED.editor.backgroundColor != null
        ) {
            document.documentElement.style.setProperty(
                '--abt-background-editor',
                GLOBAL_LOCALIZED.editor.backgroundColor,
            );
        }
    }
}
function OEditor() {
    const { selectedBlockClientId } = useSelect((select) => {
        return {
            selectedBlockClientId:
                select('core/block-editor').getSelectedBlockClientId(),
        };
    });

    return (
        <OContext clientId={selectedBlockClientId}>
            <OEditorApp />
        </OContext>
    );
}

function _hideEditorLoadingZone() {
    const $loadingZone = document.querySelector('.o-editor-loading-zone');
    if (!$loadingZone) {
        return;
    }
    $loadingZone.classList.add('hide');
    setTimeout(() => {
        $loadingZone.classList.add('close');
        setTimeout(() => {
            // $loadingZone.remove();
            $loadingZone.classList.add('removed');
        }, 500);
    }, 1000);
}
