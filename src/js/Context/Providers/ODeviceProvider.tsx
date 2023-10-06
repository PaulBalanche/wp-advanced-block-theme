import { createContext, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { Devices } from '../../Static/Devices';
import { store as blockPreferencesStore } from '@wordpress/preferences';

export function ODeviceProvider({ children }) {
    const { device } = useSelect((select) => {
        const localStorageDevice = select('core/preferences').get(
            'custom/o-editor',
            'device',
        );
        return {
            device: localStorageDevice ?? Devices.getDefaultDevice(),
        };
    }, []);
    const { set } = useDispatch(blockPreferencesStore);

    const editor_area = document.querySelector('#editor');
    const layout_flow_area = document.querySelector('.is-root-container');
    if (editor_area && layout_flow_area) {
        layout_flow_area.style.margin = 'auto';

        const mediaQueries = Devices.getMediaQueries();
        if (typeof mediaQueries[device] != 'undefined') {
            if (
                mediaQueries[device]['maxWidth'] != null &&
                mediaQueries[device]['maxWidth'] <= editor_area.offsetWidth
            ) {
                layout_flow_area.style.width =
                    mediaQueries[device]['maxWidth'] + 'px';
            } else {
                layout_flow_area.style.removeProperty('width');
            }
        }
    }

    return (
        <ODeviceContext.Provider
            value={{
                currentDevice: device,
                setDevice: (newDevice) =>
                    set('custom/o-editor', 'device', newDevice),
            }}
        >
            {children}
        </ODeviceContext.Provider>
    );
}

export const ODeviceContext = createContext(null);
