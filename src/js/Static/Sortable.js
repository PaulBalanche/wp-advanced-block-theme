import { Button, Dashicon } from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';

import { closestCenter, DndContext, MeasuringStrategy } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { SortableItem } from './SortableItem';

import { Control } from './Control';
import { Render } from './Render';

export function Sortable(props) {
    const [items, setItems] = useState(Object.keys(props.value));

    function updateValue(newValue, directSubmit = false) {
        props.onChange(newValue, directSubmit);
    }

    function onChange(newValue, index) {
        const newControllerValue = [];
        for (var i in props.value) {
            newControllerValue.push(i == index ? newValue : props.value[i]);
        }
        updateValue(newControllerValue);
    }

    function handleDragEnd(event) {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = items.indexOf(active.id);
            const newIndex = items.indexOf(over.id);
            const newItems = arrayMove(items, oldIndex, newIndex);

            setItems(newItems);

            const newControllerValue = [];
            for (var i in newItems) {
                if (
                    (i < newIndex || (newIndex > oldIndex && i == newIndex)) &&
                    i != oldIndex
                ) {
                    newControllerValue.push(props.value[i]);
                }
            }

            newControllerValue.push(props.value[oldIndex]);
            for (var i in newItems) {
                if (
                    (i > newIndex || (newIndex < oldIndex && i == newIndex)) &&
                    i != oldIndex
                ) {
                    newControllerValue.push(props.value[i]);
                }
            }

            updateValue(newControllerValue, true);
        }
    }

    function handleDuplicate(id) {
        const indexToDuplicate = items.indexOf(id);
        const indexToInsert = indexToDuplicate + 1;
        const newItems = Object.assign([], items);
        newItems.splice(indexToInsert, 0, items.length.toString());
        setItems(newItems);

        const newControllerValue = Object.assign([], props.value);
        newControllerValue.splice(
            indexToInsert,
            0,
            props.value[indexToDuplicate],
        );

        updateValue(newControllerValue, true);
    }

    function handleRemove(id) {
        const indexToRemove = items.indexOf(id);
        setItems(items.filter((item) => item !== id));

        const newControllerValue = Object.assign([], props.value);
        newControllerValue.splice(indexToRemove, 1);

        updateValue(newControllerValue, true);
    }

    function addItem() {
        setItems(items.concat(items.length.toString()));

        let newValue =
            props.type == 'object' ? props.controllerValue : props.value;
        if (newValue == null || typeof props.controllerValue != 'object') {
            newValue = [];
        }

        updateValue(newValue.concat(''), true);
    }

    function renderItems() {
        var renderItems = [];
        for (var keyLoop in items) {
            const error =
                props.error &&
                typeof props.error == 'object' &&
                props.error != null &&
                typeof props.error[keyLoop] != 'undefined'
                    ? props.error[keyLoop]
                    : false;

            let labelRepeatableItem =
                props.type == 'object'
                    ? Render.repeatableObjectLabelFormatting(
                          props.blockKey + '-' + keyLoop,
                          props.value,
                          keyLoop,
                      )
                    : null;

            // labelRepeatableItem = ( error && typeof error == 'object' && typeof error.error == 'string' ) ? <>{labelRepeatableItem}<div className="error"><Dashicon icon="info" />{error.error}</div></> : labelRepeatableItem;
            // labelRepeatableItem = ( error && typeof error == 'object' && typeof error.warning == 'string' ) ? <>{labelRepeatableItem}<div className="warning"><Dashicon icon="info" />{error.warning}</div></> : labelRepeatableItem;

            renderItems.push(
                <SortableItem
                    key={props.blockKey + '-' + keyLoop + '-SortableItem'}
                    id={items[keyLoop]}
                    blockKey={props.blockKey}
                    onDuplicate={handleDuplicate}
                    onRemove={handleRemove}
                    type={props.type}
                    error={error}
                >
                    <Control
                        type={props.type}
                        componentInstance={props.componentInstance}
                        blockKey={props.blockKey + '-' + keyLoop}
                        label={labelRepeatableItem}
                        keys={props.keys.concat(keyLoop)}
                        valueProp={props.valueProp}
                        controllerValue={props.value[keyLoop]}
                        required_field={false}
                        args={props.args}
                        error={null}
                        onChange={(newValue, index) =>
                            onChange(newValue, index)
                        }
                        sortableIndex={keyLoop}
                    />
                </SortableItem>,
            );
        }
        return renderItems;
    }

    return (
        <Fragment key={props.id + '-fragment'}>
            <label
                className="components-base-control__forced_label"
                key={props.id + '-label'}
            >
                {props.label}
            </label>
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                measuring={{
                    droppable: { strategy: MeasuringStrategy.Always },
                }}
            >
                <SortableContext
                    items={items}
                    strategy={verticalListSortingStrategy}
                >
                    <ul className="repeatableContainer">{renderItems()}</ul>
                </SortableContext>
                <Button
                    className="repeatableAddElt"
                    onMouseDown={addItem}
                    variant="secondary"
                >
                    <Dashicon icon="insert" /> Add
                </Button>
            </DndContext>
        </Fragment>
    );
}
