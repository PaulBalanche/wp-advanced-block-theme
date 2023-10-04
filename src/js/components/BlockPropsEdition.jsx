import { Attributes } from '../Static/Attributes';
import { Render } from '../Static/Render';
import { useContext } from '@wordpress/element';
import { OBlockEditorContext } from '../Context/Providers/OBlockEditorProvider';
import { Placeholder } from '@wordpress/components';

export function BlockPropsEdition() {
    const { clientId, blockSpec, blockAttributes } =
        useContext(OBlockEditorContext);

    function getAttribute(key) {
        return typeof blockAttributes[key] != 'undefined'
            ? blockAttributes[key]
            : null;
    }

    let catReOrder = {};
    const defaultCat = {
        default: { name: 'General', props: {} },
        block_settings: {
            name: 'Settings',
            props: {
                anchor: { type: 'string', label: 'ID (anchor)' },
            },
        },
    };

    if (
        typeof blockSpec != 'undefined' &&
        typeof blockSpec == 'object' &&
        typeof blockSpec.props != 'undefined' &&
        typeof blockSpec.props == 'object' &&
        Object.keys(blockSpec.props).length > 0
    ) {
        // 1. Loop Props Categories
        if (
            typeof GLOBAL_LOCALIZED.props_categories != 'undefined' &&
            GLOBAL_LOCALIZED.props_categories != null
        ) {
            for (const [keyCatProps, valueCatProps] of Object.entries(
                GLOBAL_LOCALIZED.props_categories,
            )) {
                catReOrder[keyCatProps] = {
                    name: valueCatProps.title,
                    props: {},
                };
            }
        }
        if (
            typeof blockSpec.props_categories != 'undefined' &&
            blockSpec.props_categories != null
        ) {
            for (const [keyCatProps, valueCatProps] of Object.entries(
                blockSpec.props_categories,
            )) {
                catReOrder[valueCatProps.id] = {
                    name: valueCatProps.name,
                    props: {},
                };
            }
        }

        catReOrder = {
            ...catReOrder,
            ...defaultCat,
        };

        // 2. Loop Props
        for (const [keyProp, valueProp] of Object.entries(blockSpec.props)) {
            if (typeof valueProp != 'object' || valueProp == null) continue;

            const currentCatToPush =
                typeof valueProp.category != 'undefined' &&
                valueProp.category != null &&
                valueProp.category in catReOrder
                    ? valueProp.category
                    : ['margin', 'padding', 'gap', 'spaces'].includes(keyProp)
                    ? 'spacing'
                    : 'default';
            catReOrder[currentCatToPush].props[keyProp] = valueProp;
        }
    }

    // 3. Remove empty category
    for (const [keyProp, valueProp] of Object.entries(catReOrder)) {
        if (Object.keys(catReOrder[keyProp].props).length == 0) {
            delete catReOrder[keyProp];
        }
    }

    // 4. Render
    const tabPanel = [];
    for (const [keyCat, valCat] of Object.entries(catReOrder)) {
        if (valCat.props.length == 0) continue;

        let currentEditCat = [];
        let errorAttributes = 0;
        let warningAttributes = 0;

        forEachCatProps: for (const [keyProp, prop] of Object.entries(
            valCat.props,
        )) {
            // Conditional treatment
            if (typeof prop.conditional == 'object') {
                for (const [index, conditionalField] of Object.entries(
                    prop.conditional,
                )) {
                    let conditionalFieldKey = Object.keys(conditionalField)[0];
                    let conditionalFieldValue =
                        conditionalField[conditionalFieldKey];
                    if (
                        getAttribute(conditionalFieldKey) !=
                        conditionalFieldValue
                    )
                        continue forEachCatProps;
                }
            }

            let valueProp = getAttribute(keyProp);
            currentEditCat.push(
                Attributes.renderProp(prop, [keyProp], {
                    [keyProp]: valueProp,
                }),
            );
        }

        let titleTab = valCat.name;

        tabPanel.push({
            name: keyCat,
            title: titleTab,
            content: currentEditCat,
        });
    }

    return (
        <Placeholder
            isColumnLayout={true}
            className="wpe-component_edit_placeholder"
        >
            {Render.tabPanelComponent(clientId, tabPanel, function (tabPanel) {
                return tabPanel.content;
            })}
        </Placeholder>
    );
}
