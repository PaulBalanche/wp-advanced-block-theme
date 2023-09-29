import { Button, Dashicon } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { OEditorBlock } from './OEditorBlock';
import { OEditorInspector } from './OEditorInspector';
import __OEditorSettings from './OEditorSettings';
import __OEditorWelcome from './OEditorWelcome';
import { useContext } from 'react';

import globalData from '../global';

import ODevices from './ODevices';
import OModal from './OModal';
import OUserPreferences from './OUserPreferences';

export default function OEditorApp({ context }) {
    const [route, setRoute] = useState(null);
    const [needToBeMounted, setNeedToBeMounted] = useState(true);
    const [isOpen, setIsOpen] = useState(true);

    // get the actual edit app dom node
    const _$editApp = document.querySelector('.o-editor');
    const _$editAppContainer = document.querySelector('.o-editor-container');

    if (GLOBAL_LOCALIZED?.editor?.style) {
        _$editApp.classList.add(GLOBAL_LOCALIZED.editor.style);
    }

    // _$editApp.addEventListener('scroll', (event) => {});

    useEffect(() => {
        if (context.editorMode == 'visual' && needToBeMounted) {
            _mount();
        }
    }, []);

    function _mount() {
        // Route the Editor App related to anchor
        _routing();

        _hideEditorLoadingZone();
        _showEditorApp();

        setNeedToBeMounted(false);
    }

    function _unmount() {
        _showEditorLoadingZone();
        _hideEditorApp();

        setNeedToBeMounted(true);
    }

    useEffect(() => {
        if (context.editorMode == 'visual') {
            if (needToBeMounted) {
                _mount();
            }

            // Force first of reusable block selection
            // if (context.selectedBlockClientId != null) {
            //     for (var i in context.blocksList) {
            //         if (
            //             context.blocksList[i].clientId ==
            //                 context.selectedBlockClientId &&
            //             typeof context.blocksList[i].isReusable !=
            //                 'undefined' &&
            //             context.blocksList[i].isReusable &&
            //             typeof context.blocksList[i].children != 'undefined' &&
            //             context.blocksList[i].children.length > 0
            //         ) {
            //             context.selectBlock(
            //                 context.blocksList[i].children[0].clientId,
            //             );
            //         }
            //     }
            // }
        } else if (!needToBeMounted) {
            _unmount();
        }
    }, [needToBeMounted]);

    function _showEditorLoadingZone() {
        const $loadingZone = document.querySelector('.o-editor-loading-zone');
        if (!$loadingZone) {
            return;
        }
        $loadingZone.classList.remove('hide');
        $loadingZone.classList.remove('close');
        $loadingZone.classList.remove('removed');
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

    function _showEditorApp() {
        setTimeout(() => {
            _$editAppContainer.classList.add('show');
        }, 1200);
    }

    function _hideEditorApp() {
        _$editAppContainer.classList.remove('show');
    }

    function _routing() {
        if (document.location.hash === '#settings') {
            setRoute('settings');
        } else if (document.location.hash === '#help') {
            setRoute('help');
        } else {
            const anchorDetection =
                document.location.hash?.match(/^#([a-zA-Z0-9-]+)/);
            if (anchorDetection != null) {
                context.selectBlock(anchorDetection[1]);
            }
        }
    }

    function routeTo(route) {
        clean();
        setRoute(route);
        document.location.hash = route;
    }

    function goInspector() {
        clean();
        setRoute(null);
    }

    function clean() {
        if (context.selectedBlockClientId != undefined) {
            context.resetSelection(
                context.selectedBlockClientId,
                context.selectedBlockClientId,
                -1,
            );
        }
    }

    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }

    function renderBreadcrumb() {
        return route != null || context.selectedBlockClientId != undefined ? (
            <li className="breadcrumb-home">
                <Button
                    key={'breadcrumb-home'}
                    className="breadcrumb path-element"
                    onMouseDown={() => {
                        goInspector();
                    }}
                >
                    <Dashicon icon="screenoptions" /> All blocks
                </Button>
            </li>
        ) : null;
    }

    function renderFooterBreadcrumb() {
        return route != null || context.selectedBlockClientId != undefined ? (
            <li>
                <Button
                    key={'breadcrumb-home'}
                    variant="link"
                    onMouseDown={() => {
                        goInspector();
                    }}
                >
                    All blocks
                </Button>
            </li>
        ) : null;
    }

    if (context.editorMode != 'visual') return null;

    switch (route) {
        case 'settings':
            var componentToRender = new __OEditorSettings();
            var extraClassName = 'settings';
            break;
        case 'help':
            var componentToRender = new __OEditorWelcome();
            var extraClassName = 'help';
            break;
        default:
            var componentToRender =
                context.selectedBlockClientId != undefined ? (
                    <OEditorBlock
                        clientId={context.selectedBlockClientId}
                        isOpen={isOpen}
                        breadcrumb={renderBreadcrumb()}
                    />
                ) : (
                    <OEditorInspector
                        isOpen={isOpen}
                        breadcrumb={renderBreadcrumb()}
                        blocksList={context.blocksList}
                        selectBlock={context.selectBlock}
                    />
                );

            var extraClassName =
                context.selectedBlockClientId != undefined
                    ? 'block'
                    : 'inspector';
    }

    return (
        <>
            <ODevices />
            <section
                key="o-editor-app"
                className={`o-editor-app ${extraClassName}`}
                onMouseEnter={() => {
                    open();
                }}
            >
                {componentToRender}
            </section>
            <OUserPreferences />
            <OModal />
        </>
    );
}
