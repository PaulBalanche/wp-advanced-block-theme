import { Component, useEffect, useState } from '@wordpress/element';

import { Button, Dashicon } from '@wordpress/components';

import __OEditorBlock from './OEditorBlock';
import __OEditorInspector from './OEditorInspector';
import __OEditorSettings from './OEditorSettings';
import __OEditorWelcome from './OEditorWelcome';

import globalData from '../global';

import ODevices from './ODevices';
import OModal from './OModal';
import OUserPreferences from './OUserPreferences';

export default class OEditorApp extends Component {
    static _instance;
    static getInstance() {
        return this._instance;
    }

    static exists() {
        return typeof this._instance != 'undefined';
    }

    _$editApp;
    _$editAppContainer;

    constructor(props) {
        super(props);

        this.state = {
            route: null,
            needToBeMounted: true,
            currentDevice: null,
            isOpen: false,
            closeAllowed: false,
            timeOutAllowingToClose: null,
        };

        // @ts-ignore
        this.constructor._instance = this;

        // get the actual edit app dom node
        this._$editApp = document.querySelector('.o-editor');
        this._$editAppContainer = document.querySelector('.o-editor-container');

        if (GLOBAL_LOCALIZED?.editor?.style) {
            this._$editApp.classList.add(GLOBAL_LOCALIZED.editor.style);
        }

        this._$editApp.addEventListener('scroll', (event) => {
            if (this.state.closeAllowed) {
                this.close();
            }
        });
    }

    componentDidMount() {
        if (
            this.props.context.editorMode == 'visual' &&
            this.state.needToBeMounted
            // this.props.context.blocksList.length > 0
        ) {
            this._mount();
        }
    }

    setCurrentDevice(newDevice) {
        this.setState({ currentDevice: newDevice });
    }

    _mount() {
        // Route the Editor App related to anchor
        this._routing();

        this._hideEditorLoadingZone();
        this._showEditorApp();

        this.setState({ needToBeMounted: false });
    }

