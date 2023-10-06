import { Button, ButtonGroup } from '@wordpress/components';
import { createPortal, useContext, useEffect } from '@wordpress/element';
import { Render } from '../Static/Render';
import { ODeviceContext } from '../Context/Providers/ODeviceProvider';
import { Devices } from '../Static/Devices';

export default function ODevices() {
    const { currentDevice, setDevice } = useContext(ODeviceContext);

    function getButtonGroup() {
        const mediaQueries = Devices.getMediaQueries();

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
                            Devices.getDefaultDevice() == layout
                                ? 'default'
                                : null;
                        return (
                            <Button
                                key={'layoutButton_' + layout}
                                isPressed={currentDevice == layout}
                                className={extraClass}
                                onMouseDown={() => setDevice(layout)}
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
