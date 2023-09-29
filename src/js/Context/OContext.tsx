import { ODeviceProvider } from './Providers/ODeviceProvider';
import { OBlockEditorProvider } from './Providers/OBlockEditorProvider';

export function OContext({ clientId = null, children }) {
    return (
        <ODeviceProvider>
            <OBlockEditorProvider clientId={clientId}>
                {children}
            </OBlockEditorProvider>
        </ODeviceProvider>
    );
}