    _unmount() {
        this._showEditorLoadingZone();
        this._hideEditorApp();

        this.setState({ needToBeMounted: true });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.context.editorMode == 'visual') {
            if (
                this.state.needToBeMounted &&
                this.props.context.blocksList.length > 0
            ) {
                this._mount();
            }

            for (var i in globalData.componentInstances) {
                globalData.componentInstances[i].forceUpdate();
            }

            // Force first of reusable block selection
            if (this.props.context.selectedBlockClientId != null) {
                for (var i in this.props.context.blocksList) {
                    if (
                        this.props.context.blocksList[i].clientId ==
                            this.props.context.selectedBlockClientId &&
                        typeof this.props.context.blocksList[i].isReusable !=
                            'undefined' &&
                        this.props.context.blocksList[i].isReusable &&
                        typeof this.props.context.blocksList[i].children !=
                            'undefined' &&
                        this.props.context.blocksList[i].children.length > 0
                    ) {
                        this.props.context.selectBlock(
                            this.props.context.blocksList[i].children[0]
                                .clientId,
                        );
                    }
                }
            }
        } else if (!this.state.needToBeMounted) {
            this._unmount();
        }
    }

    _showEditorLoadingZone() {
        const $loadingZone = document.querySelector('.o-editor-loading-zone');
        if (!$loadingZone) {
            return;
        }
        $loadingZone.classList.remove('hide');
        $loadingZone.classList.remove('close');
        $loadingZone.classList.remove('removed');
    }

    _hideEditorLoadingZone() {
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

    _showEditorApp() {
        setTimeout(() => {
            this._$editAppContainer.classList.add('show');
        }, 1200);
    }

    _hideEditorApp() {
        this._$editAppContainer.classList.remove('show');
    }

    _routing() {
        if (document.location.hash === '#settings') {
            this.setState({ route: 'settings' });
        } else if (document.location.hash === '#help') {
            this.setState({ route: 'help' });
        } else {
            const anchorDetection =
                document.location.hash?.match(/^#([a-zA-Z0-9-]+)/);
            if (anchorDetection != null) {
                const clientIdRequested = anchorDetection[1];

                for (var i in globalData.componentInstances) {
                    if (
                        globalData.componentInstances[i].getId() ==
                        clientIdRequested
                    ) {
                        this.forceSelectComponent(
                            globalData.componentInstances[i],
                        );
                        break;
                    }
                }
            }
        }
    }

    routeTo(route) {
        this.clean();
        this.setState({ route: route });
        document.location.hash = route;
    }

    goInspector() {
        this.clean();
        this.setState({ route: null });
    }

    isBlockEdited(clientId) {
        if (this.state.route != null) {
            return false;
        }

        if (this.props.context.selectedBlockClientId == undefined) {
            return false;
        }

        if (this.props.context.selectedBlockClientId != clientId) {
            return false;
        }

        return true;
    }

    forceSelectComponent(component: any): void {
        // If clientId given, get the block instance related
        if (typeof component == 'string') {
            for (var i in globalData.componentInstances) {
                if (
                    globalData.componentInstances[i].props.clientId == component
                ) {
                    component = globalData.componentInstances[i];
                    break;
                }
            }
        }

        if (typeof component == 'string') {
            return;
        }

        this.props.context.selectBlock(component.props.clientId);
    }

    refreshScroll() {
        if (this.props.context.selectedBlockClientId != undefined) {
            document
                .querySelector(
                    '#block-' + this.props.context.selectedBlockClientId,
                )
                ?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
        }
    }

    clean() {
        if (this.props.context.selectedBlockClientId != undefined) {
            this.props.context.resetSelection(
                this.props.context.selectedBlockClientId,
                this.props.context.selectedBlockClientId,
                -1,
            );
        }
    }

    open(closeAllowed = true) {
        clearTimeout(this.state.timeOutAllowingToClose);
        this.setState({ isOpen: true, closeAllowed: false });

        if (closeAllowed) {
            let timeOutAllowingToClose = setTimeout(() => {
                this.allowToClose();
            }, 1000);
            this.setState({ timeOutAllowingToClose: timeOutAllowingToClose });
        }
    }

    allowToClose() {
        this.setState({ closeAllowed: true });
    }

    close() {
        this.setState({ isOpen: false, closeAllowed: false });
    }

    renderBreadcrumb() {
        return this.state.route != null ||
            (this.props.context.selectedBlockClientId != undefined &&
                typeof globalData.componentInstances[
                    this.props.context.selectedBlockClientId
                ] != 'undefined') ? (
            <li className="breadcrumb-home">
                <Button
                    key={'breadcrumb-home'}
                    className="breadcrumb path-element"
                    onMouseDown={() => this.goInspector()}
                >
                    <Dashicon icon="screenoptions" /> All blocks
                </Button>
            </li>
        ) : null;
    }

    renderFooterBreadcrumb() {
        return this.state.route != null ||
            (this.props.context.selectedBlockClientId != undefined &&
                typeof globalData.componentInstances[
                    this.props.context.selectedBlockClientId
                ] != 'undefined') ? (
            <li>
                <Button
                    key={'breadcrumb-home'}
                    variant="link"
                    onMouseDown={() => this.goInspector()}
                >
                    All blocks
                </Button>
            </li>
        ) : null;
    }

    render() {
        if (this.props.context.editorMode != 'visual') return null;

        switch (this.state.route) {
            case 'settings':
                var componentToRender = new __OEditorSettings();
                break;
            case 'help':
                var componentToRender = new __OEditorWelcome();
                break;
            default:
                var componentToRender =
                    this.props.context.selectedBlockClientId != undefined &&
                    typeof globalData.componentInstances[
                        this.props.context.selectedBlockClientId
                    ] != 'undefined' &&
                    globalData.componentInstances[
                        this.props.context.selectedBlockClientId
                    ].isEditable()
                        ? new __OEditorBlock(
                              globalData.componentInstances[
                                  this.props.context.selectedBlockClientId
                              ],
                          )
                        : new __OEditorInspector(
                              this.props.context.blocksList,
                              this.props.context.selectBlock,
                          );
        }
        return (
            <>
                <ODevices />
                <section
                    key="o-editor-app"
                    className={`o-editor-app ${componentToRender?.getExtraClassName?.()}`}
                >
                    {componentToRender?.renderTitle && (
                        <EditorAppHeader
                            isOpen={this.state.isOpen}
                            openMarker={componentToRender?.getOpenMarker?.()}
                        >
                            <nav>
                                <ol>
                                    {this.renderBreadcrumb()}
                                    {componentToRender.renderTitle()}
                                    {componentToRender?.renderTools &&
                                        componentToRender.renderTools()}
                                </ol>
                            </nav>
                        </EditorAppHeader>
                    )}
                    <div className="o-editor-app_body">
                        {componentToRender?.render?.()}
                    </div>
                    {componentToRender?.renderFooter && (
                        <div className="o-editor-app_footer">
                            {componentToRender?.renderFooter?.()}
                        </div>
                    )}
                </section>
                <OUserPreferences />
                <OModal />
            </>
        );
    }
}

function EditorAppHeader(props) {
    const marge = 6;
    const [oEditorTop, setOEditorTop] = useState(null);
    const [oEditorRight, setOEditorRight] = useState(null);
    const [oEditorWidth, setOEditorWidth] = useState(null);
    const [oEditorHeight, setOEditorHeight] = useState(null);
    const [mouseTop, setMouseTop] = useState(null);
    const [mouseLeft, setMouseLeft] = useState(null);

    const editPostVisualEditor = document.querySelector(
        '.o-editor .edit-post-visual-editor',
    );
    const oEditorApp = document.querySelector('.o-editor-app');
    const skeletonHeader = document.querySelector(
        '#editor .interface-interface-skeleton__header',
    );

    useEffect(() => {
        if (oEditorApp && !oEditorApp.classList.contains('moving')) {
            window.setTimeout(() => {
                improveOEditorPositionY();
                improveOEditorPositionX();
            });
        }
    });

    if (oEditorApp) {
        document.addEventListener('mouseup', () => {
            if (oEditorApp.classList.contains('moving')) {
                oEditorApp.classList.remove('moving');
            }
            if (oEditorApp.classList.contains('resizing')) {
                oEditorApp.classList.remove('resizing');
                oEditorApp.removeAttribute('marker');
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (oEditorApp.classList.contains('moving')) {
                updatePosition(e);
            }
            if (oEditorApp.classList.contains('resizing')) {
                switch (oEditorApp.getAttribute('marker')) {
                    case 'tl':
                        resize(e, true, true);
                        break;
                    case 't':
                        resizeY(e, true);
                        break;
                    case 'tr':
                        resize(e, true, false);
                        break;
                    case 'r':
                        resizeX(e, false);
                        break;
                    case 'br':
                        resize(e, false, false);
                        break;
                    case 'b':
                        resizeY(e, false);
                        break;
                    case 'bl':
                        resize(e, false, true);
                        break;
                    case 'l':
                        resizeX(e, true);
                        break;
                }
            }
        });

        window.addEventListener('resize', () => {
            improveOEditorPositionY();
            improveOEditorPositionX();
        });

        oEditorApp.addEventListener('mouseenter', (e) => {
            OEditorApp.getInstance().open(false);
        });
        oEditorApp.addEventListener('mouseleave', (e) => {
            // if (!document.body.classList.contains('modal-open')) {
            OEditorApp.getInstance().allowToClose();
            // }
        });
    }

    function mouseDown(e, marker) {
        setOEditorTop(oEditorApp.offsetTop);
        setOEditorRight(
            window.innerWidth -
                (oEditorApp.offsetLeft + oEditorApp.offsetWidth),
        );
        setOEditorWidth(oEditorApp.offsetWidth);
        setOEditorHeight(oEditorApp.offsetHeight);
        setMouseTop(e.clientY);
        setMouseLeft(e.clientX);

        oEditorApp.classList.add('resizing');
        oEditorApp.setAttribute('marker', marker);
    }

    function resize(e, top, left) {
        resizeX(e, left);
        resizeY(e, top);
    }

    function resizeX(e, left) {
        let diffX = e.clientX - mouseLeft;
        let newWidth = oEditorWidth;

        if (left) {
            newWidth -= diffX;

            if (oEditorRight + newWidth >= window.innerWidth - marge) {
                newWidth = window.innerWidth - marge - oEditorRight;
            }
        } else {
            if (
                oEditorRight - diffX <=
                window.innerWidth - editPostVisualEditor.offsetWidth + marge
            ) {
                diffX =
                    oEditorRight -
                    window.innerWidth +
                    editPostVisualEditor.offsetWidth -
                    marge;
            }
            newWidth += diffX;
            oEditorApp.style.right = oEditorRight - diffX + 'px';
        }

        oEditorApp.style.width = newWidth + 'px';
    }

    function resizeY(e, top) {
        let diffY = e.clientY - mouseTop;
        let newHeight = oEditorHeight;

        if (top) {
            if (oEditorTop + diffY <= skeletonHeader.offsetHeight + marge) {
                diffY = skeletonHeader.offsetHeight + marge - oEditorTop;
            }

            oEditorApp.style.top = oEditorTop + diffY + 'px';
            newHeight -= diffY;
        } else {
            newHeight += diffY;

            if (oEditorTop + newHeight >= window.innerHeight - marge) {
                newHeight = window.innerHeight - marge - oEditorTop;
            }
        }

        oEditorApp.style.height = newHeight + 'px';
    }

    function updatePosition(e) {
        improveOEditorPositionY(oEditorTop + (e.clientY - mouseTop));
        improveOEditorPositionX(oEditorRight - (e.clientX - mouseLeft));
    }

    function improveOEditorPositionY(top = null) {
        if (top == null) {
            top = oEditorApp.offsetTop;
        }

        top =
            (window.innerHeight - skeletonHeader.offsetHeight) / 2 -
            oEditorApp.offsetHeight / 2 +
            skeletonHeader.offsetHeight;

        // if (top <= skeletonHeader.offsetHeight + marge) {
        //     top = skeletonHeader.offsetHeight + marge;
        // } else if (
        //     top + oEditorApp.offsetHeight >=
        //     window.innerHeight - marge
        // ) {
        //     top = window.innerHeight - marge - oEditorApp.offsetHeight;
        // }

        oEditorApp.style.top = top + 'px';
    }

    function improveOEditorPositionX(right = null) {
        if (!props.isOpen) {
            right = -oEditorApp.offsetWidth;
        } else {
            if (right == null) {
                right =
                    window.innerWidth -
                    (oEditorApp.offsetLeft + oEditorApp.offsetWidth);
            }
            if (
                right <=
                window.innerWidth - editPostVisualEditor.offsetWidth + marge
            ) {
                right =
                    window.innerWidth -
                    editPostVisualEditor.offsetWidth +
                    marge;
            }
            if (right + oEditorApp.offsetWidth >= window.innerWidth - marge) {
                right = window.innerWidth - marge - oEditorApp.offsetWidth;
            }
        }

        oEditorApp.style.right = right + 'px';
    }

    return (
        <>
            <div className={`open-marker${props.isOpen ? ' hidden' : ''}`}>
                {props.openMarker}
                {!props.openMarker && (
                    <Button variant="primary">
                        <Dashicon icon="arrow-left" />
                    </Button>
                )}
            </div>
            <div
                className="resizer top-left"
                onMouseDown={(e) => {
                    mouseDown(e, 'tl');
                }}
            >
                <Dashicon icon="arrow-left-alt2" />
            </div>
            <div
                className="resizer top"
                onMouseDown={(e) => {
                    mouseDown(e, 't');
                }}
            >
                <span className="fakeDashicon"></span>
            </div>
            <div
                className="resizer top-right"
                onMouseDown={(e) => {
                    mouseDown(e, 'tr');
                }}
            >
                <Dashicon icon="arrow-left-alt2" />
            </div>
            <div
                className="resizer right"
                onMouseDown={(e) => {
                    mouseDown(e, 'r');
                }}
            >
                <span className="fakeDashicon"></span>
            </div>
            <div
                className="resizer bottom-right"
                onMouseDown={(e) => {
                    mouseDown(e, 'br');
                }}
            >
                <Dashicon icon="arrow-left-alt2" />
            </div>
            <div
                className="resizer bottom"
                onMouseDown={(e) => {
                    mouseDown(e, 'b');
                }}
            >
                <span className="fakeDashicon"></span>
            </div>
            <div
                className="resizer bottom-left"
                onMouseDown={(e) => {
                    mouseDown(e, 'bl');
                }}
            >
                <Dashicon icon="arrow-left-alt2" />
            </div>
            <div
                className="resizer left"
                onMouseDown={(e) => {
                    mouseDown(e, 'l');
                }}
            >
                <span className="fakeDashicon"></span>
            </div>
            <div
                className="o-editor-app_header"
                onMouseDown={(e) => {
                    if (
                        e.target !=
                        document.querySelector(
                            '.o-editor-app_header .breadcrumb .is-link',
                        )
                    ) {
                        setOEditorTop(oEditorApp.offsetTop);
                        setOEditorRight(
                            window.innerWidth -
                                (oEditorApp.offsetLeft +
                                    oEditorApp.offsetWidth),
                        );
                        setMouseTop(e.clientY);
                        setMouseLeft(e.clientX);
                        oEditorApp.classList.add('moving');
                    }
                }}
            >
                {props.children}
            </div>
        </>
    );
}
