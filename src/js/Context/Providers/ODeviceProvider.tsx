import { createContext, useState } from '@wordpress/element';
import { Devices } from '../../Static/Devices';

export function ODeviceProvider({ children }) {
    const [currentDevice, setCurrentDevice] = useState(
        Devices.getDefaultDevice(),
    );

    // Select the node that will be observed for mutations
    const targetNode = document.querySelector(
        '.interface-interface-skeleton__content',
    );

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (
                mutation.type === 'attributes' &&
                mutation.attributeName == 'o-device'
            ) {
                setCurrentDevice(
                    targetNode.getAttribute(mutation.attributeName),
                );
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, { attributes: true });

    return (
        <ODeviceContext.Provider value={currentDevice}>
            {children}
        </ODeviceContext.Provider>
    );
}

export const ODeviceContext = createContext('desktop');
