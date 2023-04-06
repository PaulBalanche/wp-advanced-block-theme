import * as __ReactDom from "react-dom";

import { compose } from "@wordpress/compose";
import { withDispatch, withSelect } from "@wordpress/data";

import { store as blockEditorStore } from "@wordpress/block-editor";

import "../css/admin/_index.scss";

import OEditorApp from "./components/OEditorApp";

import "../../blocks/component-block-master/src/index";
import "../../blocks/layout/wpe-column/src/index";
import "../../blocks/layout/wpe-container/src/index";
import "../../blocks/layout/wpe-gallery/src/index";
import "../../blocks/layout/wpe-grid/src/index";
import "../../blocks/layout/wpe-slide/src/index";
import "../../blocks/layout/wpe-slider/src/index";

class OEditor {
    constructor() {
        // move wp ui elements
        this._moveWpUiElements();

        // init theme (Coffeekraken)
        this._initTheme();

        // add the scoping class "o-editor"
        const $editorContainer = document.querySelector(
            ".interface-interface-skeleton__content"
        );
        if ($editorContainer) {

            $editorContainer.classList?.add?.("o-editor");

            // create the container for our app
            const $editorApp = document.createElement("div");
            $editorApp.classList.add("o-editor-container");
            $editorContainer.appendChild($editorApp);

            // render our app
            __ReactDom.render(<OEditorAppContext />, $editorApp);
        }
    }

    /**
     * Move some elements of the wordpress UI
     */
    _moveWpUiElements() {
        let postTitle = document.querySelector(
            ".edit-post-visual-editor__post-title-wrapper"
        );
        let headerToolbar = document.querySelector(
            ".edit-post-header__toolbar > .edit-post-header-toolbar"
        );
        headerToolbar?.after?.(postTitle);
    }

    /**
     * Just add the theme background color from the frontspec if needed
     */
    _initTheme() {
        if (theme_spec?.metas?.backgroundColor) {
            document.documentElement.style.setProperty(
                "--abt-background-editor",
                theme_spec.metas.backgroundColor
            );
        }
    }
}

function OEditorAppDisplay(props) {
    return <OEditorApp context={props} />;
}

const OEditorAppContext = compose([
    withSelect((select) => {
        const blocksList = select("core/block-editor").getBlocks();
        for (var i in blocksList) {
            if (
                blocksList[i].name == "core/block" &&
                typeof blocksList[i].attributes.ref != "undefined" &&
                blocksList[i].innerBlocks == 0
            ) {
                let wpReusableBlock = select("core").getEntityRecord(
                    "postType",
                    "wp_block",
                    blocksList[i].attributes.ref
                );
                if (typeof wpReusableBlock != "undefined") {
                    blocksList[i].postName = wpReusableBlock.title.raw;
                }

                let childrenBlocksList = select("core/block-editor").getBlocks(
                    blocksList[i].clientId
                );
                if (childrenBlocksList.length > 0) {
                    blocksList[i].isReusable = true;
                    blocksList[i].children = childrenBlocksList;
                }
            }
        }
        const selectedBlockClientId =
            select("core/block-editor").getSelectedBlockClientId();
        
        const editorMode =
            select("core/edit-post").getEditorMode();
        console.log(blocksList);
        // console.log( "isNavigationMode : " + select("core/block-editor").isNavigationMode() );

        return {
            blocksList,
            selectedBlockClientId,
            editorMode

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

window.addEventListener("load", function () {
    setTimeout(() => {
        new OEditor();
    });
});
