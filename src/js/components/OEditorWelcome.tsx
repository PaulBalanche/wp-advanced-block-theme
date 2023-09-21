import { Button, Dashicon } from '@wordpress/components';
import React from 'react';
import __OEditorApp from './OEditorApp';

export default class OEditorWelcome {
    constructor() {}

    renderTitle() {
        return (
            <li className="breadcrumb-current">
                <h2>Help</h2>
            </li>
        );
    }

    render() {
        return (
            <ul>
                <li>
                    <Button
                        key="o-editor-help-settings"
                        variant="tertiary"
                        onMouseDown={() =>
                            __OEditorApp.getInstance().routeTo('settings')
                        }
                    >
                        <Dashicon icon="admin-settings" />
                        User preferences
                    </Button>
                </li>
            </ul>
        );
    }

    renderFooter() {
        return (
            <nav>
                <ol>
                    {__OEditorApp.getInstance().renderFooterBreadcrumb()}
                    <li>Help</li>
                </ol>
            </nav>
        );
    }

    getExtraClassName() {
        return 'help';
    }
}
