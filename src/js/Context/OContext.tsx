import { ODeviceProvider } from './Providers/ODeviceProvider';
import { OBlockEditorProvider } from './Providers/OBlockEditorProvider';

export function OContext({
    clientId = null,
    name = null,
    blockSpec = null,
    themeSpec = null,
    children,
}) {
    return (
        <ODeviceProvider>
            <OBlockEditorProvider
                clientId={clientId}
                name={name}
                blockSpec={blockSpec}
                themeSpec={themeSpec}
            >
                {children}
            </OBlockEditorProvider>
        </ODeviceProvider>
    );
}
