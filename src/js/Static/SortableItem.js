import {
    useSortable,
    AnimateLayoutChanges,
    defaultAnimateLayoutChanges
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import {
    Button
} from '@wordpress/components';

const animateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({...args, wasDragging: true});

export function SortableItem(props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
    } = useSortable({
        id: props.id,
        animateLayoutChanges
    });
  
  const style = {
    transition,
    transform: CSS.Translate.toString(transform)
  };

  return (
    <li
        key={ props.id + "-SortableItemContainer" }
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={ "repeatableItem " + props.type }
    >
        <div className="sortableItemInner">{props.children}</div>
        <Button
            ref={setActivatorNodeRef}
            {...listeners}
            className="drag"
            variant="tertiary"
            isSmall
            icon="move"
        />
        <Button
            className="remove"
            onMouseDown={ () => props.onRemove(props.id) }
            variant="tertiary"
            isDestructive
            isSmall
            icon="trash"
        />
    </li>
  );
}