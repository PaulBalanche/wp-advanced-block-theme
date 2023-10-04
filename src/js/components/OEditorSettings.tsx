import React from 'react';
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
            <nav>
                <ol>
                    {/*{__OEditorApp.getInstance().renderFooterBreadcrumb()}*/}
                    <li>User preferences</li>
                </ol>
            </nav>
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
}
