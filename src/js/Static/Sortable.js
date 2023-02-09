import { Component } from '@wordpress/element';

import {
    Button,
    Dashicon
} from '@wordpress/components';

import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {SortableItem} from './SortableItem';

import { Attributes } from './Attributes'
import { Render } from './Render'
import { Controls } from './Controls'
import { toIndexedSeq } from 'draft-js/lib/DefaultDraftBlockRenderMap';

export class Sortable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: Object.keys(this.props.controllerValue)
        };

        this.handleDragEnd = this._handleDragEnd.bind(this);
        this.removeItem = this._removeItem.bind(this);
        this.addItem = this._addItem.bind(this);
    }

    _handleDragEnd(event) {

        const { active, over } = event;
        if( active.id !== over.id ) {

            const oldIndex = this.state.items.indexOf(active.id);
            const newIndex = this.state.items.indexOf(over.id);
            const newItems = arrayMove(this.state.items, oldIndex, newIndex);

            this.setState( { items: newItems } );

            var newControllerValue = [];
            for( var i in newItems ) {
                if( ( i < newIndex || ( newIndex > oldIndex && i == newIndex ) ) && i != oldIndex ) {
                    newControllerValue.push( this.props.controllerValue[ i ] );
                }
            }

            newControllerValue.push( this.props.controllerValue[ oldIndex ] );
            for( var i in newItems ) {
                if( ( i > newIndex || ( newIndex < oldIndex && i == newIndex ) ) && i != oldIndex ) {
                    newControllerValue.push( this.props.controllerValue[ i ] );
                }
            }

            Attributes.updateAttributes( this.props.keys, this.props.valueProp, newControllerValue, false, this.props.componentInstance );
        }
    }

    _removeItem(elt) {

        const indexToRemove = elt.target.getAttribute('data-index');
        var currentStateItems = this.state.items;
        currentStateItems.splice(indexToRemove, 1);

        this.updateItems( currentStateItems );
    }

    _addItem(elt) {

        var currentStateItems = this.state.items;
        var newIndexToAdd = 0;
        for( var i in currentStateItems ) {
            var currentItem = parseInt(currentStateItems[i]);
            if( currentItem >= newIndexToAdd ) {
                newIndexToAdd = currentItem + 1;
            }
        }
        currentStateItems.push( "" + newIndexToAdd + "" );
        this.updateItems( currentStateItems );
    }

    updateItems(newItems) {
        
        this.setState( { items: newItems } );

        var newControllerValue = [];
        for( var keyLoop in newItems ) {
            newControllerValue.push( this.props.controllerValue[ newItems[keyLoop] ] );
        }

        Attributes.updateAttributes( this.props.keys, this.props.valueProp, newControllerValue, false, this.props.componentInstance );
    }

    renderItems() {
        
        var renderItems = [];
        for( var keyLoop in this.state.items ) {

            const labelRepeatableItem = ( this.props.type == 'object' ) ? Render.repeatableObjectLabelFormatting( this.props.blockKey + "-" + keyLoop, this.props.controllerValue, keyLoop ) : null;
            renderItems.push(
                <SortableItem
                    key={ this.props.blockKey + "-" + keyLoop + "-SortableItem" }
                    id={this.state.items[keyLoop]}
                    blockKey={this.props.blockKey}
                >
                    { Controls.render(
                        this.props.type,
                        this.props.componentInstance,
                        this.props.blockKey + "-" + keyLoop,
                        labelRepeatableItem,
                        this.props.keys.concat(keyLoop),
                        this.props.valueProp,
                        this.props.controllerValue[keyLoop],
                        this.props.required_field,
                        this.props.args
                    ) }
                    <Button
                        key={ this.props.blockKey + "-" + keyLoop + "-repeatableRemoveElt" }
                        className="repeatableRemoveElt"
                        data-index={keyLoop}
                        onMouseDown={this.removeItem}
                        variant="secondary"
                        isSmall
                    >
                        <Dashicon icon="no-alt" /> Remove
                    </Button>
                </SortableItem>
            );
        }
        return renderItems;
    }

    render() {

        // const sensors = useSensors(
        //     useSensor(PointerSensor),
        //     useSensor(KeyboardSensor, {
        //         coordinateGetter: sortableKeyboardCoordinates,
        //     })
        // );

        return (
            <DndContext 
                // sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={this.handleDragEnd}
            >
                <SortableContext 
                    items={ this.state.items }
                    strategy={verticalListSortingStrategy}
                >
                    { this.renderItems() }
                </SortableContext>
                <Button
                    className="repeatableAddElt"
                    onMouseDown={this.addItem}
                    variant="secondary"
                ><Dashicon icon="insert" /> Add</Button>
            </DndContext>
        );
    }
}