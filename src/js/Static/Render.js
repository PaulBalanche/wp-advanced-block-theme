import {
    Button,
    ButtonGroup,
    Dashicon,
    Panel,
    PanelBody,
    PanelRow,
    TabPanel,
} from '@wordpress/components';

import { Attributes } from './Attributes';

export class Render {
    static tabPanelComponent(
        id,
        tabs,
        inner,
        initialTabName = null,
        onSelect = null,
        extraClass = '',
    ) {
        return (
            <TabPanel
                key={id + '-tabPanel'}
                className={'tab-panel-wpe-component ' + extraClass}
                activeClass="active-tab"
                initialTabName={initialTabName}
                tabs={tabs}
                onSelect={onSelect}
            >
                {inner}
            </TabPanel>
        );
    }

    static panelComponent(
        id,
        label,
        inner,
        initialOpen = false,
        extraClass = '',
        description = null,
    ) {
        var className = [];
        if (extraClass != '') className.push(extraClass);

        return (
            <Panel key={id + '-panel'} className={className.join(' ')}>
                {this.panelBodyComponent(
                    id,
                    label,
                    inner,
                    initialOpen,
                    description,
                )}
            </Panel>
        );
    }

    static panelBodyComponent(
        id,
        label,
        inner,
        initialOpen = false,
        description = null,
    ) {
        return (
            <PanelBody
                key={id + '-PanelBody'}
                title={label}
                initialOpen={label != null ? initialOpen : true}
            >
                <PanelRow>
                    {description != null && (
                        <div className="components-panel__row__description">
                            {description}
                        </div>
                    )}
                    {inner}
                </PanelRow>
            </PanelBody>
        );
    }

    static fieldContainer(id, inner, extraClass = '') {
        const className =
            'basicField' + (extraClass != '' ? ' ' + extraClass : '');
        return (
            <div key={id + '-basicContainer'} className={className}>
                {inner}
            </div>
        );
    }

    static label(id, inner, extraClass = '') {
        const className =
            'components-base-control__label' +
            (extraClass != '' ? ' ' + extraClass : '');
        return (
            <div key={id + '-label'} className={className}>
                {inner}
            </div>
        );
    }

    static innerLabel(id, inner, description = null) {
        return (
            <>
                <div key={id + '-innerLabel'} className="inner">
                    {inner}
                </div>
            </>
        );
    }

    static buttonAddRepeatableElt(
        id,
        keys,
        valueProp,
        controllerValue,
        componentInstance,
    ) {
        return (
            <Button
                key={id + '-repeatableAddElt'}
                className="repeatableAddElt"
                onMouseDown={() => {
                    Attributes.addEltToRepeatable(
                        keys,
                        valueProp,
                        controllerValue,
                        false,
                        componentInstance,
                    );
                }}
                variant="secondary"
            >
                <Dashicon icon="insert" /> Add
            </Button>
        );
    }

    static buttonRemoveRepeatableElt(id, keys, valueProp, componentInstance) {
        return (
            <Button
                key={id + '-repeatableRemoveElt'}
                className="repeatableRemoveElt"
                onMouseDown={() => {
                    Attributes.removeEltRepeatable(
                        keys,
                        valueProp,
                        componentInstance,
                    );
                }}
                variant="secondary"
                isSmall
            >
                <Dashicon icon="no-alt" /> Remove
            </Button>
        );
    }

    static repeatableObjectLabelFormatting(blockKey, valueProp, keyLoop) {
        var labelKey = Attributes.returnStringOrNumber(keyLoop, true) + 1;
        labelKey = labelKey < 10 ? '0' + labelKey : labelKey;
        labelKey = '#' + labelKey;

        var itemsProp = null;

        var valueProp = valueProp[keyLoop];
        if (
            valueProp != null &&
            typeof valueProp == 'object' &&
            Object.keys(valueProp).length > 0
        ) {
            itemsProp = [];

            if (typeof valueProp.title != 'undefined') {
                itemsProp.push(
                    <li key={blockKey + '-repeatableObjectLabel-key'}>
                        <span className="value">{valueProp.title}</span>
                    </li>,
                );
            } else if (typeof valueProp.name != 'undefined') {
                itemsProp.push(
                    <li key={blockKey + '-repeatableObjectLabel-key'}>
                        <span className="value">{valueProp.name}</span>
                    </li>,
                );
            } else if (typeof valueProp.id != 'undefined') {
                itemsProp.push(
                    <li key={blockKey + '-repeatableObjectLabel-key'}>
                        <span className="value">{valueProp.id}</span>
                    </li>,
                );
            }

            itemsProp = (
                <ul
                    key={blockKey + '-repeatableObjectLabel-ul'}
                    className="props"
                >
                    {itemsProp}
                </ul>
            );
        }

        return (
            <div
                key={blockKey + '-repeatableObjectLabel'}
                className="repeatableObjectLabel"
            >
                <div
                    key={blockKey + '-repeatableObjectLabel-id'}
                    className="id"
                >
                    {labelKey}
                </div>
                {itemsProp}
            </div>
        );
    }

    static responsiveTabComponent(id, tabs, inner, onSelect = null, type) {
        return (
            <div
                key={id + '-responsiveTabPanel'}
                className={'responsive-tab-panel-wpe-component ' + type}
            >
                <div className="responsive-buttons-container">
                    <ButtonGroup>
                        {tabs.map((layout) => {
                            const extraClass = layout.isDefault
                                ? 'default'
                                : layout.isValid
                                ? ' valid'
                                : '';

                            return (
                                <Button
                                    key={
                                        id +
                                        '-responsiveTabPanel-Button-' +
                                        layout.name
                                    }
                                    isPressed={layout.active}
                                    className={extraClass}
                                    onMouseDown={() => {
                                        onSelect(layout.name);
                                    }}
                                >
                                    {Render.getDeviceLabel(layout.name)}
                                </Button>
                            );
                        })}
                    </ButtonGroup>
                </div>
                {inner}
            </div>
        );
    }

    static getDeviceLabel(device) {
        const icons = {
            mobile: 'smartphone',
            tablet: 'tablet',
            desktop: 'laptop',
            wide: 'desktop',
        };

        return typeof icons[device] != 'undefined' ? (
            <Dashicon icon={icons[device]} />
        ) : (
            device.charAt(0).toUpperCase() + device.slice(1)
        );
    }
}
