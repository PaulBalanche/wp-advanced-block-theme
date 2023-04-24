import { Component } from "@wordpress/element";

import { Button, Dashicon } from "@wordpress/components";

import { closestCenter, DndContext, MeasuringStrategy } from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "./SortableItem";

import { Attributes } from "./Attributes";
import { Controls } from "./Controls";
import { Render } from "./Render";

export class Sortable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: Object.keys(this.props.controllerValue),
        };

        this.handleDragEnd = this._handleDragEnd.bind(this);
        this.handleRemove = this._handleRemove.bind(this);
        this.addItem = this._addItem.bind(this);
    }

    _handleDragEnd(event) {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = this.state.items.indexOf(active.id);
            const newIndex = this.state.items.indexOf(over.id);
            const newItems = arrayMove(this.state.items, oldIndex, newIndex);

            this.setState({ items: newItems });

            const newControllerValue = [];
            for (var i in newItems) {
                if (
                    (i < newIndex || (newIndex > oldIndex && i == newIndex)) &&
                    i != oldIndex
                ) {
                    newControllerValue.push(this.props.controllerValue[i]);
                }
            }

            newControllerValue.push(this.props.controllerValue[oldIndex]);
            for (var i in newItems) {
                if (
                    (i > newIndex || (newIndex < oldIndex && i == newIndex)) &&
                    i != oldIndex
                ) {
                    newControllerValue.push(this.props.controllerValue[i]);
                }
            }

            Attributes.updateAttributes(
                this.props.keys,
                this.props.valueProp,
                newControllerValue,
                false,
                this.props.componentInstance
            );
        }
    }

    _handleRemove(id) {
        const indexToRemove = this.state.items.indexOf(id);
        this.setState({
            items: this.state.items.filter((item) => item !== id),
        });

        const newControllerValue = Object.assign(
            [],
            this.props.controllerValue
        );
        newControllerValue.splice(indexToRemove, 1);

        Attributes.updateAttributes(
            this.props.keys,
            this.props.valueProp,
            newControllerValue,
            false,
            this.props.componentInstance
        );
    }

    _addItem(elt) {
        var currentStateItems = this.state.items;
        var newIndexToAdd = 0;
        for (var i in currentStateItems) {
            var currentItem = parseInt(currentStateItems[i]);
            if (currentItem >= newIndexToAdd) {
                newIndexToAdd = currentItem + 1;
            }
        }
        currentStateItems.push("" + newIndexToAdd + "");
        this.setState({ items: currentStateItems });

        const newControllerValue = Object.assign(
            [],
            this.props.controllerValue
        );
        newControllerValue.push("");
        Attributes.updateAttributes(
            this.props.keys,
            this.props.valueProp,
            newControllerValue,
            false,
            this.props.componentInstance
        );
    }

    renderItems() {
        var renderItems = [];
        for (var keyLoop in this.state.items) {

            const error = ( this.props.error && typeof this.props.error == 'object' && this.props.error != null && typeof this.props.error[keyLoop] != 'undefined' ) ? this.props.error[keyLoop] : false;

            let labelRepeatableItem =
                this.props.type == "object"
                    ? Render.repeatableObjectLabelFormatting(
                          this.props.blockKey + "-" + keyLoop,
                          this.props.controllerValue,
                          keyLoop
                      )
                    : null;

            labelRepeatableItem = ( error && typeof error == 'object' && typeof error.message == 'string' ) ? <>{labelRepeatableItem}<div className="error"><Dashicon icon="info" />{error.message}</div></> : labelRepeatableItem;

            renderItems.push(
                <SortableItem
                    key={this.props.blockKey + "-" + keyLoop + "-SortableItem"}
                    id={this.state.items[keyLoop]}
                    blockKey={this.props.blockKey}
                    onRemove={this.handleRemove}
                    type={this.props.type}
                    error={error}
                >
                    {Controls.render(
                        this.props.type,
                        this.props.componentInstance,
                        this.props.blockKey + "-" + keyLoop,
                        labelRepeatableItem,
                        this.props.keys.concat(keyLoop),
                        this.props.valueProp,
                        this.props.controllerValue[keyLoop],
                        this.props.required_field,
                        this.props.args,
                        error
                    )}
                </SortableItem>
            );
        }
        return renderItems;
    }

    render() {
        return (
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={this.handleDragEnd}
                measuring={{
                    droppable: { strategy: MeasuringStrategy.Always },
                }}
            >
                <SortableContext
                    items={this.state.items}
                    strategy={verticalListSortingStrategy}
                >
                    <ul className="repeatableContainer">
                        {this.renderItems()}
                    </ul>
                </SortableContext>
                <Button
                    className="repeatableAddElt"
                    onMouseDown={this.addItem}
                    variant="secondary"
                >
                    <Dashicon icon="insert" /> Add
                </Button>
            </DndContext>
        );
    }
}
