import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div
        key={ props.id + "-SortableItemContainer" }
        ref={setNodeRef}
        style={style} {...attributes}
        className="repeatableItem"
    >
        {props.children}
        <button
            key={ props.blockKey + "-" + props.id + "-repeatableHandlerButton" }
            ref={setActivatorNodeRef} {...listeners}
        >Drag handle</button>
    </div>
  );
}