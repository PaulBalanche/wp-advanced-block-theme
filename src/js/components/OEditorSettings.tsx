import React from 'react';

import { Button, Dashicon } from '@wordpress/components';

import __OEditorApp from './OEditorApp';
import __OUserPreferences from './OUserPreferences';

export default class OEditorSettings {
    constructor() {}

    renderTitle() {
        return (
            <li className="breadcrumb-current">
                <h2>User preferences</h2>
            </li>
        );
    }

    renderFooter() {
        return (
            <>
                <div className="o-flex-grow"></div>
                <Button
                    key={'buttonCloseEditZone'}
                    className="abtButtonCloseEditZone"
                    variant="secondary"
                    onMouseDown={() => __OEditorApp.getInstance().clean()}
                >
                    <Dashicon icon="no-alt" />
                    Close
                </Button>
            </>
        );
    }

    render() {
        return (
            <ul>
                <li>
                    <__OUserPreferences
                        preference="alertReusableBlock"
                        context="toggle"
                        label="Display alert while edit reusable block ?"
                    ></__OUserPreferences>
                </li>
                {/* <li className="separator"></li> */}
            </ul>
        );
    }

    getExtraClassName() {
        return 'settings';
    }
}
