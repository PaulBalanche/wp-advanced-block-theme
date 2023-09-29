import { Button, ButtonGroup } from '@wordpress/components';
import { createPortal, useContext, useEffect } from '@wordpress/element';
import { Render } from '../Static/Render';
import { ODeviceContext } from '../Context/OContext';
import { Devices } from '../Static/Devices';

export default function ODevices() {
    const currentDevice = useContext(ODeviceContext);
    const mediaQueries = Devices.getMediaQueries();

    useEffect(() => {
        setCurrentDevice(currentDevice);
    }, []);

    function setCurrentDevice(newDevice) {
        document.querySelector('.o-editor').setAttribute('o-device', newDevice);

        var editor_area = document.querySelector('#editor');
        var layout_flow_area = document.querySelector('.is-root-container');
        if (editor_area && layout_flow_area) {
            layout_flow_area.style.margin = 'auto';

            if (typeof mediaQueries[newDevice] != 'undefined') {
                if (
                    mediaQueries[newDevice]['maxWidth'] != null &&
                    mediaQueries[newDevice]['maxWidth'] <=
                        editor_area.offsetWidth
                ) {
                    layout_flow_area.style.width =
                        mediaQueries[newDevice]['maxWidth'] + 'px';
                } else {
                    layout_flow_area.style.removeProperty('width');
                }
            }
        }
    }

    function getButtonGroup() {
        if (typeof mediaQueries[currentDevice] == 'undefined') {
            return null;
        }

        return (
            <div id="devicesButtonGroupContainer">
                <ButtonGroup
                    key="devicesButtonGroup"
                    className="devicesButtonGroup"
                >
                    {Object.keys(mediaQueries).map((layout) => {
                        const extraClass =
                            currentDevice == layout ? 'default' : null;
                        return (
                            <Button
                                key={'layoutButton_' + layout}
                                isPressed={currentDevice == layout}
                                className={extraClass}
                                onMouseDown={() => {
                                    setCurrentDevice(layout);
                                }}
                            >
                                {Render.getDeviceLabel(layout)}
                            </Button>
                        );
                    })}
                    <Button
                        key={'layoutButton_open'}
                        href={GLOBAL_LOCALIZED.post_url}
                        className="is-secondary"
                        target="_blank"
                    >
                        View page
                    </Button>
                </ButtonGroup>
            </div>
        );
    }

    return createPortal(getButtonGroup(), document.querySelector('.o-editor'));
}
