import { useEffect, useState } from '@wordpress/element';
import OEditorApp from './OEditorApp';
import { Button, Dashicon } from '@wordpress/components';

export function OEditorAppHeader(props) {
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
