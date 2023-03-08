import { useDraggable } from "@dnd-kit/core";

export function Draggable(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id + "-draggable",
        data: { key: props.dataKey },
    });
    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            key={props.id}
            className={props.className}
        >
            {props.children}
        </div>
    );
}
